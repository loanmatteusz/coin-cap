import { vi } from "vitest";

const mockObjectStore = {
    put: vi.fn().mockResolvedValue(undefined),
};

const mockTransaction = {
    objectStore: vi.fn(() => mockObjectStore),
    done: Promise.resolve(),
};

const mockDB = {
    transaction: vi.fn(() => mockTransaction),
    getAll: vi.fn().mockResolvedValue([{ id: "bitcoin", price: 60000 }]),
};

vi.mock("idb", () => ({
    openDB: vi.fn().mockResolvedValue(mockDB),
}));
