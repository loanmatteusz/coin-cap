import { useState } from "react";
import { AssetCard } from "@/components/AssetCard";
import { useAssets } from "@/context/assets.context";

export const Marketcap = () => {

    const { assets } = useAssets();

    const [selectedIds, setSelectedIds] = useState<string[]>(assets.map(a => a.id));

    const toggleAsset = (id: string) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
    };

    const visibleAssets = assets.filter(a => selectedIds.includes(a.id));

    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold mb-4">Marketcap</h1>

            <div className="flex flex-wrap gap-2 mb-4">
                {assets.map(asset => (
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
