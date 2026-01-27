import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ChevronLeft, Lock, CreditCard, Smartphone } from 'lucide-react';
import { useState } from 'react';
import { useNavigation } from '@/contexts/NavigationContext';
import { toast } from 'sonner';

/**
 * Design Philosophy: Minimalismo Escandinavo - Tema Escuro
 * - Resumo da compra
 * - Seleção de método de pagamento
 * - Informações de segurança
 * - Confirmação de compra
 */

export default function Checkout() {
  const { selectedCard, setFlowState } = useNavigation();
  const [paymentMethod, setPaymentMethod] = useState('creditcard');
  const [isProcessing, setIsProcessing] = useState(false);

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

  const handleConfirmPurchase = async () => {
    setIsProcessing(true);
    // Simular processamento
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setFlowState('pos-compra-comprador');
    toast.success('Compra realizada com sucesso!');
  };

  const taxAmount = selectedCard.price * 0.03; // 3% de taxa
  const totalAmount = selectedCard.price + taxAmount;

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
          <h1 className="text-2xl font-bold text-foreground">Finalizar Compra</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            {/* Order Summary */}
            <Card className="p-6 bg-card border-border">
              <h2 className="text-lg font-semibold text-foreground mb-4">Resumo do Pedido</h2>
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
                  <p className="text-muted-foreground text-sm mt-2">Vendedor: {selectedCard.seller}</p>
                </div>
              </div>
            </Card>

            {/* Payment Methods */}
            <Card className="p-6 bg-card border-border">
              <h2 className="text-lg font-semibold text-foreground mb-4">Método de Pagamento</h2>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                {/* Credit Card */}
                <div className="flex items-center space-x-2 p-4 border border-border rounded-lg mb-3 hover:bg-secondary transition-colors cursor-pointer">
                  <RadioGroupItem value="creditcard" id="creditcard" />
                  <Label htmlFor="creditcard" className="flex-1 cursor-pointer flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-accent" />
                    <div>
                      <p className="font-medium text-foreground">Cartão de Crédito</p>
                      <p className="text-xs text-muted-foreground">Visa, Mastercard, Elo</p>
                    </div>
                  </Label>
                </div>

                {/* PIX */}
                <div className="flex items-center space-x-2 p-4 border border-border rounded-lg mb-3 hover:bg-secondary transition-colors cursor-pointer">
                  <RadioGroupItem value="pix" id="pix" />
                  <Label htmlFor="pix" className="flex-1 cursor-pointer flex items-center gap-3">
                    <Smartphone className="w-5 h-5 text-accent" />
                    <div>
                      <p className="font-medium text-foreground">PIX</p>
                      <p className="text-xs text-muted-foreground">Transferência instantânea</p>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </Card>

            {/* Security Info */}
            <Card className="p-4 bg-blue-900/20 border border-blue-800">
              <div className="flex gap-3">
                <Lock className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-blue-400 text-sm">Compra Protegida</p>
                  <p className="text-blue-300 text-xs mt-1">
                    Seu dinheiro fica seguro na plataforma até você confirmar o recebimento da carta.
                    Se houver problema, você recebe o reembolso total.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Order Total */}
          <div>
            <Card className="p-6 bg-card border-border sticky top-24">
              <h3 className="text-lg font-semibold text-foreground mb-4">Total</h3>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Valor da Carta</span>
                  <span className="text-foreground font-medium">
                    R$ {selectedCard.price.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Taxa (3%)</span>
                  <span className="text-foreground font-medium">
                    R$ {taxAmount.toFixed(2)}
                  </span>
                </div>
                <div className="border-t border-border pt-3 flex justify-between">
                  <span className="text-foreground font-semibold">Total</span>
                  <span className="text-2xl font-bold text-accent">
                    R$ {totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>

              <Button
                onClick={handleConfirmPurchase}
                disabled={isProcessing}
                className="w-full bg-accent hover:bg-red-700 text-white h-12 font-semibold"
              >
                {isProcessing ? 'Processando...' : 'Confirmar Compra'}
              </Button>

              <p className="text-xs text-muted-foreground text-center mt-4">
                Ao confirmar, você concorda com nossos termos de serviço
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
