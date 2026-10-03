import type { APIRoute, GetStaticPaths } from 'astro';
import { getMembers } from '../../../lib/comunidade';
import { cardName, getCard, registrarTotal, registrarUso } from '../../../lib/og-membro';

// Cartão de compartilhamento de cada membro: /comunidade/<slug>/og-<chave>.png
export const getStaticPaths = (async () => {
  const members = await getMembers();
  registrarTotal(members.length);
  registrarUso(members);
  return members.map((member) => ({ params: { slug: member.slug, card: cardName(member) }, props: { member } }));
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
  const png = await getCard(props.member);
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
