import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle2, Package, Truck, Clock } from 'lucide-react';
import { useState } from 'react';
import { useNavigation } from '@/contexts/NavigationContext';

/**
 * Design Philosophy: Minimalismo Escandinavo - Tema Escuro
 * - Timeline do pedido
 * - Informações de rastreamento
 * - Opção de confirmar recebimento
 * - Contato com vendedor
 */

export default function PosPraComprador() {
  const { selectedCard, setFlowState } = useNavigation();
  const [orderStatus, setOrderStatus] = useState('enviado'); // enviado, entregue, confirmado

  if (!selectedCard) {
    return (
      <div className="flex-1 pb-20 lg:pb-0 flex items-center justify-center">
        <Card className="p-8 text-center bg-card border-border">
          <p className="text-foreground">Nenhuma compra em andamento</p>
        </Card>
      </div>
    );
  }

  const handleConfirmReceipt = () => {
    setOrderStatus('confirmado');
  };

  return (
    <div className="flex-1 pb-20 lg:pb-0">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-foreground">Acompanhar Pedido</h1>
          <p className="text-muted-foreground mt-1">Pedido #2024001</p>
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
                <div className="w-24 h-32 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                  <img
                    src={selectedCard.image}
                    alt={selectedCard.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground text-lg">{selectedCard.name}</h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    {selectedCard.condition} - {selectedCard.conditionScore}/10
                  </p>
                  <p className="text-accent font-bold text-lg mt-3">
                    R$ {selectedCard.price.toFixed(2)}
                  </p>
                </div>
              </div>
            </Card>

            {/* Timeline */}
            <Card className="p-6 bg-card border-border">
              <h2 className="text-lg font-semibold text-foreground mb-6">Status do Pedido</h2>

              <div className="space-y-6">
                {/* Step 1: Pedido Confirmado */}
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <CheckCircle2 className="w-8 h-8 text-accent mb-2" />
                    <div className="w-1 h-12 bg-border" />
                  </div>
                  <div className="pb-6">
                    <p className="font-semibold text-foreground">Pedido Confirmado</p>
                    <p className="text-muted-foreground text-sm">26 de janeiro, 14:32</p>
                    <p className="text-muted-foreground text-sm mt-2">
                      Seu pedido foi confirmado. O vendedor tem 2 dias para enviar.
                    </p>
                  </div>
                </div>

                {/* Step 2: Enviado */}
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                      orderStatus === 'enviado' || orderStatus === 'entregue' || orderStatus === 'confirmado'
                        ? 'bg-accent border-accent'
                        : 'border-border'
                    }`}>
                      {(orderStatus === 'enviado' || orderStatus === 'entregue' || orderStatus === 'confirmado') && (
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <div className="w-1 h-12 bg-border" />
                  </div>
                  <div className="pb-6">
                    <p className="font-semibold text-foreground">Enviado</p>
                    <p className="text-muted-foreground text-sm">
                      {orderStatus === 'enviado' || orderStatus === 'entregue' || orderStatus === 'confirmado'
                        ? '26 de janeiro, 16:45'
                        : 'Aguardando...'}
                    </p>
                    {(orderStatus === 'enviado' || orderStatus === 'entregue' || orderStatus === 'confirmado') && (
                      <div className="mt-2 p-3 bg-secondary rounded-lg">
                        <p className="text-muted-foreground text-sm">
                          <strong>Código de Rastreio:</strong> BR123456789
                        </p>
                        <Button variant="outline" className="w-full mt-2 border-border text-xs h-8">
                          Rastrear Entrega
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Step 3: Entregue */}
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                      orderStatus === 'entregue' || orderStatus === 'confirmado'
                        ? 'bg-accent border-accent'
                        : 'border-border'
                    }`}>
                      {(orderStatus === 'entregue' || orderStatus === 'confirmado') && (
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <div className="w-1 h-12 bg-border" />
                  </div>
                  <div className="pb-6">
                    <p className="font-semibold text-foreground">Entregue</p>
                    <p className="text-muted-foreground text-sm">
                      {orderStatus === 'entregue' || orderStatus === 'confirmado'
                        ? '28 de janeiro, 10:15'
                        : 'Aguardando...'}
                    </p>
                  </div>
                </div>

                {/* Step 4: Confirmado */}
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                      orderStatus === 'confirmado'
                        ? 'bg-accent border-accent'
                        : 'border-border'
                    }`}>
                      {orderStatus === 'confirmado' && (
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Recebimento Confirmado</p>
                    <p className="text-muted-foreground text-sm">
                      {orderStatus === 'confirmado'
                        ? '28 de janeiro, 11:30'
                        : 'Aguardando...'}
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Action */}
            {orderStatus === 'entregue' && (
              <Card className="p-6 bg-green-900/20 border border-green-800">
                <h3 className="font-semibold text-green-400 mb-3">Confirmar Recebimento</h3>
                <p className="text-green-300 text-sm mb-4">
                  Você recebeu a carta? Confirme o recebimento para liberar o pagamento ao vendedor.
                </p>
                <Button
                  onClick={handleConfirmReceipt}
                  className="w-full bg-accent hover:bg-red-700 text-white"
                >
                  Confirmar Recebimento
                </Button>
              </Card>
            )}

            {orderStatus === 'confirmado' && (
              <Card className="p-6 bg-green-900/20 border border-green-800">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-400" />
                  <div>
                    <p className="font-semibold text-green-400">Transação Concluída</p>
                    <p className="text-green-300 text-sm">
                      O pagamento foi liberado para o vendedor. Obrigado por usar a PokéTrade!
                    </p>
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Seller Info */}
            <Card className="p-6 bg-card border-border">
              <h3 className="font-semibold text-foreground mb-4">Vendedor</h3>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-white font-bold">
                  {selectedCard.seller.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-foreground">{selectedCard.seller}</p>
                  <p className="text-muted-foreground text-sm">⭐ 4.8</p>
                </div>
              </div>
              <Button variant="outline" className="w-full border-border hover:bg-secondary text-sm h-9">
                Contatar Vendedor
              </Button>
            </Card>

            {/* Payment Info */}
            <Card className="p-6 bg-card border-border">
              <h3 className="font-semibold text-foreground mb-4">Pagamento</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Método</span>
                  <span className="text-foreground">Cartão de Crédito</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <Badge className="bg-yellow-900 text-yellow-200">
                    {orderStatus === 'confirmado' ? 'Liberado' : 'Seguro'}
                  </Badge>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
