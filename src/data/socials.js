export const community = {
  id: 'whatsapp',
  name: 'WhatsApp',
  href: 'https://chat.whatsapp.com/I2qMkQsEZakHxNAkDQ8HuC',
  cta: 'Entrar na comunidade',
  navCta: 'Chega junto',
  description: 'Grupo da comunidade — conversas no dia a dia',
};

export const contribute = {
  name: 'Como contribuir',
  href: 'https://github.com/techinrio/docs/blob/master/CONTRIBUICOES.md',
};

export const email = 'contato@techinrio.com';

export const channels = [
  {
    id: 'instagram',
    name: 'Instagram',
    href: 'https://www.instagram.com/techinrio/',
    description: 'Novidades, eventos e bastidores',
    sameAs: true,
  },
  {
    id: 'youtube',
    name: 'YouTube',
    href: 'https://www.youtube.com/@techinrio',
    description: 'Palestras e conteúdos gravados',
    sameAs: true,
  },
  {
    id: 'github',
    name: 'GitHub',
    href: 'https://github.com/techinrio',
    description: 'Código aberto e colaboração',
    sameAs: true,
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/tech-in-rio/',
    description: 'Carreira e oportunidades',
    sameAs: true,
  },
  {
    id: 'x',
    name: 'X',
    href: 'https://x.com/techinrio',
    description: 'Atualizações rápidas da comunidade',
    sameAs: true,
  },
];

export const sameAs = channels.filter((channel) => channel.sameAs).map((channel) => channel.href);

export const footerChannels = [community, ...channels];
