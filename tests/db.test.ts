import "./__mocks__/idb";

import { describe, it, expect } from "vitest";
import { loadAssets, saveAssets } from "../src/lib/db";
import type { Asset } from "../src/types/asset";

describe("IndexedDB helpers", () => {
    it("carrega assets do banco", async () => {
        const assets = await loadAssets();
        expect(assets).toHaveLength(1);
        expect(assets[0].id).toBe("bitcoin");
    });

    it("salva assets no banco", async () => {
        const asset: Asset = { id: "bitcoin", name: "Bitcoin", symbol: "BTC", price: 60000, change: 0, history: [] };
        await expect(saveAssets([asset])).resolves.not.toThrow();
    });
});
