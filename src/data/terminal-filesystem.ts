/**
 * Filesystem falso en memoria para el terminal simulado.
 * Simula una estructura de directorios típica de Linux.
 */

export interface FSEntry {
  type: 'dir' | 'file' | 'symlink';
  name: string;
  content?: string;
  children?: Record<string, FSEntry>;
  target?: string; // para symlinks
}

export const fakeFS: FSEntry = {
  type: 'dir',
  name: '/',
  children: {
    home: {
      type: 'dir',
      name: 'home',
      children: {
        usuario: {
          type: 'dir',
          name: 'usuario',
          children: {
            'documento.txt': {
              type: 'file',
              name: 'documento.txt',
              content: 'Este es un archivo de texto de ejemplo.\nContiene varias líneas de contenido.\nUsed for testing purposes.',
            },
            'notas.md': {
              type: 'file',
              name: 'notas.md',
              content: '# Notas de Linux\n\n## Temas pendientes\n- Permisos de archivos\n- Gestión de procesos\n- Redes',
            },
            escritorio: {
              type: 'dir',
              name: 'escritorio',
              children: {},
            },
            descargas: {
              type: 'dir',
              name: 'descargas',
              children: {
                'imagen.png': { type: 'file', name: 'imagen.png', content: '[datos binarios de imagen]' },
                'backup.tar.gz': { type: 'file', name: 'backup.tar.gz', content: '[archivo comprimido]' },
              },
            },
            '.bashrc': {
              type: 'file',
              name: '.bashrc',
              content: '# ~/.bashrc\nexport PATH=$PATH:/usr/local/bin\nalias ll="ls -la"\nalias cls="clear"',
            },
            '.config': {
              type: 'dir',
              name: '.config',
              children: {},
            },
          },
        },
      },
    },
    etc: {
      type: 'dir',
      name: 'etc',
      children: {
        'hostname': { type: 'file', name: 'hostname', content: 'linux-kore' },
        'hosts': { type: 'file', name: 'hosts', content: '127.0.0.1 localhost\n::1       localhost' },
        'passwd': { type: 'file', name: 'passwd', content: 'root:x:0:0:root:/root:/bin/bash\nusuario:x:1000:1000::/home/usuario:/bin/bash' },
        'fstab': { type: 'file', name: 'fstab', content: '# /etc/fstab: static file system info\nUUID=abc123 / ext4 defaults 0 1' },
        'apt': {
          type: 'dir',
          name: 'apt',
          children: {
            'sources.list': {
              type: 'file',
              name: 'sources.list',
              content: 'deb http://deb.debian.org/debian bookworm main\ndeb http://security.debian.org/debian-security bookworm-security main',
            },
          },
        },
      },
    },
    var: {
      type: 'dir',
      name: 'var',
      children: {
        log: {
          type: 'dir',
          name: 'log',
          children: {
            'syslog': { type: 'file', name: 'syslog', content: '[logs del sistema truncados]' },
            'auth.log': { type: 'file', name: 'auth.log', content: '[logs de autenticación truncados]' },
          },
        },
        www: {
          type: 'dir',
          name: 'www',
          children: {
            html: {
              type: 'dir',
              name: 'html',
              children: {
                'index.html': { type: 'file', name: 'index.html', content: '<!DOCTYPE html>\n<html><body><h1>Hola Linux</h1></body></html>' },
              },
            },
          },
        },
      },
    },
    usr: {
      type: 'dir',
      name: 'usr',
      children: {
        bin: { type: 'dir', name: 'bin', children: {} },
        lib: { type: 'dir', name: 'lib', children: {} },
        local: {
          type: 'dir',
          name: 'local',
          children: {
            bin: { type: 'dir', name: 'bin', children: {} },
          },
        },
        share: { type: 'dir', name: 'share', children: {} },
      },
    },
    bin: { type: 'dir', name: 'bin', children: {} },
    sbin: { type: 'dir', name: 'sbin', children: {} },
    tmp: { type: 'dir', name: 'tmp', children: {} },
    opt: { type: 'dir', name: 'opt', children: {} },
    dev: {
      type: 'dir',
      name: 'dev',
      children: {
        'null': { type: 'file', name: 'null', content: '' },
        'zero': { type: 'file', name: 'zero', content: '' },
        'random': { type: 'file', name: 'random', content: '' },
        'sda': { type: 'file', name: 'sda', content: '[disco principal]' },
      },
    },
    proc: {
      type: 'dir',
      name: 'proc',
      children: {
        'cpuinfo': { type: 'file', name: 'cpuinfo', content: 'processor : 0\nmodel name : Virtual CPU\nbogomips : 4000.00' },
        'meminfo': { type: 'file', name: 'meminfo', content: 'MemTotal:       16384000 kB\nMemFree:         8192000 kB\nMemAvailable:   12288000 kB' },
        'version': { type: 'file', name: 'version', content: 'Linux version 6.1.0 (debian@debian) (gcc (Debian 12.2.0-14) 12.2.0)' },
      },
    },
    sys: { type: 'dir', name: 'sys', children: {} },
    root: {
      type: 'dir',
      name: 'root',
      children: {},
    },
  },
};

export type CurrentDir = {
  path: string[];
  node: FSEntry;
};
