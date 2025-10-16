import { resolve } from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './tests/setupTests.ts',
        include: ['tests/**/*.test.{ts,tsx}'],
        coverage: {
            reporter: ['text', 'lcov'],
            all: true,
            include: ['src/**/*.{ts,tsx}'],
        },
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
        },
    },
});
