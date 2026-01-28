import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { Bell, Trash2, CheckCircle } from 'lucide-react';

export default function Notificacoes() {
  const { user } = useAuth();
  const { getNotificationsByUserId, markNotificationAsRead } = useData();
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  if (!user) {
    return <div>Carregando...</div>;
  }

  const notifications = getNotificationsByUserId(user.id);
  const filtered = filter === 'unread' 
    ? notifications.filter(n => !n.read)
    : notifications;

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
              <Bell className="w-8 h-8" />
              Notificações
            </h1>
            {unreadCount > 0 && (
              <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                {unreadCount} nova{unreadCount !== 1 ? 's' : ''}
              </span>
            )}
          </div>

          {/* Filtros */}
          <div className="flex gap-2">
            {(['all', 'unread'] as const).map((type) => (
              <Button
                key={type}
                onClick={() => setFilter(type)}
                variant={filter === type ? 'default' : 'outline'}
                className={filter === type ? 'bg-red-600 hover:bg-red-700' : ''}
              >
                {type === 'all' && 'Todas'}
                {type === 'unread' && 'Não lidas'}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {filtered.length > 0 ? (
          <div className="space-y-3">
            {filtered.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-lg border transition-colors ${
                  notification.read
                    ? 'bg-background border-border'
                    : 'bg-card border-red-600/50 border-2'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className={`font-semibold ${notification.read ? 'text-muted-foreground' : 'text-foreground'}`}>
                      {notification.title}
                    </h3>
                    <p className={`text-sm mt-1 ${notification.read ? 'text-muted-foreground' : 'text-foreground'}`}>
                      {notification.message}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {new Date(notification.createdAt).toLocaleDateString('pt-BR', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    {!notification.read && (
                      <Button
                        onClick={() => markNotificationAsRead(notification.id)}
                        size="sm"
                        variant="outline"
                        className="gap-1"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Marcar
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Bell className="w-12 h-12 text-muted mx-auto mb-4" />
            <p className="text-muted-foreground">
              {filter === 'unread' ? 'Nenhuma notificação não lida' : 'Nenhuma notificação'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
