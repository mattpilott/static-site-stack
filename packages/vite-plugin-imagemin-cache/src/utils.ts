import os from 'os'
import path from 'path'

import type Picomatch from 'picomatch'
import picomatch from 'picomatch'

export function initMatcher(
  pattern: Picomatch.Glob | Picomatch.Matcher | undefined
): Picomatch.Matcher | false {
  if (pattern === undefined) return false
  if (typeof pattern === 'string' || Array.isArray(pattern))
    return picomatch(pattern)
  return pattern
}

// Copy from utils.ts in Vite

export const isWindows = os.platform() === 'win32'

export function slash(p: string): string {
  return p.replace(/\\/g, '/')
}

export function normalizePath(id: string): string {
  return path.posix.normalize(isWindows ? slash(id) : id)
}

// Copy from config.ts in Vite

export function getResolvedRoot(root: string | undefined) {
  return normalizePath(root ? path.resolve(root) : process.cwd())
}

export function getResolvedPublicDir(
  publicDir: string | false | undefined,
  resolvedRoot: string
) {
  return publicDir !== false && publicDir !== ''
    ? path.resolve(
        resolvedRoot,
        typeof publicDir === 'string' ? publicDir : 'public'
      )
    : ''
}
