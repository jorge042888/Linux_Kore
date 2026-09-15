# Linux-Kore

Plataforma interactiva de aprendizaje Linux basada en el temario **LPI Linux Essentials v1.6**. Diseñada para ser una guía de estudio completa con contenido educativo, terminal simulado, autoevaluación y seguimiento de progreso.

## Características

- **Contenido educativo en español** — 5 módulos, 19 subtemas cubriendo desde la historia de Linux hasta la administración de permisos
- **Terminal simulado** — Practica comandos reales en un terminal interactivo con un filesystem en memoria (ls, cd, pwd, cat, mkdir, touch, rm, whoami, clear, help)
- **Quizzes de autoevaluación** — Preguntas de opción múltiple con feedback inmediato y tracking de respuestas correctas
- **Cheat sheets imprimibles** — Resúmenes de cada módulo listos para imprimir
- **Seguimiento de progreso** — Guarda tu avance en localStorage, exporta/importa como JSON
- **Tema oscuro/claro** — Alterna entre el tema cyberpunk oscuro y un tema claro
- **Diseño responsive** — Funciona en escritorio, tablet y móvil
- **Accesibilidad** — Navegación por teclado, ARIA labels, contraste WCAG AA

## Temario (LPI Linux Essentials v1.6)

| Módulo | Tema | Estado |
|--------|------|--------|
| 01 | La Comunidad Linux y Código Abierto | Parcial |
| 02 | Encontrando el Camino en Linux | Parcial |
| 03 | El Poder de la Línea de Comandos | Pendiente |
| 04 | El Sistema Operativo Linux | Parcial |
| 05 | Seguridad y Sistema de Permisos | Pendiente |

## Tecnologías

- **Frontend:** HTML5, CSS3, TypeScript
- **Build Tool:** Vite
- **Testing:** Vitest + jsdom
- **Deploy:** Vercel + GitHub Actions CI

## Instalación

```bash
# Clonar el repositorio
git clone https://github.com/jorge042888/Linux_Kore.git
cd Linux_Kore

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

## Scripts Disponibles

```bash
npm run dev          # Servidor de desarrollo con hot reload
npm run build        # Build de producción
npm test             # Ejecutar tests
npm run test:watch   # Tests en modo watch
npm run test:coverage # Tests con cobertura de código
```

## Estructura del Proyecto

```
Linux_Kore/
├── index.html                    # Página principal (landing)
├── pages/
│   ├── historia-linux.html       # Módulo 01: Historia de Linux
│   ├── filesystem.html           # Módulo 02/04: Filesystem
│   ├── about.html                # Créditos y atribución LPI
│   └── 404.html                  # Página de error estilo terminal
├── src/
│   ├── main.ts                   # Entry point global
│   ├── components/
│   │   ├── nav.ts                # Navegación sidebar + bento grid
│   │   ├── terminal.ts           # Terminal simulado con filesystem en memoria
│   │   ├── quiz.ts               # Sistema de autoevaluación
│   │   ├── progress.ts           # Progreso con localStorage
│   │   ├── theme-toggle.ts       # Toggle oscuro/claro
│   │   ├── accordion.ts          # Contenido colapsable
│   │   ├── copy-button.ts        # Botón de copiar código
│   │   └── sequential-nav.ts     # Navegación prev/next
│   ├── effects/
│   │   ├── matrix-rain.ts        # Animación Canvas Matrix rain
│   │   ├── scroll-reveal.ts      # Animaciones al hacer scroll
│   │   ├── typing.ts             # Efecto de escritura automática
│   │   └── page-transition.ts    # Transiciones entre páginas
│   └── data/
│       ├── topics.ts             # Estructura del temario
│       ├── terminal-filesystem.ts # Filesystem falso en memoria
│       ├── quiz-historia.ts      # Preguntas — Historia de Linux
│       └── quiz-filesystem.ts    # Preguntas — Filesystem
├── styles/
│   ├── global.css                # Variables, reset, utilidades globales
│   ├── components.css            # Estilos de componentes
│   ├── terminal.css              # Estilos del terminal
│   ├── quiz.css                  # Estilos del quiz
│   └── pages/
│       ├── landing.css           # Estilos de la landing
│       ├── historia.css          # Estilos de historia
│       └── filesystem.css        # Estilos de filesystem
├── tests/
│   ├── terminal.test.ts          # Tests del terminal
│   ├── progress.test.ts          # Tests de progreso
│   └── quiz.test.ts              # Tests del quiz
├── public/
│   └── favicon.svg               # Favicon personalizado
├── vercel.json                   # Configuración de Vercel
├── vite.config.ts                # Configuración de Vite
├── vitest.config.ts              # Configuración de Vitest
└── tsconfig.json                 # Configuración de TypeScript
```

## Despliegue

El proyecto está configurado para desplegarse automáticamente en **Vercel** mediante GitHub Actions:

1. Haz push a la rama `main`
2. GitHub Actions ejecuta los tests
3. Vercel despliega automáticamente la versión de producción

## Atribución

Este proyecto utiliza el material de estudio de **LPI (Linux Professional Institute)** como referencia para el temario. Linux-Kore no está afiliado ni es una producción oficial de LPI.

- Material de referencia: LPI Linux Essentials v1.6
- Licencia del material: Uso educativo

## Licencia

MIT License

---

Desarrollado con ❤ para la comunidad de aprendizaje Linux.
