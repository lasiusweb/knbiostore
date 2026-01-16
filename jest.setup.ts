import { TextDecoder, TextEncoder } from 'util';

global.TextDecoder = TextDecoder;
global.TextEncoder = TextEncoder as any;

import '@testing-library/jest-dom';
import 'whatwg-fetch';

