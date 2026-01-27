import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "./contexts/ThemeContext";
import { NavigationProvider, useNavigation } from "./contexts/NavigationContext";
import Sidebar from "./components/Sidebar";
import BottomNav from "./components/BottomNav";
import Home from "./pages/Home";
import Match from "./pages/Match";
import Cadastro from "./pages/Cadastro";
import Wishlist from "./pages/Wishlist";
import Inventario from "./pages/Inventario";
import CardDetails from "./pages/CardDetails";
import Checkout from "./pages/Checkout";
import PosPraComprador from "./pages/PosPraComprador";
import PosPraVendedor from "./pages/PosPraVendedor";

/**
 * Design Philosophy: Minimalismo Escandinavo
 * - Layout com Sidebar (desktop) e Bottom Bar (mobile)
 * - Navegação limpa e intuitiva
 * - Transições suaves entre páginas
 */

function RouterContent() {
  const { activeTab, flowState } = useNavigation();

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar - Desktop Only */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          {/* Flow States */}
          {flowState === 'card-details' && <CardDetails />}
          {flowState === 'checkout' && <Checkout />}
          {flowState === 'pos-compra-comprador' && <PosPraComprador />}
          {flowState === 'pos-compra-vendedor' && <PosPraVendedor />}
          
          {/* Main Navigation */}
          {!flowState && (
            <>
              {activeTab === 'home' && <Home />}
              {activeTab === 'troca' && <Match />}
              {activeTab === 'cadastro' && <Cadastro />}
              {activeTab === 'wishlist' && <Wishlist />}
              {activeTab === 'inventario' && <Inventario />}
            </>
          )}
        </div>
      </main>

      {/* Bottom Navigation - Mobile Only */}
      <BottomNav />
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <NavigationProvider>
            <RouterContent />
          </NavigationProvider>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

function ErrorBoundary({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export default App;
