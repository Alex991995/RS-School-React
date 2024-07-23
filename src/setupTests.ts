import '@testing-library/jest-dom';

import { beforeAll } from 'vitest';

beforeAll(() => {
  globalThis.localStorage = window.localStorage;
});
