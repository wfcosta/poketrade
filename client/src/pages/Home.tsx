import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Heart, ShoppingCart, Repeat2, Search } from 'lucide-react';
import { useState, useMemo } from 'react';
import { useNavigation } from '@/contexts/NavigationContext';

/**
 * Design Philosophy: Minimalismo Escandinavo - Tema Escuro
 * - Campo de busca no topo
 * - Grid mobile 1 coluna, desktop 4 colunas
 * - Imagem da carta como foco principal
 * - Preço e estado em badges vermelhas
 */

interface PokemonCard {
  id: string;
  name: string;
  image: string;
  price: number;
  condition: string;
  conditionScore: number;
  acceptsTrade: boolean;
  seller: string;
}

// Mock data - cards de exemplo com imagens reais
const mockCards: PokemonCard[] = [
  {
    id: '1',
    name: 'Charizard EX',
    image: '/images/charizard-ex-1.png',
    price: 450.00,
    condition: 'Mint',
    conditionScore: 10,
    acceptsTrade: true,
    seller: 'TraderPro',
  },
  {
    id: '2',
    name: 'Charizard EX 151',
    image: '/images/charizard-ex-2.png',
    price: 280.00,
    condition: 'Near Mint',
    conditionScore: 9,
    acceptsTrade: false,
    seller: 'CardCollector',
  },
  {
    id: '3',
    name: 'Charizard EX Full Art',
    image: '/images/charizard-ex-3.jpg',
    price: 520.00,
    condition: 'Mint',
    conditionScore: 10,
    acceptsTrade: true,
    seller: 'VintageCards',
  },
  {
    id: '4',
    name: 'Ash Ketchum GX',
    image: '/images/ash-ketchum.jpg',
    price: 150.00,
    condition: 'Lightly Played',
    conditionScore: 7,
    acceptsTrade: true,
    seller: 'GottaCatchEm',
  },
  {
    id: '5',
    name: 'Dragonite V',
    image: '/images/dragonite-v.jpg',
    price: 380.00,
    condition: 'Excellent',
    conditionScore: 8,
    acceptsTrade: false,
    seller: 'ProTrader',
  },
  {
    id: '6',
    name: 'Mewtwo Promo',
    image: '/images/mewtwo-promo.jpg',
    price: 320.00,
    condition: 'Near Mint',
    conditionScore: 9,
    acceptsTrade: true,
    seller: 'DragonLover',
  },
];

export default function Home() {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { setSelectedCard, setFlowState } = useNavigation();

  const filteredCards = useMemo(() => {
    if (!searchQuery.trim()) return mockCards;
    return mockCards.filter((card) =>
      card.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const toggleWishlist = (cardId: string) => {
    setWishlist((prev) =>
      prev.includes(cardId) ? prev.filter((id) => id !== cardId) : [...prev, cardId]
    );
  };

  const handleCardClick = (card: PokemonCard) => {
    setSelectedCard(card);
    setFlowState('card-details');
  };

  const getConditionColor = (score: number) => {
    if (score === 10) return 'bg-accent text-white';
    if (score >= 8) return 'bg-green-900 text-green-200';
    if (score >= 6) return 'bg-yellow-900 text-yellow-200';
    return 'bg-orange-900 text-orange-200';
  };

  return (
    <div className="flex-1 pb-20 lg:pb-0">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-foreground">Marketplace</h1>
          <p className="text-muted-foreground mt-1">
            {filteredCards.length} carta{filteredCards.length !== 1 ? 's' : ''} disponível{filteredCards.length !== 1 ? 's' : ''} para compra ou troca
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-card border-b border-border sticky top-16 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Buscar carta... (ex: Charizard)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-secondary border-border text-foreground placeholder:text-muted-foreground"
            />
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {filteredCards.length === 0 ? (
          <Card className="p-12 text-center bg-card border-border">
            <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Nenhuma carta encontrada
            </h2>
            <p className="text-muted-foreground">
              Tente buscar por outro nome
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredCards.map((card) => (
              <Card
                key={card.id}
                className="overflow-hidden hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer group bg-card border-border"
                onClick={() => handleCardClick(card)}
              >
                {/* Card Image Container */}
                <div className="relative bg-secondary aspect-[3/4] overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(card.id);
                    }}
                    className="absolute top-2 right-2 p-2 bg-card rounded-full shadow-md hover:bg-secondary transition-colors border border-border"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        wishlist.includes(card.id)
                          ? 'fill-accent text-accent'
                          : 'text-muted-foreground'
                      }`}
                    />
                  </button>

                  {/* Trade Badge */}
                  {card.acceptsTrade && (
                    <Badge className="absolute bottom-2 left-2 bg-accent text-white">
                      <Repeat2 className="w-3 h-3 mr-1" />
                      Troca
                    </Badge>
                  )}
                </div>

                {/* Card Info */}
                <div className="p-3">
                  <h3 className="font-semibold text-foreground text-sm line-clamp-2">
                    {card.name}
                  </h3>

                  {/* Condition Badge */}
                  <div className="mt-2 flex items-center gap-2">
                    <Badge className={`text-xs ${getConditionColor(card.conditionScore)}`}>
                      {card.condition} - {card.conditionScore}/10
                    </Badge>
                  </div>

                  {/* Price and Actions */}
                  <div className="mt-3 flex items-center justify-between">
                    <div className="text-lg font-bold text-accent">
                      R$ {card.price.toFixed(2)}
                    </div>
                  </div>

                  {/* Seller */}
                  <p className="text-xs text-muted-foreground mt-2">por {card.seller}</p>

                  {/* Action Button */}
                  <Button className="w-full mt-3 bg-accent hover:bg-red-700 text-white text-sm h-8">
                    <ShoppingCart className="w-4 h-4 mr-1" />
                    Ver Detalhes
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
