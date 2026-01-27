import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Trash2, Edit2, Eye } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

/**
 * Design Philosophy: Minimalismo Escandinavo - Tema Escuro
 * - Lista de cartas do usuário
 * - Opções para editar, deletar ou visualizar
 * - Mostra status de cada carta (ativa, vendida, trocada)
 */

interface InventoryCard {
  id: string;
  name: string;
  image: string;
  price: number;
  condition: string;
  conditionScore: number;
  acceptsTrade: boolean;
  status: 'ativa' | 'vendida' | 'trocada' | 'pendente';
  addedDate: string;
}

const mockInventory: InventoryCard[] = [
  {
    id: '1',
    name: 'Charizard EX',
    image: '/images/charizard-ex-1.png',
    price: 450.00,
    condition: 'Mint',
    conditionScore: 10,
    acceptsTrade: true,
    status: 'ativa',
    addedDate: '2026-01-20',
  },
  {
    id: '2',
    name: 'Charizard EX Full Art',
    image: '/images/charizard-ex-3.jpg',
    price: 520.00,
    condition: 'Mint',
    conditionScore: 10,
    acceptsTrade: true,
    status: 'pendente',
    addedDate: '2026-01-18',
  },
  {
    id: '3',
    name: 'Dragonite V',
    image: '/images/dragonite-v.jpg',
    price: 380.00,
    condition: 'Excellent',
    conditionScore: 8,
    acceptsTrade: false,
    status: 'vendida',
    addedDate: '2026-01-15',
  },
];

export default function Inventario() {
  const [inventory, setInventory] = useState<InventoryCard[]>(mockInventory);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ativa':
        return 'bg-green-900 text-green-200';
      case 'vendida':
        return 'bg-blue-900 text-blue-200';
      case 'trocada':
        return 'bg-purple-900 text-purple-200';
      case 'pendente':
        return 'bg-yellow-900 text-yellow-200';
      default:
        return 'bg-gray-900 text-gray-200';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'ativa':
        return 'Ativa';
      case 'vendida':
        return 'Vendida';
      case 'trocada':
        return 'Trocada';
      case 'pendente':
        return 'Pendente';
      default:
        return 'Desconhecido';
    }
  };

  const handleDelete = (id: string) => {
    setInventory((prev) => prev.filter((card) => card.id !== id));
    toast.success('Carta removida do inventário');
  };

  return (
    <div className="flex-1 pb-20 lg:pb-0">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-foreground">Meu Inventário</h1>
          <p className="text-muted-foreground mt-1">
            {inventory.length} carta{inventory.length !== 1 ? 's' : ''} no seu inventário
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {inventory.length === 0 ? (
          <Card className="p-12 text-center bg-card border-border">
            <Eye className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Seu inventário está vazio
            </h2>
            <p className="text-muted-foreground">
              Comece a adicionar cartas ao seu inventário
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {inventory.map((card) => (
              <Card
                key={card.id}
                className="overflow-hidden hover:shadow-lg transition-all duration-200 bg-card border-border"
              >
                {/* Card Image */}
                <div className="relative bg-secondary aspect-[3/4] overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.name}
                    className="w-full h-full object-cover"
                  />

                  {/* Status Badge */}
                  <Badge className={`absolute top-2 left-2 ${getStatusColor(card.status)}`}>
                    {getStatusLabel(card.status)}
                  </Badge>
                </div>

                {/* Card Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-foreground text-sm line-clamp-2">
                    {card.name}
                  </h3>

                  {/* Condition */}
                  <div className="mt-2">
                    <Badge variant="outline" className="text-xs border-border">
                      {card.condition} - {card.conditionScore}/10
                    </Badge>
                  </div>

                  {/* Price */}
                  <div className="mt-3">
                    <p className="text-xs text-muted-foreground">Preço</p>
                    <p className="text-lg font-bold text-accent">
                      R$ {card.price.toFixed(2)}
                    </p>
                  </div>

                  {/* Trade Status */}
                  <div className="mt-2">
                    <p className="text-xs text-muted-foreground">
                      {card.acceptsTrade ? '✓ Aceita trocas' : '✗ Sem trocas'}
                    </p>
                  </div>

                  {/* Added Date */}
                  <p className="text-xs text-muted-foreground mt-2">
                    Adicionado em {new Date(card.addedDate).toLocaleDateString('pt-BR')}
                  </p>

                  {/* Actions */}
                  <div className="mt-4 flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-border hover:bg-secondary text-xs h-8"
                    >
                      <Edit2 className="w-3 h-3 mr-1" />
                      Editar
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex-1 text-destructive hover:bg-red-900/20 text-xs h-8"
                      onClick={() => handleDelete(card.id)}
                    >
                      <Trash2 className="w-3 h-3 mr-1" />
                      Deletar
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
