import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/_core/hooks/useAuth';
import { trpc } from '@/lib/trpc';
import { Send, ArrowLeft } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Chat() {
  const { user } = useAuth();
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [message, setMessage] = useState('');
  const [autoRefresh, setAutoRefresh] = useState(true);

  const { data: messages = [], refetch: refetchMessages } = trpc.chat.getMessages.useQuery(
    { userId: selectedUserId || 0 },
    { enabled: !!selectedUserId }
  );

  const sendMessageMutation = trpc.chat.sendMessage.useMutation();

  // Auto-refresh messages
  useEffect(() => {
    if (!autoRefresh || !selectedUserId) return;
    
    const interval = setInterval(() => {
      refetchMessages();
    }, 2000);

    return () => clearInterval(interval);
  }, [autoRefresh, selectedUserId, refetchMessages]);

  const handleSendMessage = async () => {
    if (!message.trim() || !selectedUserId) return;

    try {
      await sendMessageMutation.mutateAsync({
        recipientId: selectedUserId,
        message: message.trim(),
      });

      setMessage('');
      await refetchMessages();
    } catch (error) {
      alert('Erro ao enviar mensagem');
    }
  };

  // Mock conversations
  const mockConversations = [
    { id: 2, name: 'João Silva', lastMessage: 'Você ainda tem a carta?' },
    { id: 3, name: 'Maria Santos', lastMessage: 'Perfeito, vou enviar hoje!' },
    { id: 4, name: 'Pedro Costa', lastMessage: 'Qual é a melhor oferta?' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-6">Mensagens</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Conversations List */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">Conversas</h2>
            <div className="space-y-2">
              {mockConversations.map(conv => (
                <Card
                  key={conv.id}
                  onClick={() => setSelectedUserId(conv.id)}
                  className={`p-4 bg-card border-border cursor-pointer transition-all ${
                    selectedUserId === conv.id ? 'border-red-600' : 'hover:border-red-600/50'
                  }`}
                >
                  <p className="font-semibold text-foreground">{conv.name}</p>
                  <p className="text-sm text-muted-foreground line-clamp-1">{conv.lastMessage}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="md:col-span-2">
            {selectedUserId ? (
              <Card className="p-6 bg-card border-border h-96 flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-border">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setSelectedUserId(null)}
                      className="p-2 hover:bg-muted rounded-lg"
                    >
                      <ArrowLeft className="w-5 h-5 text-foreground" />
                    </button>
                    <div>
                      <p className="font-semibold text-foreground">
                        {mockConversations.find(c => c.id === selectedUserId)?.name}
                      </p>
                      <p className="text-xs text-muted-foreground">Online</p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant={autoRefresh ? 'default' : 'outline'}
                    onClick={() => setAutoRefresh(!autoRefresh)}
                    className="text-xs"
                  >
                    {autoRefresh ? 'Auto' : 'Manual'}
                  </Button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto mb-4 space-y-3">
                  {messages.length > 0 ? (
                    messages.map((msg: any) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.senderId === user?.id ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs px-4 py-2 rounded-lg ${
                            msg.senderId === user?.id
                              ? 'bg-red-600 text-white'
                              : 'bg-muted text-foreground'
                          }`}
                        >
                          <p className="text-sm">{msg.message}</p>
                          <p className={`text-xs mt-1 ${
                            msg.senderId === user?.id ? 'text-red-100' : 'text-muted-foreground'
                          }`}>
                            {new Date(msg.createdAt).toLocaleTimeString('pt-BR', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <p className="text-muted-foreground">Nenhuma mensagem ainda</p>
                    </div>
                  )}
                </div>

                {/* Input */}
                <div className="flex gap-2">
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleSendMessage();
                      }
                    }}
                    placeholder="Digite sua mensagem..."
                    className="flex-1"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={sendMessageMutation.isPending || !message.trim()}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ) : (
              <Card className="p-12 bg-card border-border text-center">
                <p className="text-muted-foreground">Selecione uma conversa para começar</p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
