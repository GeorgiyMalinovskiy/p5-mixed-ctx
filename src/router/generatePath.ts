// @ts-nocheck

import { compile } from 'path-to-regexp';

const cache = {};
const cacheLimit = 10000;
let cacheCount = 0;

function compilePath(path) {
  if (cache[path]) return cache[path];

  const generator = compile(path);

  if (cacheCount < cacheLimit) {
    cache[path] = generator;
    cacheCount++;
  }

  return generator;
}

function generatePath(path = '/', params = {}) {
  return path === '/' ? path : compilePath(path)(params, { pretty: true });
}

export default generatePath;
