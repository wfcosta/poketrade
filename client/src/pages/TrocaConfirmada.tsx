import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, Clock, AlertCircle, CheckCircle2, ArrowRightLeft } from 'lucide-react';
import { useState } from 'react';
import { useNavigation } from '@/contexts/NavigationContext';
import { toast } from 'sonner';

/**
 * Design Philosophy: Minimalismo Escandinavo - Tema Escuro
 * - Timeline de troca
 * - Upload de foto para ambos
 * - Código de rastreio para ambos
 * - Status de confirmação
 */

export default function TrocaConfirmada() {
  const { selectedCard, setFlowState } = useNavigation();
  const [myPhotoUploaded, setMyPhotoUploaded] = useState(false);
  const [myTrackingCode, setMyTrackingCode] = useState('');
  const [otherPhotoUploaded, setOtherPhotoUploaded] = useState(false);
  const [otherTrackingCode, setOtherTrackingCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tradeStatus, setTradeStatus] = useState('waiting'); // waiting, sent, received, confirmed

  if (!selectedCard) {
    return (
      <div className="flex-1 pb-20 lg:pb-0 flex items-center justify-center">
        <Card className="p-8 text-center bg-card border-border">
          <p className="text-foreground">Nenhuma troca em andamento</p>
        </Card>
      </div>
    );
  }

  const handleMyPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setMyPhotoUploaded(true);
      toast.success('Sua foto foi enviada!');
    }
  };

  const handleSubmitMyPart = async () => {
    if (!myPhotoUploaded || !myTrackingCode.trim()) {
      toast.error('Preencha foto e código de rastreio');
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setTradeStatus('sent');
    toast.success('Sua parte foi enviada! Aguardando o outro usuário...');
  };

  const handleConfirmReceipt = async () => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setTradeStatus('confirmed');
    toast.success('Troca confirmada! Ambos receberão o reembolso.');
  };

  return (
    <div className="flex-1 pb-20 lg:pb-0">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-foreground">Troca Confirmada</h1>
          <p className="text-muted-foreground mt-1">Troca #2024001</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Timeline */}
        <Card className="p-6 bg-card border-border mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-6">Status da Troca</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Step 1 */}
            <div className="text-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 ${
                tradeStatus === 'waiting' || tradeStatus === 'sent' || tradeStatus === 'received' || tradeStatus === 'confirmed'
                  ? 'bg-accent text-white'
                  : 'bg-secondary text-muted-foreground'
              }`}>
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <p className="font-semibold text-foreground text-sm">Troca Proposta</p>
              <p className="text-muted-foreground text-xs">26 de janeiro</p>
            </div>

            {/* Arrow */}
            <div className="flex items-center justify-center">
              <ArrowRightLeft className="w-5 h-5 text-muted-foreground" />
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 ${
                tradeStatus === 'sent' || tradeStatus === 'received' || tradeStatus === 'confirmed'
                  ? 'bg-accent text-white'
                  : 'bg-secondary text-muted-foreground'
              }`}>
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <p className="font-semibold text-foreground text-sm">Ambos Enviam</p>
              <p className="text-muted-foreground text-xs">Prazo: 2 dias</p>
            </div>

            {/* Arrow */}
            <div className="flex items-center justify-center">
              <ArrowRightLeft className="w-5 h-5 text-muted-foreground" />
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 ${
                tradeStatus === 'received' || tradeStatus === 'confirmed'
                  ? 'bg-accent text-white'
                  : 'bg-secondary text-muted-foreground'
              }`}>
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <p className="font-semibold text-foreground text-sm">Ambos Recebem</p>
              <p className="text-muted-foreground text-xs">Confirmar recebimento</p>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Your Part */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-foreground">Sua Parte</h2>

            {/* Deadline Alert */}
            <Card className="p-4 bg-yellow-900/20 border border-yellow-800">
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-yellow-400 text-sm">Prazo: 2 dias</p>
                  <p className="text-yellow-300 text-xs mt-1">
                    Envie a foto e código de rastreio até 28 de janeiro
                  </p>
                </div>
              </div>
            </Card>

            {/* Your Card */}
            <Card className="p-4 bg-secondary border-border">
              <p className="text-muted-foreground text-sm mb-2">Você está enviando</p>
              <div className="flex gap-3">
                <div className="w-16 h-22 rounded-lg overflow-hidden bg-card flex-shrink-0">
                  <img
                    src={selectedCard.image}
                    alt={selectedCard.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">{selectedCard.name}</p>
                  <p className="text-muted-foreground text-xs">
                    {selectedCard.condition} - {selectedCard.conditionScore}/10
                  </p>
                </div>
              </div>
            </Card>

            {/* Photo Upload */}
            {tradeStatus === 'waiting' && (
              <div className="space-y-4">
                <div>
                  <Label className="text-foreground font-semibold mb-3 block">Foto da Carta Embalada</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-accent transition-colors cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleMyPhotoUpload}
                      className="hidden"
                      id="my-photo"
                    />
                    <label htmlFor="my-photo" className="cursor-pointer block">
                      <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
                      <p className="font-semibold text-foreground text-sm">Clique para fazer upload</p>
                    </label>
                  </div>
                  {myPhotoUploaded && (
                    <div className="mt-2 p-2 bg-green-900/20 border border-green-800 rounded flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-400" />
                      <p className="text-green-400 text-xs">Foto enviada</p>
                    </div>
                  )}
                </div>

                {/* Tracking Code */}
                <div>
                  <Label htmlFor="my-tracking" className="text-foreground font-semibold mb-2 block">
                    Código de Rastreio
                  </Label>
                  <Input
                    id="my-tracking"
                    placeholder="ex: BR123456789"
                    value={myTrackingCode}
                    onChange={(e) => setMyTrackingCode(e.target.value)}
                    className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
                  />
                </div>

                <Button
                  onClick={handleSubmitMyPart}
                  disabled={isSubmitting || !myPhotoUploaded || !myTrackingCode.trim()}
                  className="w-full bg-accent hover:bg-red-700 text-white"
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar Minha Parte'}
                </Button>
              </div>
            )}

            {tradeStatus !== 'waiting' && (
              <Card className="p-4 bg-green-900/20 border border-green-800">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="font-semibold text-green-400 text-sm">Sua parte enviada!</p>
                    <p className="text-green-300 text-xs mt-1">Código: BR123456789</p>
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* Other User's Part */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-foreground">Parte do Outro Usuário</h2>

            {/* Status Badge */}
            <Card className="p-4 bg-secondary border-border">
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground text-sm">Status</p>
                <Badge className={
                  tradeStatus === 'waiting' ? 'bg-yellow-900 text-yellow-200' :
                  tradeStatus === 'sent' ? 'bg-blue-900 text-blue-200' :
                  'bg-green-900 text-green-200'
                }>
                  {tradeStatus === 'waiting' ? 'Aguardando...' :
                   tradeStatus === 'sent' ? 'Enviado' :
                   'Recebido'}
                </Badge>
              </div>
            </Card>

            {/* Other Card */}
            <Card className="p-4 bg-secondary border-border">
              <p className="text-muted-foreground text-sm mb-2">Você vai receber</p>
              <div className="flex gap-3">
                <div className="w-16 h-22 rounded-lg overflow-hidden bg-card flex-shrink-0">
                  <img
                    src="/images/charizard-ex-2.png"
                    alt="Charizard EX 151"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">Charizard EX 151</p>
                  <p className="text-muted-foreground text-xs">Near Mint - 9/10</p>
                </div>
              </div>
            </Card>

            {tradeStatus === 'sent' && (
              <Card className="p-4 bg-blue-900/20 border border-blue-800">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-5 h-5 text-blue-400" />
                  <p className="font-semibold text-blue-400 text-sm">Enviado</p>
                </div>
                <p className="text-blue-300 text-xs">Código: BR987654321</p>
              </Card>
            )}

            {tradeStatus === 'received' && (
              <Card className="p-4 bg-green-900/20 border border-green-800">
                <p className="font-semibold text-green-400 text-sm mb-2">Recebido!</p>
                <p className="text-green-300 text-xs mb-4">
                  Confirme o recebimento para liberar o reembolso de ambos
                </p>
                <Button
                  onClick={handleConfirmReceipt}
                  disabled={isSubmitting}
                  className="w-full bg-accent hover:bg-red-700 text-white text-sm h-9"
                >
                  {isSubmitting ? 'Confirmando...' : 'Confirmar Recebimento'}
                </Button>
              </Card>
            )}

            {tradeStatus === 'confirmed' && (
              <Card className="p-4 bg-green-900/20 border border-green-800">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  <p className="font-semibold text-green-400 text-sm">Troca Concluída!</p>
                </div>
              </Card>
            )}
          </div>
        </div>

        {/* Payment Info */}
        {tradeStatus === 'confirmed' && (
          <Card className="mt-8 p-6 bg-green-900/20 border border-green-800">
            <h3 className="font-semibold text-green-400 mb-4">Reembolso Processado</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-green-300 text-sm">Você recebeu de volta</p>
                <p className="text-2xl font-bold text-green-400">R$ 280.00</p>
              </div>
              <div>
                <p className="text-green-300 text-sm">Outro usuário recebeu de volta</p>
                <p className="text-2xl font-bold text-green-400">R$ 450.00</p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
