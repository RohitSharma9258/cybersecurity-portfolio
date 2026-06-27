import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

// Extends Vitest expectations with Jest DOM matchers
expect.extend(matchers);

afterEach(() => {
  cleanup();
});
