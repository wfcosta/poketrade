import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { useNavigation } from '@/contexts/NavigationContext';
import { Package, Truck, CheckCircle, Clock, ChevronRight } from 'lucide-react';

const STATUS_CONFIG = {
  pending: { label: 'Pendente', icon: Clock, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
  paid: { label: 'Pago', icon: CheckCircle, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  shipped: { label: 'Enviado', icon: Truck, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  delivered: { label: 'Entregue', icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-500/10' },
  completed: { label: 'Concluído', icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-600/10' },
  cancelled: { label: 'Cancelado', icon: Clock, color: 'text-red-500', bg: 'bg-red-500/10' },
};

export default function Historico() {
  const { user } = useAuth();
  const { getTransactionsByUserId } = useData();
  const { setFlowState } = useNavigation();
  const [filterType, setFilterType] = useState<'all' | 'buy' | 'sell' | 'trade'>('all');

  if (!user) {
    return <div>Carregando...</div>;
  }

  const transactions = getTransactionsByUserId(user.id);
  const filtered = filterType === 'all' 
    ? transactions 
    : transactions.filter(t => t.type === filterType);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-foreground mb-4">Histórico de Transações</h1>

          {/* Filtros */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {(['all', 'buy', 'sell', 'trade'] as const).map((type) => (
              <Button
                key={type}
                onClick={() => setFilterType(type)}
                variant={filterType === type ? 'default' : 'outline'}
                className={filterType === type ? 'bg-red-600 hover:bg-red-700' : ''}
              >
                {type === 'all' && 'Todas'}
                {type === 'buy' && 'Compras'}
                {type === 'sell' && 'Vendas'}
                {type === 'trade' && 'Trocas'}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {filtered.length > 0 ? (
          <div className="space-y-4">
            {filtered.map((transaction) => {
              const statusConfig = STATUS_CONFIG[transaction.status];
              const StatusIcon = statusConfig.icon;
              const isBuyer = transaction.buyerId === user.id;

              return (
                <div
                  key={transaction.id}
                  className="bg-card border border-border rounded-lg p-4 hover:border-red-600/50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    {/* Imagem */}
                    <img
                      src={transaction.cardImage}
                      alt={transaction.cardName}
                      className="w-24 h-32 object-cover rounded-lg"
                    />

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">
                            {transaction.cardName}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {transaction.type === 'buy' && `Comprado de ${transaction.sellerName}`}
                            {transaction.type === 'sell' && `Vendido para ${transaction.buyerName}`}
                            {transaction.type === 'trade' && `Trocado com ${isBuyer ? transaction.sellerName : transaction.buyerName}`}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-red-600">
                            R$ {transaction.amount.toFixed(2)}
                          </div>
                          <div className={`inline-flex items-center gap-1 px-2 py-1 rounded text-sm font-semibold mt-1 ${statusConfig.bg} ${statusConfig.color}`}>
                            <StatusIcon className="w-4 h-4" />
                            {statusConfig.label}
                          </div>
                        </div>
                      </div>

                      {/* Timeline */}
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center justify-between">
                          <span>Pedido criado</span>
                          <span>{new Date(transaction.createdAt).toLocaleDateString('pt-BR')}</span>
                        </div>

                        {transaction.paymentMethod && (
                          <div className="flex items-center justify-between">
                            <span>Método de pagamento</span>
                            <span className="capitalize">
                              {transaction.paymentMethod === 'credit_card' ? 'Cartão de Crédito' : 'PIX'}
                            </span>
                          </div>
                        )}

                        {transaction.shippingDate && (
                          <div className="flex items-center justify-between">
                            <span>Enviado</span>
                            <span>{new Date(transaction.shippingDate).toLocaleDateString('pt-BR')}</span>
                          </div>
                        )}

                        {transaction.trackingCode && (
                          <div className="flex items-center justify-between">
                            <span>Código de rastreio</span>
                            <span className="font-mono text-foreground">{transaction.trackingCode}</span>
                          </div>
                        )}

                        {transaction.deliveryDate && (
                          <div className="flex items-center justify-between">
                            <span>Entregue</span>
                            <span>{new Date(transaction.deliveryDate).toLocaleDateString('pt-BR')}</span>
                          </div>
                        )}
                      </div>

                      {/* Ações */}
                      <div className="flex gap-2 mt-4">
                        {transaction.status === 'shipped' && isBuyer && (
                          <Button
                            onClick={() => setFlowState('acompanhar-compra')}
                            className="gap-2 bg-red-600 hover:bg-red-700"
                          >
                            Acompanhar Envio
                            <ChevronRight className="w-4 h-4" />
                          </Button>
                        )}

                        {transaction.status === 'delivered' && isBuyer && (
                          <Button
                            variant="outline"
                            className="gap-2"
                          >
                            Deixar Avaliação
                            <ChevronRight className="w-4 h-4" />
                          </Button>
                        )}

                        {transaction.status === 'paid' && !isBuyer && (
                          <Button
                            variant="outline"
                            className="gap-2"
                          >
                            Preparar Envio
                            <ChevronRight className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <Package className="w-12 h-12 text-muted mx-auto mb-4" />
            <p className="text-muted-foreground">Nenhuma transação encontrada</p>
          </div>
        )}
      </div>
    </div>
  );
}
