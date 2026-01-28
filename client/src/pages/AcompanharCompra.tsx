import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigation } from '@/contexts/NavigationContext';
import { CheckCircle2, Truck, Package, MapPin, MessageCircle, ChevronLeft } from 'lucide-react';

export default function AcompanharCompra() {
  const { setFlowState } = useNavigation();
  const [showChat, setShowChat] = useState(false);
  const [chatMessage, setChatMessage] = useState('');

  // Mock transaction
  const transaction = {
    id: 'tx-1',
    cardName: 'Charizard EX',
    cardImage: '/images/charizard-ex.jpg',
    sellerName: 'TraderPro',
    amount: 450,
    trackingCode: 'AA123456789BR',
    shippingDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
  };

  const steps = [
    {
      status: 'completed',
      title: 'Pedido Confirmado',
      description: 'Seu pedido foi confirmado',
      date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      icon: CheckCircle2,
    },
    {
      status: 'completed',
      title: 'Pagamento Processado',
      description: 'Pagamento recebido com sucesso',
      date: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000),
      icon: CheckCircle2,
    },
    {
      status: 'completed',
      title: 'Enviado',
      description: 'Sua carta foi enviada',
      date: transaction.shippingDate,
      icon: Package,
    },
    {
      status: 'in-progress',
      title: 'Em Trânsito',
      description: 'Seu pacote está a caminho',
      date: null,
      icon: Truck,
    },
    {
      status: 'pending',
      title: 'Entrega Estimada',
      description: 'Previsão de entrega',
      date: transaction.estimatedDelivery,
      icon: MapPin,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => setFlowState(null)}
              variant="ghost"
              size="sm"
              className="gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Voltar
            </Button>
            <h1 className="text-2xl font-bold text-foreground">Acompanhar Compra</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Card Info */}
        <div className="bg-card border border-border rounded-lg p-6 mb-8">
          <div className="flex items-start gap-6">
            <img
              src={transaction.cardImage}
              alt={transaction.cardName}
              className="w-32 h-40 object-cover rounded-lg"
            />

            <div className="flex-1">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                {transaction.cardName}
              </h2>
              <p className="text-muted-foreground mb-4">
                Vendedor: <span className="font-semibold text-foreground">{transaction.sellerName}</span>
              </p>

              <div className="space-y-2 mb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Código de Rastreio:</span>
                  <span className="font-mono text-foreground">{transaction.trackingCode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Valor:</span>
                  <span className="text-xl font-bold text-red-600">R$ {transaction.amount.toFixed(2)}</span>
                </div>
              </div>

              <Button
                onClick={() => setShowChat(!showChat)}
                variant="outline"
                className="gap-2 w-full"
              >
                <MessageCircle className="w-4 h-4" />
                {showChat ? 'Fechar Chat' : 'Conversar com Vendedor'}
              </Button>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-card border border-border rounded-lg p-6 mb-8">
          <h3 className="text-lg font-bold text-foreground mb-6">Status do Envio</h3>

          <div className="space-y-6">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              return (
                <div key={index} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        step.status === 'completed'
                          ? 'bg-green-600'
                          : step.status === 'in-progress'
                          ? 'bg-blue-600'
                          : 'bg-muted'
                      }`}
                    >
                      <StepIcon className="w-5 h-5 text-white" />
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`w-1 h-12 mt-2 ${
                          step.status === 'completed' ? 'bg-green-600' : 'bg-muted'
                        }`}
                      />
                    )}
                  </div>

                  <div className="pt-1 pb-6">
                    <h4 className="font-semibold text-foreground">{step.title}</h4>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                    {step.date && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {step.date.toLocaleDateString('pt-BR', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Chat */}
        {showChat && (
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-bold text-foreground mb-4">Chat com Vendedor</h3>

            <div className="bg-background rounded-lg p-4 h-64 overflow-y-auto mb-4 space-y-3">
              <div className="flex justify-end">
                <div className="bg-red-600 text-white rounded-lg px-4 py-2 max-w-xs">
                  <p className="text-sm">Oi! Quando chega minha compra?</p>
                  <p className="text-xs opacity-75 mt-1">14:30</p>
                </div>
              </div>

              <div className="flex justify-start">
                <div className="bg-muted text-foreground rounded-lg px-4 py-2 max-w-xs">
                  <p className="text-sm">Oi! Seu pacote saiu ontem. Deve chegar em 2-3 dias úteis!</p>
                  <p className="text-xs opacity-75 mt-1">14:35</p>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Digite sua mensagem..."
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                className="flex-1 bg-background border border-border rounded-lg px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:border-red-600"
              />
              <Button className="bg-red-600 hover:bg-red-700">Enviar</Button>
            </div>
          </div>
        )}

        {/* Confirmar Recebimento */}
        {steps[steps.length - 1].status !== 'pending' && (
          <div className="mt-8 bg-green-600/10 border border-green-600/50 rounded-lg p-6">
            <h3 className="text-lg font-bold text-green-600 mb-2">Recebeu sua compra?</h3>
            <p className="text-muted-foreground mb-4">
              Confirme o recebimento para liberar o pagamento ao vendedor e finalizar a transação.
            </p>
            <Button className="bg-green-600 hover:bg-green-700 gap-2">
              <CheckCircle2 className="w-4 h-4" />
              Confirmar Recebimento
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
