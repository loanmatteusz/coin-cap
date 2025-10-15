import { useState } from "react";
import { AssetCard } from "@/components/AssetCard";
import type { Asset } from "@/types/asset";

const allAssets: Asset[] = [
    { id: "bitcoin", name: "Bitcoin", symbol: "BTC", price: 34567, change: 1.2 },
    { id: "ethereum", name: "Ethereum", symbol: "ETH", price: 2400, change: -0.5 },
    { id: "monero", name: "Monero", symbol: "XMR", price: 175, change: 0.8 },
    { id: "solana", name: "Solana", symbol: "SOL", price: 80, change: -2.1 },
    { id: "cardano", name: "Cardano", symbol: "ADA", price: 1.2, change: 0.3 },
    { id: "dogecoin", name: "Dogecoin", symbol: "DOGE", price: 0.065, change: 2.5 },
    { id: "polkadot", name: "Polkadot", symbol: "DOT", price: 20, change: 1.8 },
    { id: "avalanche", name: "Avalanche", symbol: "AVAX", price: 15, change: -1.2 },
    { id: "ripple", name: "Ripple", symbol: "XRP", price: 0.75, change: 0.6 },
    { id: "litecoin", name: "Litecoin", symbol: "LTC", price: 120, change: -0.9 },
];

export const Marketcap = () => {
    const [selectedIds, setSelectedIds] = useState<string[]>(allAssets.map(a => a.id));

    const toggleAsset = (id: string) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
    };

    const visibleAssets = allAssets.filter(a => selectedIds.includes(a.id));

    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold mb-4">Marketcap</h1>

            <div className="flex flex-wrap gap-2 mb-4">
                {allAssets.map(asset => (
                    <label
                        key={asset.id}
                        className={`flex items-center gap-1 px-2 py-1 rounded cursor-pointer border ${selectedIds.includes(asset.id)
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-neutral-50 dark:bg-neutral-800 border-neutral-700 dark:border-neutral-600"
                            }`}
                    >
                        <input
                            type="checkbox"
                            className="hidden"
                            checked={selectedIds.includes(asset.id)}
                            onChange={() => toggleAsset(asset.id)}
                        />
                        {asset.symbol}
                    </label>
                ))}
            </div>

            <div className="py-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {visibleAssets.map(asset => (
                    <AssetCard key={asset.id} asset={asset} />
                ))}
            </div>
        </div>
    );
};
