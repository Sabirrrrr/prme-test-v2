import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import "@testing-library/jest-dom";
import * as chai from "chai";
import chaiDom from "chai-dom";
import sinonChai from "sinon-chai";

// Configure chai
chai.use(chaiDom);
chai.use(sinonChai);

// Run cleanup after each test case
afterEach(() => {
  cleanup();
});

// Configure global test environment
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Add custom matchers
expect.extend({
  toHaveBeenCalled(received) {
    const pass = received && typeof received.called === 'boolean' && received.called;
    return {
      pass,
      message: () => pass
        ? 'expected function to not have been called'
        : 'expected function to have been called'
    };
  }
});

// Mock fetch API
global.fetch = vi.fn();
