import { getCollection } from 'astro:content';

// Regras que o schema não cobre; qualquer erro derruba o build.
export async function getMembers() {
  const entries = await getCollection('comunidade');
  const seen = new Set<string>();

  for (const { filePath, data } of entries) {
    const login = data.github.toLowerCase();
    const file = filePath?.split('/').pop();
    if (file !== `${login}.yml`) {
      throw new Error(
        `src/data/comunidade/${file}: o arquivo deve se chamar "${login}.yml" (github em minúsculas)`,
      );
    }
    if (seen.has(login)) throw new Error(`github duplicado: ${login}`);
    seen.add(login);
  }

  return entries
    .map((e) => e.data)
    .sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
}
