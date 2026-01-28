import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, Clock, AlertCircle, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { useNavigation } from '@/contexts/NavigationContext';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { toast } from 'sonner';

/**
 * Design Philosophy: Minimalismo Escandinavo - Tema Escuro
 * - Informações do pedido
 * - Upload de foto da carta
 * - Campo para código de rastreio
 * - Prazo de 2 dias
 */

export default function PosPraVendedor() {
  const { selectedCard, setFlowState } = useNavigation();
  const { user } = useAuth();
  const { updateTransaction, transactions } = useData();
  const [photoUploaded, setPhotoUploaded] = useState(false);
  const [trackingCode, setTrackingCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!selectedCard) {
    return (
      <div className="flex-1 pb-20 lg:pb-0 flex items-center justify-center">
        <Card className="p-8 text-center bg-card border-border">
          <p className="text-foreground">Nenhuma venda em andamento</p>
        </Card>
      </div>
    );
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setPhotoUploaded(true);
      toast.success('Foto enviada com sucesso!');
    }
  };

  const handleSubmit = async () => {
    if (!photoUploaded || !trackingCode.trim()) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // Atualizar transação
    if (selectedCard && user) {
      const transaction = transactions.find(t => t.cardId === selectedCard.id && t.sellerId === user.id);
      if (transaction) {
        updateTransaction(transaction.id, {
          status: 'shipped',
          trackingCode,
          shippingDate: new Date().toISOString(),
        });
      }
    }
    
    setIsSubmitting(false);
    toast.success('Pedido enviado! Comprador receberá notificação.');
    setFlowState(null);
  };

  return (
    <div className="flex-1 pb-20 lg:pb-0">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setFlowState(null)}
              className="text-foreground hover:bg-muted"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Preparar Envio</h1>
              <p className="text-muted-foreground mt-1">Você tem 2 dias para enviar</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            {/* Deadline Alert */}
            <Card className="p-4 bg-yellow-900/20 border border-yellow-800">
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-yellow-400 text-sm">Prazo: 2 dias</p>
                  <p className="text-yellow-300 text-xs mt-1">
                    Você tem até 28 de janeiro para enviar a carta com foto e código de rastreio.
                  </p>
                </div>
              </div>
            </Card>

            {/* Order Summary */}
            <Card className="p-6 bg-card border-border">
              <h2 className="text-lg font-semibold text-foreground mb-4">Resumo da Venda</h2>
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

            {/* Upload Photo */}
            <Card className="p-6 bg-card border-border">
              <h2 className="text-lg font-semibold text-foreground mb-4">Foto da Carta</h2>
              <p className="text-muted-foreground text-sm mb-4">
                Tire uma foto clara da carta embalada para envio. Isso garante transparência com o comprador.
              </p>

              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-accent transition-colors cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                  id="photo-upload"
                />
                <label htmlFor="photo-upload" className="cursor-pointer block">
                  <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="font-semibold text-foreground mb-1">Clique para fazer upload</p>
                  <p className="text-muted-foreground text-sm">ou arraste a imagem aqui</p>
                </label>
              </div>

              {photoUploaded && (
                <div className="mt-4 p-3 bg-green-900/20 border border-green-800 rounded-lg flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-green-400" />
                  <p className="text-green-400 text-sm font-medium">Foto enviada com sucesso</p>
                </div>
              )}
            </Card>

            {/* Tracking Code */}
            <Card className="p-6 bg-card border-border">
              <h2 className="text-lg font-semibold text-foreground mb-4">Código de Rastreio</h2>
              <p className="text-muted-foreground text-sm mb-4">
                Insira o código de rastreio dos Correios ou transportadora.
              </p>

              <div className="space-y-2">
                <Label htmlFor="tracking" className="text-foreground font-medium">
                  Código de Rastreio
                </Label>
                <Input
                  id="tracking"
                  placeholder="ex: BR123456789"
                  value={trackingCode}
                  onChange={(e) => setTrackingCode(e.target.value)}
                  className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </Card>

            {/* Submit */}
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting || !photoUploaded || !trackingCode.trim()}
              className="w-full bg-accent hover:bg-red-700 text-white h-12 font-semibold"
            >
              {isSubmitting ? 'Enviando...' : 'Confirmar Envio'}
            </Button>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Buyer Info */}
            <Card className="p-6 bg-card border-border">
              <h3 className="font-semibold text-foreground mb-4">Comprador</h3>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-white font-bold">
                  C
                </div>
                <div>
                  <p className="font-medium text-foreground">Comprador123</p>
                  <p className="text-muted-foreground text-sm">⭐ 4.9</p>
                </div>
              </div>
              <Button variant="outline" className="w-full border-border hover:bg-secondary text-sm h-9">
                Contatar Comprador
              </Button>
            </Card>

            {/* Payment Status */}
            <Card className="p-6 bg-card border-border">
              <h3 className="font-semibold text-foreground mb-4">Pagamento</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Valor</span>
                  <span className="text-foreground font-medium">
                    R$ {selectedCard.price.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Status</span>
                  <Badge className="bg-blue-900 text-blue-200">Seguro na Plataforma</Badge>
                </div>
                <p className="text-muted-foreground text-xs">
                  Será liberado após comprador confirmar recebimento
                </p>
              </div>
            </Card>

            {/* Timeline */}
            <Card className="p-6 bg-card border-border">
              <h3 className="font-semibold text-foreground mb-4">Próximos Passos</h3>
              <div className="space-y-3 text-sm">
                <div className="flex gap-2">
                  <div className="w-6 h-6 rounded-full bg-accent text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Enviar Foto + Rastreio</p>
                    <p className="text-muted-foreground text-xs">Hoje</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="w-6 h-6 rounded-full border-2 border-border text-muted-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Comprador Recebe</p>
                    <p className="text-muted-foreground text-xs">Em 2-3 dias</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="w-6 h-6 rounded-full border-2 border-border text-muted-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Receber Pagamento</p>
                    <p className="text-muted-foreground text-xs">Após confirmação</p>
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
