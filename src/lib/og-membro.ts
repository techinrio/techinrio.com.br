import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import sharp from 'sharp';
import satori from 'satori';
import { iniciais, type Member } from './comunidade';

// Mude ao alterar o desenho do cartão: gera todos de novo.
const CARD_VERSION = 1;
const LARGURA = 1200;
const ALTURA = 630;

const CACHE_DIR = process.env.OG_CACHE_DIR ?? '.og-cache';
const NEW_DIR = process.env.OG_NEW_DIR ?? '.og-new';
const REFRESH = (process.env.OG_REFRESH ?? '').toLowerCase().split(',').map((s) => s.trim()).filter(Boolean);

const AVATAR_HOSTS = new Set(['github.com', 'avatars.githubusercontent.com']);
const AVATAR_TIMEOUT_MS = 5000;
const AVATAR_MAX_BYTES = 2 * 1024 * 1024;
const MAX_PIXELS = 16_000_000;

const fonts = [500, 700, 800].map((weight) => ({
  name: 'Inter',
  data: readFileSync(`src/assets/fonts/inter-latin-${weight}.ttf`),
  weight: weight as 500 | 700 | 800,
  style: 'normal' as const,
}));

type FotoOrigem =
  | { tipo: 'arquivo'; caminho: string }
  | { tipo: 'avatar'; url: string }
  | { tipo: 'iniciais' };

// Só baixamos fotos do GitHub; qualquer outro host vira iniciais no cartão.
function origemDaFoto(m: Member): FotoOrigem {
  const d = m.entry.data;
  if (d.foto && !d.foto.startsWith('https://')) return { tipo: 'arquivo', caminho: `public/img/comunidade/${d.foto}` };
  if (d.foto) {
    const u = new URL(d.foto);
    if (u.hostname === 'github.com' && /^\/[A-Za-z0-9-]{1,39}\.png$/.test(u.pathname)) {
      return { tipo: 'avatar', url: `https://github.com${u.pathname}?size=400` };
    }
    if (u.hostname === 'avatars.githubusercontent.com') return { tipo: 'avatar', url: `${u.origin}${u.pathname}?s=400` };
    return { tipo: 'iniciais' };
  }
  if (m.github) return { tipo: 'avatar', url: `https://github.com/${m.github}.png?size=400` };
  return { tipo: 'iniciais' };
}

const sha = (data: string | Buffer) => createHash('sha256').update(data).digest('hex');

function chave(m: Member) {
  const origem = origemDaFoto(m);
  const foto =
    origem.tipo === 'arquivo' ? `arquivo:${sha(readFileSync(origem.caminho))}` : origem.tipo === 'avatar' ? `avatar:${origem.url}` : 'iniciais';
  return sha(JSON.stringify({ v: CARD_VERSION, nome: m.nome, cargo: m.cargo, tags: m.tags, foto })).slice(0, 10);
}

export const cardName = (m: Member) => `og-${chave(m)}`;
export const cardPath = (m: Member) => `/comunidade/${m.slug}/${cardName(m)}.png`;

async function baixarAvatar(url: string): Promise<Buffer> {
  const res = await fetch(url, { signal: AbortSignal.timeout(AVATAR_TIMEOUT_MS), redirect: 'follow' });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  if (!AVATAR_HOSTS.has(new URL(res.url).hostname)) throw new Error('host inesperado');
  if (!(res.headers.get('content-type') ?? '').startsWith('image/')) throw new Error('não é imagem');
  if (Number(res.headers.get('content-length') ?? 0) > AVATAR_MAX_BYTES) throw new Error('imagem grande demais');
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length > AVATAR_MAX_BYTES) throw new Error('imagem grande demais');
  return buf;
}

// Quadrada e pequena; o sharp confere as dimensões antes de decodificar.
async function prepararFoto(buf: Buffer) {
  const jpg = await sharp(buf, { limitInputPixels: MAX_PIXELS }).resize(400, 400, { fit: 'cover' }).jpeg({ quality: 88 }).toBuffer();
  return `data:image/jpeg;base64,${jpg.toString('base64')}`;
}

// A fonte só tem alfabeto latino: o resto (emojis, outros alfabetos) fica de fora do cartão.
function limpar(texto: string) {
  return [...texto]
    .filter((c) => {
      const n = c.codePointAt(0) ?? 0;
      return n <= 0xff || (n >= 0x2000 && n <= 0x206f) || n === 0x20ac || n === 0x2122;
    })
    .join('')
    .replace(/\s+/g, ' ')
    .trim();
}

type No = { type: string; props: Record<string, unknown> };
const h = (type: string, style: Record<string, unknown>, children?: unknown, extra: Record<string, unknown> = {}): No => ({
  type,
  props: { ...extra, style: { display: 'flex', ...style }, children },
});

async function desenhar(m: Member, foto: string | null) {
  const nome = limpar(m.nome) || 'Membro';
  const cargo = limpar(m.cargo);
  const tags = m.tags.map(limpar).filter(Boolean).slice(0, 6);
  const tamNome = nome.length <= 18 ? 76 : nome.length <= 28 ? 64 : nome.length <= 40 ? 52 : 42;
  const simbolo = `data:image/png;base64,${(await sharp('public/img/symbol-orange.png').resize(96, 96).png().toBuffer()).toString('base64')}`;

  const avatar = h(
    'div',
    { width: 280, height: 280, borderRadius: 140, border: '6px solid #fa7f01', overflow: 'hidden', background: '#2e2e2e', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
    foto
      ? { type: 'img', props: { src: foto, width: 268, height: 268, style: { width: 268, height: 268, objectFit: 'cover' } } }
      : h('div', { fontSize: 110, fontWeight: 800, color: '#fa7f01' }, iniciais(nome)),
  );

  const info = h('div', { flexDirection: 'column', justifyContent: 'center', flex: 1, marginLeft: 56, gap: 18 }, [
    h('div', { fontSize: tamNome, fontWeight: 800, lineHeight: 1.1, lineClamp: 2, color: '#f5f5f5' }, nome),
    cargo ? h('div', { fontSize: 34, fontWeight: 500, lineHeight: 1.25, lineClamp: 2, color: '#cccccc' }, cargo) : null,
    tags.length
      ? h(
          'div',
          { flexWrap: 'wrap', gap: 12, maxHeight: 112, overflow: 'hidden', marginTop: 8 },
          tags.map((t) =>
            h('div', { fontSize: 24, fontWeight: 500, color: '#fa7f01', background: '#1f1f1f', border: '2px solid #2e2e2e', borderRadius: 999, padding: '6px 20px' }, t),
          ),
        )
      : null,
  ].filter(Boolean));

  const rodape = h('div', { position: 'absolute', left: 72, bottom: 48, alignItems: 'center', gap: 16 }, [
    { type: 'img', props: { src: simbolo, width: 48, height: 48, style: { width: 48, height: 48 } } },
    h('div', { fontSize: 30, fontWeight: 700, color: '#f5f5f5' }, 'Membro oficial da Tech In Rio'),
  ]);

  const raiz = h(
    'div',
    {
      position: 'relative',
      width: LARGURA,
      height: ALTURA,
      background: '#0b0b0b',
      backgroundImage: 'radial-gradient(circle at 88% 0%, rgba(250,127,1,0.24) 0%, rgba(11,11,11,0) 55%)',
      fontFamily: 'Inter',
      alignItems: 'center',
      padding: '0 72px 56px',
    },
    [avatar, info, rodape],
  );

  const svg = await satori(raiz as never, { width: LARGURA, height: ALTURA, fonts });
  return sharp(Buffer.from(svg)).png({ palette: true, quality: 100, effort: 10, dither: 1, compressionLevel: 9 }).toBuffer();
}

const stats = { cache: 0, gerados: 0, falhas: 0, total: 0 };
export const registrarTotal = (n: number) => {
  stats.total = n;
};
function resumo() {
  if (stats.total && stats.cache + stats.gerados + stats.falhas >= stats.total) {
    console.log(`[cartões] ${stats.gerados} gerados, ${stats.cache} do cache${stats.falhas ? `, ${stats.falhas} com falha na foto (não guardados)` : ''}`);
  }
}

export async function getCard(m: Member): Promise<Buffer> {
  const nome = `${m.slug}-${chave(m)}.png`;
  const emCache = `${CACHE_DIR}/${nome}`;
  const refazer = REFRESH.includes('all') || REFRESH.includes(m.slug);

  if (!refazer && existsSync(emCache)) {
    stats.cache++;
    resumo();
    return readFileSync(emCache);
  }

  const origem = origemDaFoto(m);
  let foto: string | null = null;
  let guardar = true;
  try {
    if (origem.tipo === 'arquivo') foto = await prepararFoto(readFileSync(origem.caminho));
    else if (origem.tipo === 'avatar') foto = await prepararFoto(await baixarAvatar(origem.url));
  } catch (erro) {
    // Sem foto agora: sai com iniciais, mas não entra no cache para tentar de novo no próximo build.
    console.warn(`[cartões] ${m.slug}: foto indisponível (${(erro as Error).message}); usando iniciais`);
    guardar = false;
  }

  const png = await desenhar(m, foto);
  if (guardar) {
    for (const dir of [CACHE_DIR, NEW_DIR]) {
      mkdirSync(dir, { recursive: true });
      writeFileSync(`${dir}/${nome}`, png);
    }
    stats.gerados++;
  } else {
    stats.falhas++;
  }
  resumo();
  return png;
}

// Lista de cartões em uso neste build, para a publicação limpar o que ficou sem uso.
export function registrarUso(membros: Member[]) {
  mkdirSync(NEW_DIR, { recursive: true });
  writeFileSync(`${NEW_DIR}/_usados.txt`, membros.map((m) => `${m.slug}-${chave(m)}.png`).join('\n') + '\n');
}

