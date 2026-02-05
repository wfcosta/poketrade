import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/_core/hooks/useAuth';
import { trpc } from '@/lib/trpc';
import { Bell, Trash2, Check } from 'lucide-react';

export default function Notifications() {
  const { user } = useAuth();
  const { data: notifications = [], refetch } = trpc.notifications.list.useQuery();
  const markAsReadMutation = trpc.notifications.markAsRead.useMutation();
  const markAllAsReadMutation = trpc.notifications.markAllAsRead.useMutation();

  const handleMarkAsRead = async (notificationId: number) => {
    try {
      await markAsReadMutation.mutateAsync({ id: notificationId });
      await refetch();
    } catch (error) {
      alert('Erro ao marcar como lido');
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsReadMutation.mutateAsync();
      await refetch();
    } catch (error) {
      alert('Erro ao marcar tudo como lido');
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'new_offer':
        return '💰';
      case 'payment_received':
        return '✅';
      case 'item_shipped':
        return '📦';
      case 'item_delivered':
        return '🎉';
      case 'review_received':
        return '⭐';
      case 'trade_accepted':
        return '🔄';
      default:
        return '📢';
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'new_offer':
        return 'bg-blue-600/10 border-blue-600';
      case 'payment_received':
        return 'bg-green-600/10 border-green-600';
      case 'item_shipped':
        return 'bg-yellow-600/10 border-yellow-600';
      case 'item_delivered':
        return 'bg-green-600/10 border-green-600';
      case 'review_received':
        return 'bg-purple-600/10 border-purple-600';
      case 'trade_accepted':
        return 'bg-pink-600/10 border-pink-600';
      default:
        return 'bg-gray-600/10 border-gray-600';
    }
  };

  const unreadCount = notifications.filter((n: any) => !n.read).length;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Bell className="w-8 h-8 text-red-600" />
            <div>
              <h1 className="text-3xl font-bold text-foreground">Notificações</h1>
              <p className="text-muted-foreground">
                {unreadCount} {unreadCount === 1 ? 'notificação' : 'notificações'} não lida{unreadCount === 1 ? '' : 's'}
              </p>
            </div>
          </div>
          {unreadCount > 0 && (
            <Button
              onClick={handleMarkAllAsRead}
              disabled={markAllAsReadMutation.isPending}
              variant="outline"
              className="border-border"
            >
              <Check className="w-4 h-4 mr-2" />
              Marcar Tudo como Lido
            </Button>
          )}
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {notifications.length > 0 ? (
            notifications.map((notification: any) => (
              <Card
                key={notification.id}
                className={`p-4 bg-card border transition-all ${
                  notification.read
                    ? 'border-border opacity-60'
                    : `border-2 ${getNotificationColor(notification.type)}`
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="text-2xl mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">
                        {notification.title}
                      </h3>
                      {notification.message && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {notification.message}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground mt-2">
                        {new Date(notification.createdAt).toLocaleDateString('pt-BR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2 ml-4">
                    {!notification.read && (
                      <Button
                        onClick={() => handleMarkAsRead(notification.id)}
                        disabled={markAsReadMutation.isPending}
                        size="sm"
                        variant="outline"
                        className="border-border"
                      >
                        <Check className="w-4 h-4" />
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-border text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <Card className="p-12 bg-card border-border text-center">
              <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground mb-4">Nenhuma notificação</p>
              <p className="text-sm text-muted-foreground">
                Você receberá notificações sobre ofertas, pagamentos e entregas aqui.
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
