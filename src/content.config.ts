import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Texto de membro é não confiável: uma linha, sem HTML, sem URL, sem controle.
const texto = (max: number) =>
  z
    .string()
    .trim()
    .min(1)
    .max(max)
    .refine((v) => !/[\p{Cc}<>]/u.test(v), 'não pode conter quebra de linha, < ou >')
    .refine((v) => !/:\/\/|www\./i.test(v), 'não pode conter URLs');

const comunidade = defineCollection({
  loader: glob({ pattern: '*.yml', base: './src/data/comunidade' }),
  schema: z
    .object({
      nome: texto(80),
      github: z
        .string()
        .regex(
          /^[A-Za-z0-9](?:[A-Za-z0-9]|-(?=[A-Za-z0-9])){0,38}$/,
          'username do GitHub inválido',
        ),
      bio: texto(280),
    })
    .strict(),
});

export const collections = { comunidade };
