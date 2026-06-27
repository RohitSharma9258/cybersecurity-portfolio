import { describe, it, expect, vi } from 'vitest';
import { resolveCommand, resolvePath } from '../utils/terminalCommands';

describe('Terminal Utility Tests', () => {
  it('should resolve relative paths correctly', () => {
    expect(resolvePath('/home/rohit', 'projects')).toBe('/home/rohit/projects');
    expect(resolvePath('/home/rohit/projects', '..')).toBe('/home/rohit');
    expect(resolvePath('/home/rohit', '~')).toBe('/home/rohit');
  });

  it('should run core Linux commands statefully', () => {
    const res = resolveCommand('pwd', () => {}, '/home/rohit');
    expect(res).toEqual(['/home/rohit']);
  });

  it('should support cd command outputting newDir', () => {
    const res = resolveCommand('cd projects', () => {}, '/home/rohit');
    expect(res.newDir).toBe('/home/rohit/projects');
  });

  it('should return error for invalid file reads via cat', () => {
    const res = resolveCommand('cat invalid.txt', () => {}, '/home/rohit');
    expect(res[0]).toContain('No such file or directory');
  });
});
