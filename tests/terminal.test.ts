/**
 * Tests para el parser de comandos del terminal simulado.
 */
import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock DOM
beforeEach(() => {
  document.body.innerHTML = `
    <div class="terminal-container" data-interactive>
      <div class="terminal-header">
        <span class="terminal-dot red"></span>
        <span class="terminal-dot yellow"></span>
        <span class="terminal-dot green"></span>
        <span class="terminal-title">test</span>
      </div>
      <div class="terminal-body"></div>
    </div>
  `;
});

describe('Terminal filesystem data', () => {
  it('has root as top-level directory', async () => {
    const { fakeFS } = await import('../src/data/terminal-filesystem');
    expect(fakeFS.type).toBe('dir');
    expect(fakeFS.name).toBe('/');
    expect(fakeFS.children).toBeDefined();
  });

  it('has expected top-level directories', async () => {
    const { fakeFS } = await import('../src/data/terminal-filesystem');
    const children = fakeFS.children!;
    expect(children['home']).toBeDefined();
    expect(children['etc']).toBeDefined();
    expect(children['var']).toBeDefined();
    expect(children['usr']).toBeDefined();
    expect(children['tmp']).toBeDefined();
    expect(children['proc']).toBeDefined();
    expect(children['dev']).toBeDefined();
  });

  it('has home directory with usuario subdirectory', async () => {
    const { fakeFS } = await import('../src/data/terminal-filesystem');
    const usuario = fakeFS.children!['home'].children!['usuario'];
    expect(usuario).toBeDefined();
    expect(usuario.type).toBe('dir');
    expect(usuario.children!['documento.txt']).toBeDefined();
    expect(usuario.children!['.bashrc']).toBeDefined();
  });

  it('has /proc/cpuinfo with content', async () => {
    const { fakeFS } = await import('../src/data/terminal-filesystem');
    const cpuinfo = fakeFS.children!['proc'].children!['cpuinfo'];
    expect(cpuinfo).toBeDefined();
    expect(cpuinfo.content).toContain('processor');
  });
});

describe('Terminal initialization', () => {
  it('creates terminal UI elements', async () => {
    const { createTerminal } = await import('../src/components/terminal');
    const container = document.querySelector<HTMLElement>('.terminal-container')!;
    createTerminal(container);

    const output = container.querySelector('.terminal-output');
    const input = container.querySelector<HTMLInputElement>('.terminal-input');
    expect(output).toBeTruthy();
    expect(input).toBeTruthy();
  });

  it('has aria attributes for accessibility', async () => {
    const { createTerminal } = await import('../src/components/terminal');
    const container = document.querySelector<HTMLElement>('.terminal-container')!;
    createTerminal(container);

    const output = container.querySelector('.terminal-output');
    expect(output?.getAttribute('role')).toBe('log');
    expect(output?.getAttribute('aria-live')).toBe('polite');

    const input = container.querySelector('.terminal-input');
    expect(input?.getAttribute('aria-label')).toBe('Comando del terminal');
  });
});
