import { Component } from '@angular/core';

interface TechItem {
  name: string;
  isPopular?: boolean;
}

interface TechCategoryCard {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  badge: string;
  technologies: TechItem[];
}

@Component({
  selector: 'app-technology',
  standalone: true,
  templateUrl: './technology.component.html',
  styleUrls: ['./technology.component.css'],
})
export class TechnologyComponent {
  readonly techCategories: TechCategoryCard[] = [
    {
      id: 'frontend',
      category: 'Frontend Development',
      title: 'Interfaces Modernas y Escalables',
      subtitle: 'Creación de experiencias web rápidas, dinámicas e intuitivas.',
      description:
        'Aprovechamos frameworks de vanguardia para construir interfaces reactivas, optimizadas para motores de búsqueda (SEO) y alineadas con los más altos estándares de UX/UI.',
      icon: 'frontend',
      badge: 'Frontend Stack',
      technologies: [
        { name: 'Angular', isPopular: true },
        { name: 'Next.js', isPopular: true },
        { name: 'React' },
        { name: 'TypeScript' },
        { name: 'Tailwind CSS' },
        { name: 'HTML5 & CSS3' },
      ],
    },
    {
      id: 'backend',
      category: 'Backend Architecture',
      title: 'Sistemas Robustos y Seguros',
      subtitle: 'Servicios de alto rendimiento y APIs preparadas para crecer.',
      description:
        'Diseñamos arquitecturas distribuidas, microservicios y APIs RESTful/GraphQL diseñadas para soportar cargas pesadas de tráfico y garantizar la integridad de los datos.',
      icon: 'backend',
      badge: 'Backend Stack',
      technologies: [
        { name: 'Spring Boot', isPopular: true },
        { name: 'Node.js' },
        { name: 'NestJS' }, 
        { name: 'Java' }
      ],
    },
    {
      id: 'database',
      category: 'Databases & Storage',
      title: 'Gestión y Persistencia de Datos',
      subtitle: 'Almacenamiento eficiente, consultas optimizadas y alta disponibilidad.',
      description:
        'Implementamos soluciones relacionales y NoSQL adaptadas al volumen y estructura de tu negocio, asegurando velocidad, réplicas y respaldos consistentes.',
      icon: 'database',
      badge: 'Data Stack',
      technologies: [
        { name: 'PostgreSQL', isPopular: true },
        { name: 'MySQL', isPopular: true },
        { name: 'MongoDB' }
      ],
    },
    {
      id: 'tools',
      category: 'DevOps & Tools',
      title: 'Despliegue y Herramientas Extra',
      subtitle: 'Infraestructura en la nube, automatización y flujo continuo.',
      description:
        'Contenedores, integración continua y herramientas modernas que garantizan despliegues ágiles, ambientes aislados y monitoreo permanente de aplicaciones.',
      icon: 'tools',
      badge: 'DevOps & Tooling',
      technologies: [
        { name: 'Docker', isPopular: true },
        { name: 'Git & GitHub' },
        { name: 'Linux / Nginx' },
        { name: 'Vercel / Netlify' },
      ],
    },
  ];
}
