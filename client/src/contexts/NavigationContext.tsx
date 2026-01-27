import React, { createContext, useContext, useState } from 'react';

export type NavTab = 'home' | 'troca' | 'cadastro' | 'wishlist' | 'inventario' | 'perfil';
export type FlowState = 'card-details' | 'checkout' | 'pos-compra-vendedor' | 'pos-compra-comprador' | 'propor-troca' | 'troca-confirmada' | 'troca-mesma-cidade' | null;

interface NavigationContextType {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  flowState: FlowState;
  setFlowState: (state: FlowState) => void;
  selectedCard: any;
  setSelectedCard: (card: any) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  // Adicionar inventario e perfil depois
  const [flowState, setFlowState] = useState<FlowState>(null);
  const [selectedCard, setSelectedCard] = useState<any>(null);

  return (
    <NavigationContext.Provider value={{ activeTab, setActiveTab, flowState, setFlowState, selectedCard, setSelectedCard }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within NavigationProvider');
  }
  return context;
}
