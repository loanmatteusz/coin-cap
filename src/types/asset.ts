export interface AssetHistory {
    timestamp: number;
    price: number;
    change: number;
    volume: number;
}

export interface Asset {
    id: string;
    name: string;
    symbol: string;
    price: number;
    change: number;
    history: AssetHistory[];
}

export const defaultAssets: Asset[] = [
    { id: "bitcoin", name: "Bitcoin", symbol: "BTC", price: 0.0, change: 0.0, history: [] },
    { id: "ethereum", name: "Ethereum", symbol: "ETH", price: 0.0, change: 0.0, history: [] },
    { id: "monero", name: "Monero", symbol: "XMR", price: 0.0, change: 0.0, history: [] },
    { id: "solana", name: "Solana", symbol: "SOL", price: 0.0, change: 0.0, history: [] },
    { id: "cardano", name: "Cardano", symbol: "ADA", price: 0.0, change: 0.0, history: [] },
];
