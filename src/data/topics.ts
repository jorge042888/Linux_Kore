/**
 * Estructura del temario completo de Linux-Kore.
 * Fuente de verdad: LPI Linux Essentials v1.6 (parafraseado).
 */

export interface Subtopic {
  id: string;
  title: string;
  page: string;
  description: string;
}

export interface Topic {
  id: string;
  number: number;
  title: string;
  icon: string;
  subtopics: Subtopic[];
}

export const topics: Topic[] = [
  {
    id: 'comunidad-linux',
    number: 1,
    title: 'La Comunidad Linux y Código Abierto',
    icon: '&#xf17c;', // Linux icon (font awesome placeholder)
    subtopics: [
      {
        id: '1-1-sistemas-operativos',
        title: '1.1 Sistemas operativos populares y evolución de Linux',
        page: 'pages/historia-linux.html',
        description: 'Historia de Linux, distribuciones, sistemas embebidos y cloud computing.',
      },
      {
        id: '1-2-aplicaciones-codigo-abierto',
        title: '1.2 Principales aplicaciones de código abierto',
        page: '#',
        description: 'Paquetes de software, instalación/eliminación, oficinas, navegadores y servidores.',
      },
      {
        id: '1-3-software-libre-licencias',
        title: '1.3 Software de Código Abierto y las licencias',
        page: '#',
        description: 'Definición de software libre, licencias (GPL, MIT, Apache) y modelos de negocio.',
      },
      {
        id: '1-4-destrezas-tic',
        title: '1.4 Destrezas TIC y el trabajo con Linux',
        page: '#',
        description: 'Interfaces de usuario, usos industriales, privacidad y encriptación.',
      },
    ],
  },
  {
    id: 'camino-linux',
    number: 2,
    title: 'Encontrando el Camino en Linux',
    icon: '&#xf07b;', // Folder icon
    subtopics: [
      {
        id: '2-1-linea-comandos',
        title: '2.1 Aspectos básicos de la línea de comandos',
        page: '#',
        description: 'Estructura de comandos, tipos de comportamiento, comillas y variables.',
      },
      {
        id: '2-2-obtener-ayuda',
        title: '2.2 Uso de la línea de comandos para obtener ayuda',
        page: '#',
        description: 'Man pages, --help, which, locate y find.',
      },
      {
        id: '2-3-directorios-archivos',
        title: '2.3 Uso de directorios y listado de archivos',
        page: 'pages/filesystem.html',
        description: 'Estructura FHS, rutas absolutas/relativas, navegación y listado.',
      },
      {
        id: '2-4-crear-mover-borrar',
        title: '2.4 Crear, mover y borrar archivos',
        page: '#',
        description: 'mkdir, touch, cp, mv, rm, rmdir, globbing.',
      },
    ],
  },
  {
    id: 'poder-cmd',
    number: 3,
    title: 'El Poder de la Línea de Comandos',
    icon: '&#xf120;', // Terminal icon
    subtopics: [
      {
        id: '3-1-archivar-ficheros',
        title: '3.1 Archivar ficheros desde la línea de comandos',
        page: '#',
        description: 'Compresión (gzip, bzip2, xz), archivadores (tar) y gestión de ZIP.',
      },
      {
        id: '3-2-buscar-extraer-datos',
        title: '3.2 Buscar y extraer datos de los ficheros',
        page: '#',
        description: 'Redirección E/S, tuberías (pipes), grep y expresiones regulares.',
      },
      {
        id: '3-3-crear-scripts',
        title: '3.3 Crear un script a partir de comandos',
        page: '#',
        description: 'Estructura de scripts, variables, argumentos, condicionales y bucles.',
      },
    ],
  },
  {
    id: 'sistema-operativo',
    number: 4,
    title: 'El Sistema Operativo Linux',
    icon: '&#xf109;', // Desktop icon
    subtopics: [
      {
        id: '4-1-eleccion-so',
        title: '4.1 La elección del sistema operativo',
        page: '#',
        description: 'Qué es un SO, elegir una distribución, comparativas.',
      },
      {
        id: '4-2-hardware',
        title: '4.2 Conocer el hardware del ordenador',
        page: '#',
        description: 'Fuentes de alimentación, tarjeta madre, memoria, procesadores, almacenamiento.',
      },
      {
        id: '4-3-almacenamiento-datos',
        title: '4.3 Donde los datos se almacenan',
        page: 'pages/filesystem.html',
        description: 'Archivos, configuración, kernel, dispositivos, memoria y procesos.',
      },
      {
        id: '4-4-red',
        title: '4.4 Tu ordenador en la red',
        page: '#',
        description: 'Capa de enlace, IPv4, IPv6, DNS y sockets.',
      },
    ],
  },
  {
    id: 'seguridad-permisos',
    number: 5,
    title: 'Seguridad y Sistema de Permisos',
    icon: '&#xf132;', // Shield icon
    subtopics: [
      {
        id: '5-1-seguridad-usuarios',
        title: '5.1 Seguridad básica e identificación de tipos de usuario',
        page: '#',
        description: 'Cuentas, información de usuarios, cambio de usuarios y privilegios.',
      },
      {
        id: '5-2-crear-usuarios-grupos',
        title: '5.2 Crear usuarios y grupos',
        page: '#',
        description: '/etc/passwd, /etc/group, /etc/shadow, adduser, usermod.',
      },
      {
        id: '5-3-permisos-propiedad',
        title: '5.3 Gestión de permisos y propiedad de archivos',
        page: '#',
        description: 'chmod, chown, permisos speciales (setuid, setgid, sticky bit).',
      },
      {
        id: '5-4-archivos-especiales',
        title: '5.4 Directorios y archivos especiales',
        page: '#',
        description: 'Archivos temporales, enlaces duros y simbólicos.',
      },
    ],
  },
];

export function getTopicByNumber(num: number): Topic | undefined {
  return topics.find((t) => t.number === num);
}

export function getSubtopicById(id: string): { topic: Topic; subtopic: Subtopic } | undefined {
  for (const topic of topics) {
    const sub = topic.subtopics.find((s) => s.id === id);
    if (sub) return { topic, subtopic: sub };
  }
  return undefined;
}

export function getTotalSubtopics(): number {
  return topics.reduce((sum, t) => sum + t.subtopics.length, 0);
}
