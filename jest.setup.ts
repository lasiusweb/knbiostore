import { TextDecoder, TextEncoder } from 'util';

global.TextDecoder = TextDecoder as any;
global.TextEncoder = TextEncoder as any;

// Polyfill structuredClone if not available (common in JSDOM)
if (typeof global.structuredClone !== 'function') {
  global.structuredClone = (obj: any) => JSON.parse(JSON.stringify(obj));
}

import '@testing-library/jest-dom';
import 'whatwg-fetch';
import 'fake-indexeddb/auto';

