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

/**
 * Design Philosophy: Minimalismo Escandinavo
 * - Layout com Sidebar (desktop) e Bottom Bar (mobile)
 * - Navegação limpa e intuitiva
 * - Transições suaves entre páginas
 */

function RouterContent() {
  const { activeTab } = useNavigation();

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar - Desktop Only */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'home' && <Home />}
          {activeTab === 'match' && <Match />}
          {activeTab === 'cadastro' && <Cadastro />}
          {activeTab === 'wishlist' && <Wishlist />}
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
      <ThemeProvider defaultTheme="light">
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
