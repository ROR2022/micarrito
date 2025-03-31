export function getMainNavigation(locale: string) {
  return [
    {
      title: 'Inicio',
      href: `/${locale}/`,
    },
    {
      title: 'Vehículos',
      href: `/${locale}/vehicles`,
    },
    {
      title: 'Vender',
      href: `/${locale}/sell`,
    },
    {
      title: 'Blog',
      href: `/${locale}/blog`,
    },
    {
      title: 'Nosotros',
      href: `/${locale}/about`,
    },
  ];
} 