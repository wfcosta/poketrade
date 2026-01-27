import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ChevronLeft, MapPin, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { useNavigation } from '@/contexts/NavigationContext';
import { toast } from 'sonner';

/**
 * Design Philosophy: Minimalismo Escandinavo - Tema Escuro
 * - Seleção da carta que o usuário quer trocar
 * - Opção de troca presencial (mesma cidade)
 * - Resumo da troca com cobrança dupla
 * - Confirmação de proposta
 */

interface InventoryCard {
  id: string;
  name: string;
  image: string;
  price: number;
  condition: string;
  conditionScore: number;
}

const mockInventory: InventoryCard[] = [
  {
    id: 'inv-1',
    name: 'Pikachu Base Set',
    image: 'https://via.placeholder.com/150x200?text=Pikachu',
    price: 150.00,
    condition: 'Near Mint',
    conditionScore: 9,
  },
  {
    id: 'inv-2',
    name: 'Blastoise Holo',
    image: 'https://via.placeholder.com/150x200?text=Blastoise',
    price: 280.00,
    condition: 'Excellent',
    conditionScore: 8,
  },
];

export default function ProporTroca() {
  const { selectedCard, setFlowState } = useNavigation();
  const [selectedInventoryCard, setSelectedInventoryCard] = useState<InventoryCard | null>(
    mockInventory[0]
  );
  const [tradeType, setTradeType] = useState('online'); // online ou presencial
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!selectedCard) {
    return (
      <div className="flex-1 pb-20 lg:pb-0 flex items-center justify-center">
        <Card className="p-8 text-center bg-card border-border">
          <p className="text-foreground">Nenhuma carta selecionada</p>
        </Card>
      </div>
    );
  }

  const handleBack = () => {
    setFlowState('card-details');
  };

  const handleProposeTrade = async () => {
    if (!selectedInventoryCard) {
      toast.error('Selecione uma carta para trocar');
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);

    if (tradeType === 'presencial') {
      setFlowState('troca-mesma-cidade');
    } else {
      setFlowState('troca-confirmada');
    }
    toast.success('Proposta de troca enviada!');
  };

  const totalDebit = selectedCard.price + (selectedInventoryCard?.price || 0);

  return (
    <div className="flex-1 pb-20 lg:pb-0">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={handleBack}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-foreground" />
          </button>
          <h1 className="text-2xl font-bold text-foreground">Propor Troca</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            {/* Info Alert */}
            <Card className="p-4 bg-blue-900/20 border border-blue-800">
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-blue-400 text-sm">Como funciona a troca</p>
                  <p className="text-blue-300 text-xs mt-1">
                    Ambos os usuários pagam o valor de suas cartas como garantia. Após envio e confirmação de recebimento, o dinheiro é devolvido.
                  </p>
                </div>
              </div>
            </Card>

            {/* Your Card */}
            <div>
              <p className="text-foreground font-semibold mb-3">Você quer:</p>
              <Card className="p-4 bg-card border-border">
                <div className="flex gap-4">
                  <div className="w-20 h-28 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                    <img
                      src={selectedCard.image}
                      alt={selectedCard.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{selectedCard.name}</h3>
                    <p className="text-muted-foreground text-sm">
                      {selectedCard.condition} - {selectedCard.conditionScore}/10
                    </p>
                    <p className="text-accent font-bold mt-2">R$ {selectedCard.price.toFixed(2)}</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Your Inventory */}
            <div>
              <p className="text-foreground font-semibold mb-3">Você oferece:</p>
              <div className="space-y-2">
                {mockInventory.map((card) => (
                  <Card
                    key={card.id}
                    onClick={() => setSelectedInventoryCard(card)}
                    className={`p-4 cursor-pointer transition-all border-2 ${
                      selectedInventoryCard?.id === card.id
                        ? 'bg-secondary border-accent'
                        : 'bg-card border-border hover:border-accent/50'
                    }`}
                  >
                    <div className="flex gap-4">
                      <div className="w-20 h-28 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                        <img
                          src={card.image}
                          alt={card.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">{card.name}</h3>
                        <p className="text-muted-foreground text-sm">
                          {card.condition} - {card.conditionScore}/10
                        </p>
                        <p className="text-accent font-bold mt-2">R$ {card.price.toFixed(2)}</p>
                      </div>
                      {selectedInventoryCard?.id === card.id && (
                        <div className="flex items-center">
                          <Badge className="bg-accent text-white">Selecionado</Badge>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Trade Type */}
            <div>
              <p className="text-foreground font-semibold mb-3">Tipo de Troca</p>
              <RadioGroup value={tradeType} onValueChange={setTradeType}>
                {/* Online */}
                <div className="flex items-center space-x-2 p-4 border border-border rounded-lg mb-3 hover:bg-secondary transition-colors cursor-pointer">
                  <RadioGroupItem value="online" id="online" />
                  <Label htmlFor="online" className="flex-1 cursor-pointer">
                    <p className="font-medium text-foreground">Troca Online</p>
                    <p className="text-xs text-muted-foreground">
                      Ambos enviam por correio com rastreio
                    </p>
                  </Label>
                </div>

                {/* Presencial */}
                <div className="flex items-center space-x-2 p-4 border border-border rounded-lg hover:bg-secondary transition-colors cursor-pointer">
                  <RadioGroupItem value="presencial" id="presencial" />
                  <Label htmlFor="presencial" className="flex-1 cursor-pointer">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-accent" />
                      <div>
                        <p className="font-medium text-foreground">Troca Presencial</p>
                        <p className="text-xs text-muted-foreground">
                          Mesma cidade - Taxa pequena + chat para negociar
                        </p>
                      </div>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Submit */}
            <Button
              onClick={handleProposeTrade}
              disabled={isSubmitting || !selectedInventoryCard}
              className="w-full bg-accent hover:bg-red-700 text-white h-12 font-semibold"
            >
              {isSubmitting ? 'Enviando Proposta...' : 'Enviar Proposta de Troca'}
            </Button>
          </div>

          {/* Sidebar */}
          <div>
            <Card className="p-6 bg-card border-border sticky top-24">
              <h3 className="font-semibold text-foreground mb-4">Resumo da Troca</h3>

              <div className="space-y-4">
                <div>
                  <p className="text-muted-foreground text-xs mb-1">Você quer</p>
                  <p className="font-semibold text-foreground">{selectedCard.name}</p>
                  <p className="text-accent font-bold">R$ {selectedCard.price.toFixed(2)}</p>
                </div>

                <div className="border-t border-border pt-4">
                  <p className="text-muted-foreground text-xs mb-1">Você oferece</p>
                  <p className="font-semibold text-foreground">
                    {selectedInventoryCard?.name || 'Selecione uma carta'}
                  </p>
                  {selectedInventoryCard && (
                    <p className="text-accent font-bold">
                      R$ {selectedInventoryCard.price.toFixed(2)}
                    </p>
                  )}
                </div>

                <div className="border-t border-border pt-4 bg-yellow-900/20 p-3 rounded-lg">
                  <p className="text-muted-foreground text-xs mb-2">Será debitado de você</p>
                  <p className="text-2xl font-bold text-accent">
                    R$ {selectedInventoryCard ? totalDebit.toFixed(2) : '0.00'}
                  </p>
                  <p className="text-muted-foreground text-xs mt-2">
                    Como garantia. Será devolvido após confirmação.
                  </p>
                </div>

                <div className="border-t border-border pt-4">
                  <p className="text-muted-foreground text-xs mb-1">Vendedor</p>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white text-xs font-bold">
                      T
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">TraderPro</p>
                      <p className="text-muted-foreground text-xs">⭐ 4.8</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
