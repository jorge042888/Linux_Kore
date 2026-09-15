/**
 * Preguntas de autoevaluación — Tema 2.3/4.3: Filesystem.
 */

import type { QuizQuestion } from './quiz-historia';

export const quizFilesystem: QuizQuestion[] = [
  {
    id: 'f1',
    question: '¿Qué es el sistema de archivos (filesystem) en Linux?',
    options: [
      'El programa que gestiona la memoria RAM',
      'La estructura jerárquica que organiza archivos y directorios en el disco',
      'El conjunto de programas instalados en el sistema',
      'El firewall que protege el sistema',
    ],
    correctIndex: 1,
    explanation: 'El filesystem es la estructura lógica que el kernel usa para almacenar, organizar y recuperar archivos y directorios en dispositivos de almacenamiento. En Linux, todo se representa como un archivo.',
  },
  {
    id: 'f2',
    question: '¿Qué significa FHS en el contexto de Linux?',
    options: [
      'File Handling System — Sistema de manejo de archivos',
      'Filesystem Hierarchy Standard — Estándar de jerarquía de archivos',
      'File Hardware Settings — Configuración de hardware de archivos',
      'First Hard Storage — Primer almacenamiento duro',
    ],
    correctIndex: 1,
    explanation: 'FHS (Filesystem Hierarchy Standard) es el estándar que define la estructura de directorios en Linux, especificando qué tipo de archivos va en cada directorio (/etc, /var, /home, etc.).',
  },
  {
    id: 'f3',
    question: '¿Qué directorio contiene los archivos de configuración del sistema?',
    options: [
      '/home',
      '/var',
      '/etc',
      '/tmp',
    ],
    correctIndex: 2,
    explanation: '/etc (Editable Text Configuration) almacena los archivos de configuración del sistema y de las aplicaciones. Ejemplos: /etc/passwd, /etc/fstab, /etc/hostname.',
  },
  {
    id: 'f4',
    question: '¿Cuál es la diferencia entre una ruta absoluta y una ruta relativa?',
    options: [
      'La absoluta siempre termina en / y la relativa nunca',
      'La absoluta comienza desde / (raíz) y la relativa desde la posición actual',
      'La absoluta solo funciona para archivos y la relativa para directorios',
      'No hay diferencia, ambos nombres se usan de forma intercambiable',
    ],
    correctIndex: 1,
    explanation: 'Una ruta absoluta siempre comienza desde la raíz (/) como /home/usuario/doc.txt. Una ruta relativa se define desde la posición actual del directorio de trabajo, como ./doc.txt o ../otro.',
  },
  {
    id: 'f5',
    question: '¿Qué tipo de archivo especiales permite acceder a información del kernel en tiempo real?',
    options: [
      '/dev',
      '/opt',
      '/proc',
      '/tmp',
    ],
    correctIndex: 2,
    explanation: '/proc es un filesystem virtual que contiene archivos que reflejan el estado del sistema en tiempo real: información del CPU (/proc/cpuinfo), memoria (/proc/meminfo), procesos, etc.',
  },
];
