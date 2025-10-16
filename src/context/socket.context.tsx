import { createContext, useContext, useEffect, useState } from 'react';
import { defaultAssets } from '@/types/asset';

interface SocketContextData {
    socket: WebSocket | null;
}

interface SocketProviderProps {
    children: React.ReactNode;
}

export const SocketContext = createContext<SocketContextData>(
    {} as SocketContextData,
);

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {

    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(() => {
        const assetIds = defaultAssets.map(a => a.id).join(",");
        const WS_API_URL = `wss://ws.coincap.io/prices?assets=${encodeURIComponent(assetIds)}`;

        const ws = new WebSocket(WS_API_URL as string);

        ws.onopen = () => {
            console.log("WebSocket: Connection established.");
            setSocket(ws);
        }

        ws.onerror = (error) => {
            console.error("WebSocket Error:", error);
            setSocket(null);
            ws.close();
        }

        return () => {
            if (ws.readyState === WebSocket.OPEN) {
                console.log("WebSocket: Closing connection...");
                ws.close();
            }
            setSocket(null);
        }
    }, []);

    const socketContextData: SocketContextData = {
        socket,
    };

    return (
        <SocketContext.Provider value={socketContextData}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => useContext(SocketContext);
