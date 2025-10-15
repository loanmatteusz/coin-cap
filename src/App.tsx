import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { AppNavbar } from "@/components/AppNavbar";

import { Marketcap } from "@/pages/Marketcap";
import { AssetDetail } from "@/pages/AssetDetail";

function App() {
  const defaultOpen = true;

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <div className="min-h-screen antialiased flex">
          <SidebarProvider defaultOpen={defaultOpen}>
            <AppSidebar />

            <main className="flex-1 w-full mb-4 flex flex-col">
              <AppNavbar />

              <div className="px-4 flex-1">
                <Routes>
                  <Route path="/" element={<Marketcap />} />
                  <Route path="/:assetId" element={<AssetDetail />} />
                </Routes>
              </div>
            </main>
          </SidebarProvider>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
