import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';
import { jest } from '@jest/globals';

Object.assign(global, { TextEncoder, TextDecoder, jest });
