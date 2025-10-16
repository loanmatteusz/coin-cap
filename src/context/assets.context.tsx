import { createContext, useContext, useEffect, useState, useRef } from "react";
import { defaultAssets, type Asset } from "@/types/asset";
import { useSocket } from "./socket.context";
import { loadAssets, saveAssets } from "@/lib/db";

interface AssetsContextData {
    assets: Asset[];
    setAssets: React.Dispatch<React.SetStateAction<Asset[]>>;
}

const AssetsContext = createContext<AssetsContextData>({} as AssetsContextData);

export const AssetsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { socket } = useSocket();
    const [assets, setAssets] = useState<Asset[]>(defaultAssets);
    const isCacheLoaded = useRef(false);

    useEffect(() => {
        (async () => {
            const cached = await loadAssets();
            if (cached && cached.length > 0) {
                console.log("💾 Assets carregados do cache IndexedDB.");
                setAssets(cached);
            }
            isCacheLoaded.current = true;
        })();
    }, []);

    useEffect(() => {
        if (!isCacheLoaded.current) return;
        if (assets.length > 0) {
            saveAssets(assets);
        }
    }, [assets]);

    useEffect(() => {
        if (!socket) return;

        const handleMessage = (ev: MessageEvent) => {
            try {
                const data = JSON.parse(ev.data) as Record<string, string>;

                setAssets(prevAssets =>
                    prevAssets.map(asset => {
                        const newPrice = data[asset.id]
                            ? parseFloat(data[asset.id])
                            : asset.price;

                        const change =
                            asset.price && asset.price !== 0
                                ? ((newPrice - asset.price) / asset.price) * 100
                                : 0;

                        const newEntry = {
                            timestamp: Date.now(),
                            price: newPrice,
                            change,
                        };

                        return {
                            ...asset,
                            price: newPrice,
                            change,
                            history: [...asset.history.slice(-9), newEntry],
                        };
                    })
                );
            } catch (e) {
                console.error("Error parsing WebSocket message:", e);
            }
        };

        socket.addEventListener("message", handleMessage);
        return () => socket.removeEventListener("message", handleMessage);
    }, [socket]);

    return (
        <AssetsContext.Provider value={{ assets, setAssets }}>
            {children}
        </AssetsContext.Provider>
    );
};

export const useAssets = () => useContext(AssetsContext);
