import { Home, Zap, Plus, Heart } from 'lucide-react';
import { useNavigation } from '@/contexts/NavigationContext';
import { cn } from '@/lib/utils';

/**
 * Design Philosophy: Minimalismo Escandinavo
 * - Bottom bar elegante com ícones apenas
 * - Fundo branco com borda superior sutil
 * - Indicador vermelho para item ativo
 * - Transições suaves ao trocar de aba
 */

export default function BottomNav() {
  const { activeTab, setActiveTab } = useNavigation();

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'match', label: 'Match', icon: Zap },
    { id: 'cadastro', label: 'Cadastro', icon: Plus },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
  ] as const;

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={cn(
                'flex flex-col items-center justify-center w-16 h-16 transition-all duration-200',
                isActive ? 'text-accent' : 'text-muted-foreground hover:text-foreground'
              )}
              title={item.label}
            >
              <Icon className="w-6 h-6" />
              {isActive && (
                <div className="absolute bottom-0 w-8 h-1 bg-accent rounded-t-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
