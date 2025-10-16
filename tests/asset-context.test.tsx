import React from "react";
import { renderHook, waitFor, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { AssetsProvider, useAssets } from "../src/context/assets.context";
import { defaultAssets, type Asset } from "../src/types/asset";
import { loadAssets, saveAssets } from "../src/lib/db";
import { useSocket } from "../src/context/socket.context";

vi.mock("../src/lib/db");
vi.mock("../src/context/socket.context");

const mockedLoadAssets = vi.mocked(loadAssets);
const mockedSaveAssets = vi.mocked(saveAssets);
const mockedUseSocket = vi.mocked(useSocket, true);

let messageHandler: ((event: MessageEvent) => void) | null = null;
const mockSocket = {
    addEventListener: vi.fn((event, handler) => {
        if (event === "message") {
            messageHandler = handler;
        }
    }),
    removeEventListener: vi.fn((event, handler) => {
        if (event === "message" && messageHandler === handler) {
            messageHandler = null;
        }
    }),
};

describe("AssetsProvider", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        messageHandler = null;
        mockedUseSocket.mockReturnValue({ socket: mockSocket as any });
        mockedLoadAssets.mockResolvedValue([]);
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
        <AssetsProvider>{children}</AssetsProvider>
    );

    it("should initialize with default assets", () => {
        const { result } = renderHook(() => useAssets(), { wrapper });
        expect(result.current.assets).toEqual(defaultAssets);
    });

    it("should load assets from cache on mount", async () => {
        const cachedAssets: Asset[] = [
            { id: "bitcoin", symbol: "BTC", name: "Bitcoin", price: 50000, change: 0, history: [] },
        ];
        mockedLoadAssets.mockResolvedValue(cachedAssets);

        const { result } = renderHook(() => useAssets(), { wrapper });

        await waitFor(() => {
            expect(result.current.assets).toEqual(cachedAssets);
        });

        expect(mockedLoadAssets).toHaveBeenCalledTimes(1);
    });

    it("should save assets to cache when they change", async () => {
        const { result } = renderHook(() => useAssets(), { wrapper });

        await waitFor(() => {
            expect(mockedLoadAssets).toHaveBeenCalledTimes(1);
        });

        expect(mockedSaveAssets).not.toHaveBeenCalled();

        const newAssets: Asset[] = [
            { id: "cardano", symbol: "ADA", name: "Cardano", price: 0.5, change: 0, history: [] },
        ];
        act(() => {
            result.current.setAssets(newAssets);
        });

        await waitFor(() => {
            expect(mockedSaveAssets).toHaveBeenCalledTimes(1);
            expect(mockedSaveAssets).toHaveBeenCalledWith(newAssets);
        });
    });

    it("should remove WebSocket event listener on unmount", async () => {
        const { unmount } = renderHook(() => useAssets(), { wrapper });

        await waitFor(() => {
            expect(mockSocket.addEventListener).toHaveBeenCalledTimes(1);
        });

        unmount();

        expect(mockSocket.removeEventListener).toHaveBeenCalledTimes(1);
        expect(mockSocket.removeEventListener).toHaveBeenCalledWith("message", expect.any(Function));
    });

    it("should update assets on WebSocket message", async () => {
        const { result } = renderHook(() => useAssets(), { wrapper });

        await waitFor(() => {
            expect(mockSocket.addEventListener).toHaveBeenCalledWith("message", expect.any(Function));
        });

        act(() => {
            result.current.setAssets([
                { id: "bitcoin", symbol: "BTC", name: "Bitcoin", price: 50000, change: 0, history: [] },
                { id: "ethereum", symbol: "ETH", name: "Ethereum", price: 2000, change: 0, history: [] },
            ]);
        });

        const socketMessage = { bitcoin: "25000.50", ethereum: "2000.05" };
        const messageEvent = new MessageEvent("message", { data: JSON.stringify(socketMessage) });

        act(() => {
            if (messageHandler) messageHandler(messageEvent);
        });

        await waitFor(() => {
            const btc = result.current.assets.find(a => a.id === "bitcoin");
            const eth = result.current.assets.find(a => a.id === "ethereum");

            expect(btc?.price).toBeCloseTo(25000.5);
            expect(eth?.price).toBeCloseTo(2000.05);

            expect(btc?.change).toBeLessThan(0);
            expect(eth?.change).toBeGreaterThan(0);

            expect(btc?.history[0].price).toBeCloseTo(25000.5);
            expect(eth?.history[0].price).toBeCloseTo(2000.05);
        });
    });
});
