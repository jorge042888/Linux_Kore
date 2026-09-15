/**
 * Preguntas de autoevaluación — Tema 1.1: Historia de Linux.
 */

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const quizHistoria: QuizQuestion[] = [
  {
    id: 'h1',
    question: '¿Quién creó el kernel de Linux y en qué año?',
    options: [
      'Richard Stallman en 1983',
      'Linus Torvalds en 1991',
      'Dennis Ritchie en 1972',
      'Andrew Tanenbaum en 1987',
    ],
    correctIndex: 1,
    explanation: 'Linus Torvalds, un estudiante finlandés, inició el desarrollo del kernel de Linux en 1991 como un proyecto personal inspirado en Unix y el sistema MINIX.',
  },
  {
    id: 'h2',
    question: '¿Qué gestor de paquetes utiliza la familia de distribuciones Debian?',
    options: [
      'rpm (Red Hat Package Manager)',
      'pacman (Arch Linux)',
      'dpkg (Debian Package)',
      'zypper (SUSE)',
    ],
    correctIndex: 2,
    explanation: 'Debian y sus derivados (Ubuntu, Linux Mint, Raspbian) utilizan dpkg como gestor de paquetes de bajo nivel, junto con apt como herramienta de alto nivel para resolver dependencias.',
  },
  {
    id: 'h3',
    question: '¿Cuál es la diferencia principal entre Debian y Ubuntu?',
    options: [
      'Ubuntu usa otro kernel diferente al de Linux',
      'Debian es más estable pero Ubuntu es más fácil de usar para principiantes',
      'Debian solo funciona en servidores',
      'Ubuntu no es basado en Debian',
    ],
    correctIndex: 1,
    explanation: 'Ubuntu está basado en snapshot de Debian pero está orientado a usuarios de escritorio con una experiencia más amigable. Debian prioriza la estabilidad con actualizaciones más conservadoras.',
  },
  {
    id: 'h4',
    question: '¿Qué son los sistemas embebidos de Linux?',
    options: [
      'Computadoras de escritorio con Linux instalado',
      'Servidores en la nube que ejecutan Linux',
      'Dispositivos especializados que ejecutan Linux (Raspberry Pi, routers, cámaras)',
      'Teléfonos que usan Android como sistema operativo',
    ],
    correctIndex: 2,
    explanation: 'Los sistemas embebidos son dispositivos especializados como Raspberry Pi, routers, smart TVs, cámaras y dispositivos IoT que ejecutan versiones de Linux optimizadas para hardware con recursos limitados.',
  },
  {
    id: 'h5',
    question: '¿Qué es Android en relación con Linux?',
    options: [
      'Una distribución de Linux para servidores',
      'Un sistema operativo independiente sin relación con Linux',
      'Un sistema operativo para móviles basado en una versión modificada del kernel de Linux',
      'Una herramienta de programación de Linux',
    ],
    correctIndex: 2,
    explanation: 'Android utiliza una versión modificada del kernel de Linux como base. Fue desarrollado inicialmente por Android Inc. y adquirido por Google en 2005.',
  },
];
