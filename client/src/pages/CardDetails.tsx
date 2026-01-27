import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heart, ShoppingCart, Repeat2, ChevronLeft, Star } from 'lucide-react';
import { useState } from 'react';
import { useNavigation } from '@/contexts/NavigationContext';
import { toast } from 'sonner';

/**
 * Design Philosophy: Minimalismo Escandinavo - Tema Escuro
 * - Imagem grande da carta
 * - Detalhes completos do card
 * - Opções de compra ou troca
 * - Informações do vendedor
 */

export default function CardDetails() {
  const { selectedCard, setFlowState, setActiveTab } = useNavigation();
  const [isWishlisted, setIsWishlisted] = useState(false);

  if (!selectedCard) {
    return (
      <div className="flex-1 pb-20 lg:pb-0 flex items-center justify-center">
        <Card className="p-8 text-center bg-card border-border">
          <p className="text-foreground">Nenhuma carta selecionada</p>
        </Card>
      </div>
    );
  }

  const handleBuy = () => {
    setFlowState('checkout');
    toast('Iniciando compra...');
  };

  const handleTrade = () => {
    setFlowState('propor-troca');
    toast('Iniciando troca...');
  };

  const handleBack = () => {
    setFlowState(null);
  };

  return (
    <div className="flex-1 pb-20 lg:pb-0">
      {/* Header com Botão Voltar */}
      <div className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={handleBack}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-foreground" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{selectedCard.name}</h1>
            <p className="text-muted-foreground text-sm">por {selectedCard.seller}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image Section */}
          <div>
            <Card className="overflow-hidden bg-secondary border-border">
              <div className="aspect-[3/4] bg-secondary">
                <img
                  src={selectedCard.image}
                  alt={selectedCard.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </Card>

            {/* Wishlist Button */}
            <Button
              onClick={() => setIsWishlisted(!isWishlisted)}
              variant="outline"
              className="w-full mt-4 border-border hover:bg-secondary"
            >
              <Heart
                className={`w-5 h-5 mr-2 ${
                  isWishlisted ? 'fill-accent text-accent' : 'text-muted-foreground'
                }`}
              />
              {isWishlisted ? 'Adicionado à Wishlist' : 'Adicionar à Wishlist'}
            </Button>
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            {/* Price */}
            <div className="bg-secondary p-6 rounded-lg border border-border">
              <p className="text-muted-foreground text-sm mb-2">Preço</p>
              <p className="text-4xl font-bold text-accent">
                R$ {selectedCard.price.toFixed(2)}
              </p>
            </div>

            {/* Condition */}
            <div className="space-y-3">
              <p className="text-foreground font-semibold">Estado da Carta</p>
              <div className="flex items-center gap-3">
                <Badge className="bg-accent text-white text-lg px-4 py-2">
                  {selectedCard.condition}
                </Badge>
                <div className="flex gap-1">
                  {[...Array(10)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < selectedCard.conditionScore
                          ? 'fill-accent text-accent'
                          : 'text-muted-foreground'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-muted-foreground text-sm">
                {selectedCard.conditionScore}/10 - {selectedCard.condition}
              </p>
            </div>

            {/* Seller Info */}
            <div className="bg-secondary p-4 rounded-lg border border-border">
              <p className="text-foreground font-semibold mb-2">Vendedor</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-white font-bold">
                  {selectedCard.seller.charAt(0)}
                </div>
                <div>
                  <p className="text-foreground font-medium">{selectedCard.seller}</p>
                  <p className="text-muted-foreground text-sm">⭐ 4.8 (234 avaliações)</p>
                </div>
              </div>
            </div>

            {/* Trade Available */}
            {selectedCard.acceptsTrade && (
              <div className="bg-green-900/20 border border-green-800 p-4 rounded-lg">
                <div className="flex items-center gap-2">
                  <Repeat2 className="w-5 h-5 text-green-400" />
                  <p className="text-green-400 font-medium">Aceita trocas</p>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3 pt-4">
              <Button
                onClick={handleBuy}
                className="w-full bg-accent hover:bg-red-700 text-white h-12 text-base font-semibold"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Comprar Agora
              </Button>

              {selectedCard.acceptsTrade && (
                <Button
                  onClick={handleTrade}
                  variant="outline"
                  className="w-full border-border hover:bg-secondary h-12 text-base font-semibold"
                >
                  <Repeat2 className="w-5 h-5 mr-2" />
                  Propor Troca
                </Button>
              )}
            </div>

            {/* Security Info */}
            <div className="bg-blue-900/20 border border-blue-800 p-4 rounded-lg">
              <p className="text-blue-400 text-sm">
                ✓ Compra segura - Pagamento protegido até confirmação do recebimento
              </p>
            </div>
          </div>
        </div>

        {/* Description */}
        <Card className="mt-8 p-6 bg-card border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">Sobre esta Carta</h3>
          <div className="space-y-3 text-muted-foreground">
            <p>
              Charizard EX é uma das cartas mais procuradas do Pokémon Trading Card Game. Esta
              cópia está em perfeito estado (Mint 10/10), ideal para colecionadores.
            </p>
            <p>
              A carta foi armazenada em protetor desde o momento da abertura do booster. Nunca
              foi jogada, apenas examinada com cuidado.
            </p>
            <p>
              Envio rápido e seguro para todo o Brasil. O vendedor tem 100% de avaliações
              positivas.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
