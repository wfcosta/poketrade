import { Home, Zap, Plus, Heart, Package, User, Clock, Bell, LogOut } from 'lucide-react';
import { useNavigation } from '@/contexts/NavigationContext';
import { useAuth } from '@/contexts/AuthContext';
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
  const { logout } = useAuth();

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'troca', label: 'Trocar', icon: Zap },
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

      {/* Inventário e Secundários */}
      <div className="p-4 border-t border-border space-y-2">
        <button
          onClick={() => setActiveTab('inventario' as any)}
          className={cn(
            'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
            'hover:bg-secondary',
            activeTab === 'inventario'
              ? 'bg-secondary text-accent font-semibold'
              : 'text-foreground hover:text-accent'
          )}
        >
          <Package className={cn('w-5 h-5', activeTab === 'inventario' && 'text-accent')} />
          <span className="text-sm font-medium">Inventário</span>
          {activeTab === 'inventario' && (
            <div className="ml-auto w-1 h-6 bg-accent rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('historico' as any)}
          className={cn(
            'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
            'hover:bg-secondary',
            activeTab === 'historico'
              ? 'bg-secondary text-accent font-semibold'
              : 'text-foreground hover:text-accent'
          )}
        >
          <Clock className={cn('w-5 h-5', activeTab === 'historico' && 'text-accent')} />
          <span className="text-sm font-medium">Histórico</span>
          {activeTab === 'historico' && (
            <div className="ml-auto w-1 h-6 bg-accent rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('notificacoes' as any)}
          className={cn(
            'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
            'hover:bg-secondary',
            activeTab === 'notificacoes'
              ? 'bg-secondary text-accent font-semibold'
              : 'text-foreground hover:text-accent'
          )}
        >
          <Bell className={cn('w-5 h-5', activeTab === 'notificacoes' && 'text-accent')} />
          <span className="text-sm font-medium">Notificações</span>
          {activeTab === 'notificacoes' && (
            <div className="ml-auto w-1 h-6 bg-accent rounded-full" />
          )}
        </button>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-border space-y-2">
        <button
          onClick={() => setActiveTab('perfil' as any)}
          className={cn(
            'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
            'hover:bg-secondary',
            activeTab === 'perfil'
              ? 'bg-secondary text-accent font-semibold'
              : 'text-foreground hover:text-accent'
          )}
        >
          <User className={cn('w-5 h-5', activeTab === 'perfil' && 'text-accent')} />
          <span className="text-sm font-medium">Perfil</span>
          {activeTab === 'perfil' && (
            <div className="ml-auto w-1 h-6 bg-accent rounded-full" />
          )}
        </button>

        <button
          onClick={() => logout()}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-red-600 hover:bg-red-600/10"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-medium">Sair</span>
        </button>

        <p className="text-xs text-muted-foreground text-center pt-2">
          v3.0 Beta
        </p>
      </div>
    </aside>
  );
}
