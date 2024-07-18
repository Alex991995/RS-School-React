import '@testing-library/jest-dom';

import { beforeAll } from 'vitest';

beforeAll(() => {
  // This runs before all tests
  // You can set up global variables here if needed
  globalThis.localStorage = window.localStorage;
});
