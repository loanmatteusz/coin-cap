import { Link, useParams } from "react-router-dom";
import { ArrowUp, ArrowDown, ArrowLeft } from "lucide-react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
} from "recharts";

// por enquanto
import { mockAssets } from "@/mocks/assets";


export const AssetDetail: React.FC = () => {
    const { assetId } = useParams<{ assetId: string }>();
    const asset = mockAssets.find(a => a.id === assetId);

    if (!asset) return <p>Ativo não encontrado.</p>;

    const history = Array.from({ length: 100 }, (_, i) => {
        const price = +(asset.price + (Math.random() - 0.5) * 100).toFixed(2);
        const volume = Math.floor(Math.random() * 1000) + 100;
        return { time: `T-${10 - i}`, price, volume };
    });

    const variation = history.map((h, i, arr) =>
        i === 0 ? 0 : +(((h.price - arr[i - 1].price) / arr[i - 1].price) * 100).toFixed(2)
    );

    const variationData = history.map((h, i) => ({
        time: h.time,
        change: variation[i],
    }));

    return (
        <div className="space-y-6">
            <div className="flex gap-1">
                <Link to="/">
                    <ArrowLeft className="w-8 h-8 mr-1 cursor-pointer" />
                </Link>
                <h1 className="text-2xl font-bold">
                    {asset.name} ({asset.symbol})
                </h1>
            </div>

            <div className="flex items-center gap-4">
                <p className="text-xl font-mono">Preço atual:</p>
                <p className="text-xl font-mono">${asset.price.toLocaleString()}</p>
                <p
                    className={`flex items-center text-sm font-semibold ${asset.change >= 0 ? "text-green-400" : "text-red-400"}`}
                >
                    {asset.change >= 0 ? (
                        <ArrowUp className="w-4 h-4 mr-1" />
                    ) : (
                        <ArrowDown className="w-4 h-4 mr-1" />
                    )}
                    {asset.change}%
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-neutral-700 dark:border-neutral-600 p-4 rounded bg-neutral-50 dark:bg-neutral-900">
                    <h2 className="font-semibold mb-2">Preço recente</h2>
                    <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={history}>
                            <XAxis dataKey="time" />
                            <YAxis domain={['auto', 'auto']} />
                            <Tooltip />
                            <Line
                                type="monotone"
                                dataKey="price"
                                stroke={asset.change >= 0 ? "#34D399" : "#F87171"}
                                strokeWidth={2}
                                dot={{ r: 3 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="border border-neutral-700 dark:border-neutral-600 p-4 rounded bg-neutral-50 dark:bg-neutral-900">
                    <h2 className="font-semibold mb-2">Variação percentual</h2>
                    <ResponsiveContainer width="100%" height={150}>
                        <BarChart data={variationData}>
                            <XAxis dataKey="time" />
                            <YAxis />
                            <Tooltip />
                            <Bar
                                dataKey="change"
                                fill={asset.change >= 0 ? "#34D399" : "#F87171"}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
            
            <div className="border border-neutral-700 dark:border-neutral-600 p-4 rounded bg-neutral-50 dark:bg-neutral-900">
                <h2 className="font-semibold mb-2">Volume</h2>
                <ResponsiveContainer width="100%" height={150}>
                    <BarChart data={history}>
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="volume" fill="#3B82F6" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="border border-neutral-700 dark:border-neutral-600 p-4 rounded bg-neutral-50 dark:bg-neutral-900">
                <h2 className="font-semibold mb-2">Histórico recente (últimos 5 preços)</h2>
                <ul className="font-mono text-sm space-y-1">
                    {history.slice(-5).map((h, i) => (
                        <li key={i}>
                            {h.time}: ${h.price} (Vol: {h.volume})
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
