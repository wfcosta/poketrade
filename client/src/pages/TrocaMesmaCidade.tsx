import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Send, MapPin, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { useNavigation } from '@/contexts/NavigationContext';
import { toast } from 'sonner';

/**
 * Design Philosophy: Minimalismo Escandinavo - Tema Escuro
 * - Chat entre usuários
 * - IA analisando conversa
 * - Opção de marcar encontro
 * - Taxa pequena pela negociação presencial
 */

interface Message {
  id: string;
  sender: 'user' | 'other' | 'ai';
  text: string;
  timestamp: string;
}

export default function TrocaMesmaCidade() {
  const { selectedCard, setFlowState } = useNavigation();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'other',
      text: 'Oi! Gostei da sua proposta de troca. Você quer fazer presencialmente?',
      timestamp: '14:32',
    },
    {
      id: '2',
      sender: 'user',
      text: 'Oi! Sim, seria ótimo! Você está em São Paulo também?',
      timestamp: '14:35',
    },
    {
      id: '3',
      sender: 'other',
      text: 'Sim! Estou na zona sul. Podemos nos encontrar no shopping próximo?',
      timestamp: '14:37',
    },
    {
      id: '4',
      sender: 'ai',
      text: '✓ IA detectou: Ambos estão dispostos a fazer a troca presencialmente e já combinaram um local.',
      timestamp: '14:38',
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [tradeConfirmed, setTradeConfirmed] = useState(false);

  if (!selectedCard) {
    return (
      <div className="flex-1 pb-20 lg:pb-0 flex items-center justify-center">
        <Card className="p-8 text-center bg-card border-border">
          <p className="text-foreground">Nenhuma troca em andamento</p>
        </Card>
      </div>
    );
  }

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: String(messages.length + 1),
      sender: 'user',
      text: inputMessage,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, newMessage]);
    setInputMessage('');

    // Simular resposta do outro usuário
    setTimeout(() => {
      const response: Message = {
        id: String(messages.length + 2),
        sender: 'other',
        text: 'Perfeito! Que horas você consegue?',
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, response]);
    }, 1000);
  };

  const handleConfirmTrade = async () => {
    setTradeConfirmed(true);
    toast.success('Encontro marcado! Taxa de R$ 10.00 cobrada.');
    setTimeout(() => {
      setFlowState('troca-confirmada');
    }, 2000);
  };

  return (
    <div className="flex-1 pb-20 lg:pb-0">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-foreground">Troca Presencial</h1>
          <p className="text-muted-foreground text-sm mt-1">
            <MapPin className="w-4 h-4 inline mr-1" />
            São Paulo, SP
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Chat */}
          <div className="md:col-span-2 space-y-6">
            {/* Info Card */}
            <Card className="p-4 bg-blue-900/20 border border-blue-800">
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-blue-400 text-sm">IA Monitorando</p>
                  <p className="text-blue-300 text-xs mt-1">
                    Nossa IA está analisando a conversa para garantir a segurança de ambos. Após confirmar o encontro, uma taxa de R$ 10.00 será cobrada.
                  </p>
                </div>
              </div>
            </Card>

            {/* Chat Messages */}
            <Card className="p-6 bg-card border-border h-96 overflow-y-auto space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'ai' ? (
                    <div className="w-full">
                      <div className="bg-green-900/30 border border-green-800 rounded-lg p-3">
                        <p className="text-green-400 text-sm font-medium">{msg.text}</p>
                      </div>
                    </div>
                  ) : (
                    <div
                      className={`max-w-xs rounded-lg p-3 ${
                        msg.sender === 'user'
                          ? 'bg-accent text-white'
                          : 'bg-secondary text-foreground'
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                      <p className={`text-xs mt-1 ${
                        msg.sender === 'user'
                          ? 'text-red-200'
                          : 'text-muted-foreground'
                      }`}>
                        {msg.timestamp}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </Card>

            {/* Message Input */}
            <div className="flex gap-2">
              <Input
                placeholder="Digite sua mensagem..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
              />
              <Button
                onClick={handleSendMessage}
                className="bg-accent hover:bg-red-700 text-white px-4"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>

            {/* Confirm Trade */}
            {!tradeConfirmed && (
              <Button
                onClick={handleConfirmTrade}
                className="w-full bg-accent hover:bg-red-700 text-white h-12 font-semibold"
              >
                Confirmar Encontro e Marcar Troca
              </Button>
            )}

            {tradeConfirmed && (
              <Card className="p-4 bg-green-900/20 border border-green-800">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="font-semibold text-green-400 text-sm">Encontro Marcado!</p>
                    <p className="text-green-300 text-xs mt-1">
                      Você será redirecionado para o fluxo de troca
                    </p>
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Trade Summary */}
            <Card className="p-6 bg-card border-border">
              <h3 className="font-semibold text-foreground mb-4">Resumo da Troca</h3>

              <div className="space-y-4">
                <div>
                  <p className="text-muted-foreground text-xs mb-2">Você quer</p>
                  <div className="flex gap-2">
                    <div className="w-12 h-16 rounded bg-secondary flex-shrink-0">
                      <img
                        src={selectedCard.image}
                        alt={selectedCard.name}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm">{selectedCard.name}</p>
                      <p className="text-accent font-bold text-sm">R$ {selectedCard.price.toFixed(2)}</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <p className="text-muted-foreground text-xs mb-2">Você oferece</p>
                  <div className="flex gap-2">
                    <div className="w-12 h-16 rounded bg-secondary flex-shrink-0">
                      <img
                        src="/images/charizard-ex-2.png"
                        alt="Charizard EX 151"
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm">Charizard EX 151</p>
                      <p className="text-accent font-bold text-sm">R$ 280.00</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Other User */}
            <Card className="p-6 bg-card border-border">
              <h3 className="font-semibold text-foreground mb-4">Outro Usuário</h3>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-white font-bold">
                  T
                </div>
                <div>
                  <p className="font-medium text-foreground">TraderPro</p>
                  <p className="text-muted-foreground text-sm">⭐ 4.8 (234)</p>
                </div>
              </div>
              <Button variant="outline" className="w-full border-border hover:bg-secondary text-sm h-9">
                Ver Perfil
              </Button>
            </Card>

            {/* AI Status */}
            <Card className="p-4 bg-green-900/20 border border-green-800">
              <h4 className="font-semibold text-green-400 text-sm mb-3">Status da IA</h4>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  <span className="text-green-300">Ambos em São Paulo</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  <span className="text-green-300">Local combinado</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  <span className="text-green-300">Conversa segura</span>
                </div>
              </div>
            </Card>

            {/* Fee Info */}
            <Card className="p-4 bg-yellow-900/20 border border-yellow-800">
              <p className="text-yellow-400 font-semibold text-sm mb-2">Taxa de Negociação</p>
              <p className="text-yellow-300 text-xs mb-3">
                Uma pequena taxa será cobrada para cobrir custos de segurança e IA
              </p>
              <p className="text-2xl font-bold text-yellow-400">R$ 10.00</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
