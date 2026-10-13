// A ordem da lista é a ordem exibida no site.
// Ids de `links` precisam existir em SocialIcon.astro e em `linkLabels` (Partners.astro).
export const partners = [
  {
    name: 'HostGator',
    logo: '/img/parceiros/hostgator.png',
    width: 203,
    height: 118,
    links: [
      { id: 'site', href: 'https://www.hostgator.com.br/' },
      { id: 'instagram', href: 'https://instagram.com/hostgatorbrasil' },
      { id: 'x', href: 'https://x.com/hostgatorbrasil' },
      { id: 'youtube', href: 'https://youtube.com/@HostGatorBrasilOficial' },
    ],
  },
  {
    name: 'FIAP',
    logo: '/img/parceiros/fiap.png',
    width: 854,
    height: 403,
    links: [
      { id: 'site', href: 'https://www.fiap.com.br/' },
      { id: 'instagram', href: 'https://instagram.com/fiapoficial' },
    ],
  },
  {
    name: 'Mimo de Cria',
    logo: '/img/parceiros/mimo-de-cria.jpg',
    width: 150,
    height: 150,
    links: [{ id: 'instagram', href: 'https://www.instagram.com/mimodecria' }],
  },
];
