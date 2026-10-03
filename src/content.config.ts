import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Dados de membros são não confiáveis: uma linha, sem HTML, sem URL, sem controle.
const texto = (max: number) =>
  z
    .string()
    .trim()
    .min(1)
    .max(max)
    .refine((v) => !/[\p{Cc}<>]/u.test(v), 'não pode conter quebra de linha, < ou >')
    .refine((v) => !/:\/\/|www\./i.test(v), 'não pode conter URLs');

const tag = z
  .string()
  .trim()
  .min(1)
  .max(24)
  .regex(/^[\p{L}\p{N}][\p{L}\p{N} .+#/&-]*$/u, 'use só letras, números, espaço e . + # / & -');

// Única exceção à regra "sem URLs": site pessoal e foto externa, só https.
const ehUrlHttps = (v: string) => {
  try {
    const u = new URL(v);
    return (
      u.protocol === 'https:' &&
      !u.username &&
      !u.password &&
      !u.port &&
      u.hostname.includes('.') &&
      !/^[\d.]+$/.test(u.hostname) &&
      !/\s/.test(v)
    );
  } catch {
    return false;
  }
};

const urlHttps = z
  .string()
  .trim()
  .max(200)
  .refine(ehUrlHttps, 'use uma URL https válida (sem usuário, porta ou IP)');

const ARQUIVO_FOTO = /^[a-z0-9]+(?:-[a-z0-9]+)*\.(?:jpg|jpeg|png|webp)$/;

const foto = z
  .string()
  .trim()
  .max(200)
  .refine(
    (v) => ehUrlHttps(v) || ARQUIVO_FOTO.test(v),
    'use uma URL https (sem usuário, porta ou IP) ou o nome de um arquivo jpg, png ou webp em public/img/comunidade',
  );

const comunidade = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/data/comunidade' }),
  schema: z
    .object({
      nome: texto(80),
      cargo: texto(80),
      github: z
        .string()
        .regex(
          /^[A-Za-z0-9](?:[A-Za-z0-9]|-(?=[A-Za-z0-9])){0,38}$/,
          'username do GitHub inválido',
        )
        .optional(),
      foto: foto.optional(),
      tags: z.array(tag).max(8).optional(),
      links: z
        .object({
          site: urlHttps.optional(),
          linkedin: z.string().regex(/^[A-Za-z0-9-]{3,100}$/, 'usuário do LinkedIn inválido').optional(),
          instagram: z.string().regex(/^[A-Za-z0-9._]{1,30}$/, 'usuário do Instagram inválido').optional(),
          youtube: z.string().regex(/^@?[A-Za-z0-9._-]{3,30}$/, 'canal do YouTube inválido').optional(),
          x: z.string().regex(/^[A-Za-z0-9_]{1,15}$/, 'usuário do X inválido').optional(),
        })
        .strict()
        .optional(),
    })
    .strict(),
});

export const collections = { comunidade };
