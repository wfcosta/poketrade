import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heart, Trash2, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

/**
 * Design Philosophy: Minimalismo Escandinavo
 * - Lista de cartas desejadas com layout limpo
 * - Ação rápida para remover ou contatar vendedor
 * - Estado vazio com mensagem clara
 */

interface WishlistCard {
  id: string;
  name: string;
  image: string;
  desiredCondition: string;
  maxPrice: number;
  priority: 'high' | 'medium' | 'low';
}

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState<WishlistCard[]>([
    {
      id: '1',
      name: 'Charizard EX',
      image: 'https://via.placeholder.com/100x140?text=Charizard',
      desiredCondition: 'Mint',
      maxPrice: 500,
      priority: 'high',
    },
    {
      id: '2',
      name: 'Blastoise Holo',
      image: 'https://via.placeholder.com/100x140?text=Blastoise',
      desiredCondition: 'Near Mint',
      maxPrice: 300,
      priority: 'medium',
    },
    {
      id: '3',
      name: 'Venusaur 1st Edition',
      image: 'https://via.placeholder.com/100x140?text=Venusaur',
      desiredCondition: 'Excellent',
      maxPrice: 400,
      priority: 'high',
    },
  ]);

  const removeFromWishlist = (id: string) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== id));
    toast.success('Removido da wishlist');
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'Alta Prioridade';
      case 'medium':
        return 'Média Prioridade';
      case 'low':
        return 'Baixa Prioridade';
      default:
        return 'Sem Prioridade';
    }
  };

  return (
    <div className="flex-1 pb-20 lg:pb-0">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-foreground">Wishlist</h1>
          <p className="text-muted-foreground mt-1">
            {wishlistItems.length} carta{wishlistItems.length !== 1 ? 's' : ''} na sua lista de desejos
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {wishlistItems.length === 0 ? (
          <Card className="p-12 text-center bg-card border-border">
            <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Sua wishlist está vazia
            </h2>
            <p className="text-muted-foreground">
              Adicione cartas à sua wishlist clicando no ícone de coração no marketplace
            </p>
          </Card>
        ) : (
          <div className="space-y-4">
            {wishlistItems.map((item) => (
              <Card
                key={item.id}
                className="p-4 hover:shadow-md transition-all duration-200 flex flex-col md:flex-row gap-4 bg-card border-border"
              >
                {/* Image */}
                <div className="flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-32 object-cover rounded-lg bg-secondary"
                  />
                </div>

                {/* Info */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground">
                    {item.name}
                  </h3>

                  <div className="mt-3 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        Estado desejado:
                      </span>
                      <Badge variant="outline" className="border-border">
                        {item.desiredCondition}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        Preço máximo:
                      </span>
                      <span className="font-semibold text-foreground">
                        R$ {item.maxPrice.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        Prioridade:
                      </span>
                      <Badge className={getPriorityColor(item.priority)}>
                        {getPriorityLabel(item.priority)}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 md:flex-col justify-center">
                  <Button
                    variant="outline"
                    className="border-border hover:bg-secondary"
                    size="sm"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Notificar
                  </Button>
                  <Button
                    variant="ghost"
                    className="text-destructive hover:bg-red-50"
                    size="sm"
                    onClick={() => removeFromWishlist(item.id)}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Remover
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
