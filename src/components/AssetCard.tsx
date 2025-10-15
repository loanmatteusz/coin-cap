import { Link } from "react-router-dom";
import { ArrowUp, ArrowDown } from "lucide-react";
import type { Asset } from "@/types/asset";

interface AssetCardProps {
    asset: Asset;
}

export const AssetCard: React.FC<AssetCardProps> = ({ asset }) => {
    return (
        <Link
            to={`/${asset.id}`}
            className="block p-4 rounded-lg border border-neutral-700 dark:border-neutral-600 hover:border-blue-500 transition-colors bg-neutral-50 dark:bg-neutral-900"
        >
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="font-semibold text-lg">{asset.name}</h2>
                    <p className="text-sm text-gray-400">{asset.symbol}</p>
                </div>
                <div className="text-right">
                    <p className="font-mono">${asset.price.toLocaleString()}</p>
                    <p
                        className={`flex items-center justify-end text-sm font-semibold ${asset.change >= 0 ? "text-green-400" : "text-red-400"
                            }`}
                    >
                        {asset.change >= 0 ? (
                            <ArrowUp className="w-3 h-3 mr-1" />
                        ) : (
                            <ArrowDown className="w-3 h-3 mr-1" />
                        )}
                        {asset.change}%
                    </p>
                </div>
            </div>
        </Link>
    );
};
