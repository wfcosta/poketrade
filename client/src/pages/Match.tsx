import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Heart, X } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

/**
 * Design Philosophy: Minimalismo Escandinavo
 * - Card grande em estilo Tinder
 * - Comparação lado a lado: "O que você tem" vs "O que o usuário quer"
 * - Botões de ação com ícones (Aceitar/Rejeitar)
 * - Animações suaves ao trocar de match
 */

interface Match {
  id: string;
  userName: string;
  userAvatar: string;
  userLocation: string;
  userRating: number;
  yourCard: {
    name: string;
    image: string;
    condition: string;
  };
  theirCard: {
    name: string;
    image: string;
    condition: string;
  };
  matchPercentage: number;
}

const mockMatches: Match[] = [
  {
    id: '1',
    userName: 'TraderPro',
    userAvatar: 'https://via.placeholder.com/60x60?text=TP',
    userLocation: 'São Paulo, SP',
    userRating: 4.8,
    yourCard: {
      name: 'Pikachu Base Set',
      image: '/images/charizard-ex-1.png',
      condition: 'Near Mint',
    },
    theirCard: {
      name: 'Charizard EX',
      image: '/images/charizard-ex-2.png',
      condition: 'Mint',
    },
    matchPercentage: 92,
  },
  {
    id: '2',
    userName: 'CardCollector',
    userAvatar: 'https://via.placeholder.com/60x60?text=CC',
    userLocation: 'Rio de Janeiro, RJ',
    userRating: 4.6,
    yourCard: {
      name: 'Blastoise Holo',
      image: '/images/charizard-ex-3.jpg',
      condition: 'Excellent',
    },
    theirCard: {
      name: 'Venusaur 1st Edition',
      image: '/images/holo-collection.jpg',
      condition: 'Near Mint',
    },
    matchPercentage: 88,
  },
  {
    id: '3',
    userName: 'VintageCards',
    userAvatar: 'https://via.placeholder.com/60x60?text=VC',
    userLocation: 'Belo Horizonte, MG',
    userRating: 4.9,
    yourCard: {
      name: 'Mewtwo EX',
      image: '/images/mewtwo-promo.jpg',
      condition: 'Mint',
    },
    theirCard: {
      name: 'Dragonite Holo',
      image: '/images/dragonite-v.jpg',
      condition: 'Excellent',
    },
    matchPercentage: 85,
  },
];

export default function Match() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [passedMatches, setPassedMatches] = useState<string[]>([]);

  const currentMatch = mockMatches[currentIndex];
  const hasMatches = currentIndex < mockMatches.length;

  const handlePass = () => {
    setPassedMatches((prev) => [...prev, currentMatch.id]);
    if (currentIndex < mockMatches.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(mockMatches.length);
    }
    toast('Troca descartada');
  };

  const handleMatch = () => {
    toast.success('Troca aceita! Você pode conversar com o usuário.');
    if (currentIndex < mockMatches.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(mockMatches.length);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setPassedMatches((prev) => prev.filter((id) => id !== mockMatches[currentIndex - 1].id));
    }
  };

  return (
    <div className="flex-1 pb-20 lg:pb-0">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-foreground">Trocas Ideais</h1>
          <p className="text-muted-foreground mt-1">
            Encontre trocas perfeitas com outros colecionadores
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {!hasMatches ? (
          <Card className="p-12 text-center bg-card border-border">
            <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Sem mais matches
            </h2>
            <p className="text-muted-foreground mb-6">
              Você viu todos os matches disponíveis. Volte mais tarde para novos!
            </p>
            <Button
              onClick={() => {
                setCurrentIndex(0);
                setPassedMatches([]);
              }}
              className="bg-accent hover:bg-red-700 text-white"
            >
              Recomeçar
            </Button>
          </Card>
        ) : (
          <div className="space-y-6">
            {/* Match Card */}
            <Card className="overflow-hidden bg-card border-border">
              {/* User Header */}
              <div className="bg-secondary p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={currentMatch.userAvatar}
                    alt={currentMatch.userName}
                    className="w-12 h-12 rounded-full bg-border"
                  />
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {currentMatch.userName}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {currentMatch.userLocation} • ⭐ {currentMatch.userRating}
                    </p>
                  </div>
                </div>
                <Badge className="bg-accent text-white text-lg px-3 py-1">
                  {currentMatch.matchPercentage}%
                </Badge>
              </div>

              {/* Match Content */}
              <div className="p-6 bg-card">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Your Card */}
                  <div className="text-center">
                    <p className="text-sm font-semibold text-foreground mb-3">
                      O que você tem
                    </p>
                    <div className="bg-secondary rounded-lg p-4 mb-3">
                      <img
                        src={currentMatch.yourCard.image}
                        alt={currentMatch.yourCard.name}
                        className="w-full h-auto rounded"
                      />
                    </div>
                    <h4 className="font-semibold text-foreground">
                      {currentMatch.yourCard.name}
                    </h4>
                    <Badge variant="outline" className="mt-2 border-border">
                      {currentMatch.yourCard.condition}
                    </Badge>
                  </div>

                  {/* Divider */}
                  <div className="hidden md:flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center mx-auto mb-2">
                        ✓
                      </div>
                      <p className="text-xs text-muted-foreground">Match!</p>
                    </div>
                  </div>

                  {/* Their Card */}
                  <div className="text-center md:col-span-1">
                    <p className="text-sm font-semibold text-foreground mb-3">
                      O que ele quer
                    </p>
                    <div className="bg-secondary rounded-lg p-4 mb-3">
                      <img
                        src={currentMatch.theirCard.image}
                        alt={currentMatch.theirCard.name}
                        className="w-full h-auto rounded"
                      />
                    </div>
                    <h4 className="font-semibold text-foreground">
                      {currentMatch.theirCard.name}
                    </h4>
                    <Badge variant="outline" className="mt-2 border-border">
                      {currentMatch.theirCard.condition}
                    </Badge>
                  </div>
                </div>

                {/* Match Info */}
                <div className="mt-6 p-4 bg-secondary rounded-lg">
                  <p className="text-sm text-foreground">
                    <strong>{currentMatch.userName}</strong> tem a carta que você quer
                    e quer a carta que você tem. Perfeito para uma troca!
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="bg-card border-t border-border p-6 flex gap-3 justify-center">
                <Button
                  onClick={handlePrevious}
                  disabled={currentIndex === 0}
                  variant="outline"
                  className="border-border hover:bg-secondary"
                  size="lg"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>

                <Button
                  onClick={handlePass}
                  variant="outline"
                  className="border-border hover:bg-red-50 text-foreground flex-1"
                  size="lg"
                >
                  <X className="w-5 h-5 mr-2" />
                  Passar
                </Button>

                <Button
                  onClick={handleMatch}
                  className="bg-accent hover:bg-red-700 text-white flex-1"
                  size="lg"
                >
                  <Heart className="w-5 h-5 mr-2 fill-white" />
                  Dar Match
                </Button>

                <Button
                  onClick={() => {
                    if (currentIndex < mockMatches.length - 1) {
                      setCurrentIndex((prev) => prev + 1);
                    }
                  }}
                  disabled={currentIndex === mockMatches.length - 1}
                  variant="outline"
                  className="border-border hover:bg-secondary"
                  size="lg"
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </Card>

            {/* Progress */}
            <div className="text-center text-sm text-muted-foreground">
              Troca {currentIndex + 1} de {mockMatches.length}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
