export interface NavItem {
  label: string;
  route?: string;
  sectionId?: string;
}

export const NAVIGATION_ITEMS: NavItem[] = [
  { label: 'Inicio', route: '/' },
  { label: 'Servicios', route: '/servicios' },
  { label: 'Tecnología', route: '/tecnologia' },
  { label: 'Contacto', route: '/contacto' },
];

