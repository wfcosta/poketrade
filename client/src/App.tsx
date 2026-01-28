import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "./contexts/ThemeContext";
import { NavigationProvider, useNavigation } from "./contexts/NavigationContext";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { DataProvider } from "./contexts/DataContext";
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
import PosPraVendedor2 from "./pages/PosPraVendedor2";
import ProporTroca from "./pages/ProporTroca";
import TrocaConfirmada from "./pages/TrocaConfirmada";
import TrocaMesmaCidade from "./pages/TrocaMesmaCidade";
import AcompanharCompra from "./pages/AcompanharCompra";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Historico from "./pages/Historico";
import Notificacoes from "./pages/Notificacoes";

/**
 * Design Philosophy: Minimalismo Escandinavo
 * - Layout com Sidebar (desktop) e Bottom Bar (mobile)
 * - Navegação limpa e intuitiva
 * - Transições suaves entre páginas
 */

function RouterContent() {
  const { activeTab, flowState } = useNavigation();
  const { isLoggedIn } = useAuth();

  // Se não está logado, mostra login
  if (!isLoggedIn) {
    return <Login />;
  }

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
          {flowState === 'pos-venda-vendedor' && <PosPraVendedor2 />}
          {flowState === 'propor-troca' && <ProporTroca />}
          {flowState === 'troca-confirmada' && <TrocaConfirmada />}
          {flowState === 'troca-mesma-cidade' && <TrocaMesmaCidade />}
          {flowState === 'acompanhar-compra' && <AcompanharCompra />}
          
          {/* Main Navigation */}
          {!flowState && (
            <>
              {activeTab === 'home' && <Home />}
              {activeTab === 'troca' && <Match />}
              {activeTab === 'cadastro' && <Cadastro />}
              {activeTab === 'wishlist' && <Wishlist />}
              {activeTab === 'inventario' && <Inventario />}
              {activeTab === 'perfil' && <Profile />}
              {activeTab === 'historico' && <Historico />}
              {activeTab === 'notificacoes' && <Notificacoes />}
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
          <AuthProvider>
            <DataProvider>
              <NavigationProvider>
                <RouterContent />
              </NavigationProvider>
            </DataProvider>
          </AuthProvider>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

function ErrorBoundary({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export default App;
