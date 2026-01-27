import { Home, Zap, Plus, Heart } from 'lucide-react';
import { useNavigation } from '@/contexts/NavigationContext';
import { cn } from '@/lib/utils';

/**
 * Design Philosophy: Minimalismo Escandinavo
 * - Sidebar elegante com ícones e texto
 * - Fundo branco com separadores sutis
 * - Apenas o ícone em hover, expandindo ao clicar
 * - Vermelho apenas para o item ativo
 */

export default function Sidebar() {
  const { activeTab, setActiveTab } = useNavigation();

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'match', label: 'Match', icon: Zap },
    { id: 'cadastro', label: 'Cadastro', icon: Plus },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
  ] as const;

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-card border-r border-border h-screen sticky top-0">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <h1 className="text-2xl font-bold text-foreground">PokéTrade</h1>
        <p className="text-xs text-muted-foreground mt-1">Marketplace TCG</p>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={cn(
                'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
                'hover:bg-secondary',
                isActive
                  ? 'bg-secondary text-accent font-semibold'
                  : 'text-foreground hover:text-accent'
              )}
            >
              <Icon className={cn('w-5 h-5', isActive && 'text-accent')} />
              <span className="text-sm font-medium">{item.label}</span>
              {isActive && (
                <div className="ml-auto w-1 h-6 bg-accent rounded-full" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <p className="text-xs text-muted-foreground text-center">
          v1.0 Beta
        </p>
      </div>
    </aside>
  );
}
