import { openDB } from "idb";
import type { Asset } from "@/types/asset";

const DB_NAME = "marketcap-db";
const STORE_ASSETS = "assets";

export const initDB = async () => {
    return openDB(DB_NAME, 1, {
        upgrade(db) {
            if (!db.objectStoreNames.contains(STORE_ASSETS)) {
                db.createObjectStore(STORE_ASSETS, { keyPath: "id" });
            }
        },
    });
};

export const saveAssets = async (assets: Asset[]) => {
    const db = await initDB();
    const tx = db.transaction(STORE_ASSETS, "readwrite");
    const store = tx.objectStore(STORE_ASSETS);
    for (const asset of assets) {
        await store.put(asset);
    }
    await tx.done;
};

export const loadAssets = async (): Promise<Asset[]> => {
    const db = await initDB();
    return (await db.getAll(STORE_ASSETS)) || [];
};
