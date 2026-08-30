export interface NavItem {
  label: string;
  route?: string;
  sectionId?: string;
}

export const NAVIGATION_ITEMS: NavItem[] = [
  { label: 'Inicio', route: '/' },
  { label: 'Servicios', route: '/servicios' },
  { label: 'Tecnología', sectionId: 'technology' },
  { label: 'Contacto', sectionId: 'contact' },
];
