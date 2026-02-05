import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Heart, ShoppingCart, Repeat2, Search } from 'lucide-react';
import { useState, useMemo } from 'react';
import { useAuth } from '@/_core/hooks/useAuth';
import { getLoginUrl } from '@/const';
import { trpc } from '@/lib/trpc';

export default function Home() {
  const { user, loading, isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCondition, setFilterCondition] = useState<string>('all');
  const [filterPrice, setFilterPrice] = useState<{ min: number; max: number }>({ min: 0, max: 10000 });
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'newest'>('newest');

  // Fetch cards from API
  const { data: cardsData = [], isLoading: cardsLoading } = trpc.cards.list.useQuery();
  const { data: searchResults = [] } = trpc.cards.search.useQuery(
    { query: searchQuery },
    { enabled: searchQuery.length > 0 }
  );

  // Filter and sort
  const filteredCards = useMemo(() => {
    const source = searchQuery.length > 0 ? searchResults : cardsData;
    
    let result = source.filter((card: any) => {
      const matchesCondition = filterCondition === 'all' || card.condition === filterCondition;
      const matchesPrice = card.price >= filterPrice.min && card.price <= filterPrice.max;
      return matchesCondition && matchesPrice;
    });

    if (sortBy === 'price-asc') {
      result.sort((a: any, b: any) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a: any, b: any) => b.price - a.price);
    }

    return result;
  }, [cardsData, searchResults, searchQuery, filterCondition, filterPrice, sortBy]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Carregando...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">PokéTrade</h1>
          <p className="text-muted-foreground mb-6">Faça login para acessar o marketplace</p>
          <Button 
            onClick={() => window.location.href = getLoginUrl()}
            className="bg-red-600 hover:bg-red-700"
          >
            Entrar
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header com Busca */}
      <div className="bg-card border-b border-border sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-foreground mb-6">Marketplace</h1>

          {/* Busca */}
          <div className="flex gap-3 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar cartas (ex: Charizard, Pikachu...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Filtros */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            {/* Condição */}
            <div>
              <label className="text-sm font-semibold text-foreground mb-2 block">
                Condição
              </label>
              <select
                value={filterCondition}
                onChange={(e) => setFilterCondition(e.target.value)}
                className="w-full bg-background border border-border rounded-lg px-3 py-2 text-foreground text-sm focus:outline-none focus:border-red-600"
              >
                <option value="all">Todas</option>
                <option value="Mint">Mint (10/10)</option>
                <option value="Near Mint">Near Mint (9/10)</option>
                <option value="Excellent">Excellent (8/10)</option>
                <option value="Very Good">Very Good (7/10)</option>
                <option value="Good">Good (6/10)</option>
                <option value="Lightly Played">Lightly Played (7/10)</option>
              </select>
            </div>

            {/* Preço Mínimo */}
            <div>
              <label className="text-sm font-semibold text-foreground mb-2 block">
                Preço Mínimo
              </label>
              <Input
                type="number"
                placeholder="R$ 0"
                value={filterPrice.min}
                onChange={(e) => setFilterPrice({ ...filterPrice, min: Number(e.target.value) })}
              />
            </div>

            {/* Preço Máximo */}
            <div>
              <label className="text-sm font-semibold text-foreground mb-2 block">
                Preço Máximo
              </label>
              <Input
                type="number"
                placeholder="R$ 10000"
                value={filterPrice.max}
                onChange={(e) => setFilterPrice({ ...filterPrice, max: Number(e.target.value) })}
              />
            </div>

            {/* Ordenar */}
            <div>
              <label className="text-sm font-semibold text-foreground mb-2 block">
                Ordenar
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full bg-background border border-border rounded-lg px-3 py-2 text-foreground text-sm focus:outline-none focus:border-red-600"
              >
                <option value="newest">Mais Recentes</option>
                <option value="price-asc">Preço: Menor para Maior</option>
                <option value="price-desc">Preço: Maior para Menor</option>
              </select>
            </div>
          </div>

          {/* Resultados */}
          <p className="text-sm text-muted-foreground mt-4">
            {cardsLoading ? 'Carregando...' : `${filteredCards.length} carta${filteredCards.length !== 1 ? 's' : ''} encontrada${filteredCards.length !== 1 ? 's' : ''}`}
          </p>
        </div>
      </div>

      {/* Grid de Cards */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {cardsLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Carregando cartas...</p>
          </div>
        ) : filteredCards.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredCards.map((card: any) => (
              <div
                key={card.id}
                className="bg-card border border-border rounded-lg overflow-hidden hover:border-red-600/50 transition-all duration-200 cursor-pointer group"
              >
                {/* Imagem */}
                <div className="relative overflow-hidden bg-background h-64">
                  {card.images && (
                    <img
                      src={card.images}
                      alt={card.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}

                  {/* Badge Troca */}
                  {card.acceptsTrade && (
                    <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold flex items-center gap-1">
                      <Repeat2 className="w-3 h-3" />
                      Troca
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-foreground text-sm mb-1 line-clamp-2">
                    {card.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-3">
                    {card.series} • {card.cardNumber}
                  </p>

                  {/* Preço */}
                  <div className="mb-3">
                    <p className="text-2xl font-bold text-red-600">
                      R$ {Number(card.price).toFixed(2)}
                    </p>
                  </div>

                  {/* Condição */}
                  <div className="mb-4">
                    <span className="inline-block bg-red-600/10 text-red-600 px-2 py-1 rounded text-xs font-semibold">
                      {card.condition} - {card.conditionScore}/10
                    </span>
                  </div>

                  {/* Botões */}
                  <div className="flex gap-2">
                    <Button
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white gap-2 h-9"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Comprar
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-9 w-9 p-0"
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-muted mx-auto mb-4" />
            <p className="text-muted-foreground">Nenhuma carta encontrada com esses filtros</p>
          </div>
        )}
      </div>
    </div>
  );
}
