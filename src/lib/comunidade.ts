import { getCollection, type CollectionEntry } from 'astro:content';
import { existsSync, readdirSync, statSync } from 'node:fs';

const DIR = 'src/data/comunidade';
const FOTOS = 'public/img/comunidade';
const SLUG_MD = /^[a-z0-9]+(?:-[a-z0-9]+)*\.md$/;
const MAX_CORPO = 2000;
const MAX_FOTO = 200 * 1024;

const REDES = {
  github: { label: 'GitHub', href: (u: string) => `https://github.com/${u}` },
  linkedin: { label: 'LinkedIn', href: (u: string) => `https://www.linkedin.com/in/${u}` },
  instagram: { label: 'Instagram', href: (u: string) => `https://www.instagram.com/${u}/` },
  youtube: { label: 'YouTube', href: (u: string) => `https://www.youtube.com/@${u.replace(/^@/, '')}` },
  x: { label: 'X', href: (u: string) => `https://x.com/${u}` },
} as const;

export type MemberLink = { tipo: string; label: string; href: string; texto: string; rel: string };

export type Member = {
  slug: string;
  nome: string;
  cargo: string;
  github?: string;
  foto: string | null;
  tags: string[];
  links: MemberLink[];
  entry: CollectionEntry<'comunidade'>;
};

// Modelo do arquivo oferecido no botão "Criar meu perfil".
const MODELO = `---
nome: Seu Nome
cargo: Seu cargo
github: seu-usuario
tags: [Front-end, React]
links:
  linkedin: seu-usuario
---

Escreva aqui um texto sobre você (opcional).
`;

export const criarPerfilUrl =
  'https://github.com/techinrio/techinrio.com.br/new/master/src/data/comunidade' +
  `?filename=seu-nome.md&value=${encodeURIComponent(MODELO)}`;

// O corpo é Markdown de gente de fora: só parágrafos, ênfase e listas.
function checkCorpo(slug: string, body: string) {
  const regras: [RegExp, string][] = [
    [/[<>]/, 'HTML (< ou >)'],
    [/\]\(|\]\[|\]:|!\[|\[\^/, 'links, imagens ou notas (use o campo links)'],
    [/:\/\/|www\./i, 'URLs (use o campo links)'],
    [/^\s{0,3}#{1,6}(\s|$)/m, 'títulos (#)'],
    [/^\s{0,3}(=+|-+)\s*$/m, 'linhas de título ou separador (--- ou ===)'],
  ];
  if (body.length > MAX_CORPO) throw new Error(`${slug}.md: texto com mais de ${MAX_CORPO} caracteres`);
  for (const [re, nome] of regras) {
    if (re.test(body)) throw new Error(`${slug}.md: o texto não pode conter ${nome}`);
  }
}

function checkFoto(slug: string, foto: string) {
  if (foto.startsWith('https://')) return;
  const base = foto.replace(/\.[^.]+$/, '');
  if (base !== slug) throw new Error(`${slug}.md: a foto no repositório deve se chamar "${slug}.<jpg|png|webp>"`);
  const caminho = `${FOTOS}/${foto}`;
  if (!existsSync(caminho)) throw new Error(`${slug}.md: arquivo de foto não encontrado em ${caminho}`);
  if (statSync(caminho).size > MAX_FOTO) throw new Error(`${caminho}: foto com mais de ${MAX_FOTO / 1024} KB`);
}

function resolveFoto(d: Member['entry']['data']) {
  if (!d.foto) return d.github ? `https://github.com/${d.github}.png?size=200` : null;
  return d.foto.startsWith('https://') ? d.foto : `/img/comunidade/${d.foto}`;
}

function buildLinks(d: Member['entry']['data']): MemberLink[] {
  const out: MemberLink[] = [];
  const l = d.links ?? {};
  const rede = (tipo: keyof typeof REDES, usuario?: string) => {
    if (!usuario) return;
    const href = REDES[tipo].href(usuario);
    out.push({ tipo, label: REDES[tipo].label, href, texto: href.replace(/^https:\/\/(www\.)?/, '').replace(/\/$/, ''), rel: 'noopener noreferrer' });
  };
  if (l.site) {
    out.push({ tipo: 'site', label: 'Site', href: l.site, texto: new URL(l.site).hostname.replace(/^www\./, ''), rel: 'noopener noreferrer nofollow ugc' });
  }
  rede('linkedin', l.linkedin);
  rede('github', d.github);
  rede('instagram', l.instagram);
  rede('youtube', l.youtube);
  rede('x', l.x);
  return out;
}

// Regras que o schema não cobre; qualquer erro derruba o build.
export async function getMembers(): Promise<Member[]> {
  for (const f of readdirSync(DIR)) {
    if (!SLUG_MD.test(f)) {
      throw new Error(`${DIR}/${f}: use apenas arquivos "<nome-sobrenome>.md" (minúsculas, sem acento, com hífen)`);
    }
  }

  const entries = await getCollection('comunidade');
  const githubs = new Set<string>();
  const fotos = new Set<string>();

  const members = entries.map((entry) => {
    const slug = entry.id;
    const d = entry.data;
    checkCorpo(slug, entry.body ?? '');
    if (d.foto) checkFoto(slug, d.foto);
    if (d.foto && !d.foto.startsWith('https://')) fotos.add(d.foto);
    if (d.github) {
      const g = d.github.toLowerCase();
      if (githubs.has(g)) throw new Error(`${slug}.md: github duplicado (${g})`);
      githubs.add(g);
    }
    const tags = [...new Map((d.tags ?? []).map((t) => [t.toLowerCase(), t])).values()];
    return { slug, nome: d.nome, cargo: d.cargo, github: d.github, foto: resolveFoto(d), tags, links: buildLinks(d), entry };
  });

  // Nada solto em public/img/comunidade: só fotos que algum perfil usa.
  if (existsSync(FOTOS)) {
    for (const f of readdirSync(FOTOS)) {
      if (!fotos.has(f)) throw new Error(`${FOTOS}/${f}: foto sem perfil correspondente`);
    }
  }

  return members.sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
}
