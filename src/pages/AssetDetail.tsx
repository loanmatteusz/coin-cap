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
    Cell,
} from "recharts";

import { useAssets } from "@/context/assets.context";

export const AssetDetail: React.FC = () => {
    const { assets } = useAssets();
    const { assetId } = useParams<{ assetId: string }>();
    const asset = assets.find(a => a.id === assetId);
    if (!asset) return <p>Ativo não encontrado.</p>;
    
    const history = asset?.history;

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
                    {asset.change.toFixed(2)}%
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-neutral-700 dark:border-neutral-600 p-4 rounded bg-neutral-50 dark:bg-neutral-900">
                    <h2 className="font-semibold mb-2">Preço recente</h2>
                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={asset.history}>
                            <XAxis
                                dataKey="timestamp"
                                tickFormatter={(ts) =>
                                    new Date(ts).toLocaleTimeString("pt-BR", {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        second: "2-digit",
                                    })
                                }
                            />
                            <YAxis
                                domain={["auto", "auto"]}
                                tickFormatter={(val) =>
                                    new Intl.NumberFormat("en-US", {
                                        style: "currency",
                                        currency: "USD",
                                        maximumFractionDigits: 0,
                                    }).format(val)
                                }
                            />
                            <Tooltip
                                labelFormatter={(ts) =>
                                    new Date(ts).toLocaleString("pt-BR", {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        second: "2-digit",
                                    })
                                }
                                formatter={(value) => [
                                    new Intl.NumberFormat("en-US", {
                                        style: "currency",
                                        currency: "USD",
                                    }).format(Number(value)),
                                    "Preço",
                                ]}
                            />
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
                    <h2 className="font-semibold mb-2">Variação (%)</h2>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={asset.history}>
                            <XAxis
                                dataKey="timestamp"
                                tickFormatter={(ts) =>
                                    new Date(ts).toLocaleTimeString("pt-BR", {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        second: "2-digit",
                                    })
                                }
                            />
                            <YAxis
                                tickFormatter={(val) => `${val.toFixed(2)}%`}
                                domain={["auto", "auto"]}
                            />
                            <Tooltip
                                labelFormatter={(ts) =>
                                    new Date(ts).toLocaleTimeString("pt-BR", {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        second: "2-digit",
                                    })
                                }
                                formatter={(value) => [`${Number(value).toFixed(2)}%`, "Variação"]}
                            />
                            <Bar
                                dataKey="change"
                                radius={[4, 4, 0, 0]}
                                fill="#3B82F6"
                                isAnimationActive={false}
                            >
                                {asset.history.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={entry.change >= 0 ? "#22C55E" : "#EF4444"}
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            

            <div className="border border-neutral-700 dark:border-neutral-600 p-4 rounded bg-neutral-50 dark:bg-neutral-900">
                <h2 className="font-semibold mb-2">Histórico recente (últimos 10 preços)</h2>
                <ul className="font-mono text-sm space-y-1">
                    {[...history]
                        .slice(-10)
                        .reverse()
                        .map((h, i) => (
                            <li
                                key={i}
                                className={h.change >= 0 ? "flex text-green-400" : "flex text-red-400"}
                            >
                                {new Intl.DateTimeFormat("pt-BR", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    second: "2-digit",
                                }).format(new Date(h.timestamp))}{" "}
                                :{" "}
                                {new Intl.NumberFormat("en-US", {
                                    style: "currency",
                                    currency: "USD",
                                }).format(h.price)} | {
                                    <p
                                        className={`flex items-center text-sm font-semibold ${h.change >= 0 ? "text-green-400" : "text-red-400"}`}
                                    >
                                        {h.change >= 0 ? (
                                            <ArrowUp className="w-4 h-4 mr-1" />
                                        ) : (
                                            <ArrowDown className="w-4 h-4 mr-1" />
                                        )}
                                        {h.change.toFixed(8)}%
                                    </p>
                                }
                            </li>
                        ))}
                </ul>

            </div>
        </div>
    );
};
