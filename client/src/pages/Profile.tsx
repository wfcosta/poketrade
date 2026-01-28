import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { Star, MapPin, CreditCard, LogOut, Edit2, Save, X } from 'lucide-react';

export default function Profile() {
  const { user, logout, updateProfile } = useAuth();
  const { getReviewsForUser } = useData();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: user?.name || '',
    city: user?.city || '',
    state: user?.state || '',
  });

  if (!user) {
    return <div>Carregando...</div>;
  }

  const reviews = getReviewsForUser(user.id);
  const avgRating = reviews.length > 0 
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '5.0';

  const handleSaveProfile = () => {
    updateProfile({
      name: editData.name,
      city: editData.city,
      state: editData.state,
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-4xl">
                {user.avatar}
              </div>
              <div className="flex-1">
                {!isEditing ? (
                  <>
                    <h1 className="text-3xl font-bold text-foreground">{user.name}</h1>
                    <div className="flex items-center gap-2 mt-1 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{user.city}, {user.state}</span>
                    </div>
                  </>
                ) : (
                  <div className="space-y-3">
                    <Input
                      value={editData.name}
                      onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                      placeholder="Nome"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        value={editData.city}
                        onChange={(e) => setEditData({ ...editData, city: e.target.value })}
                        placeholder="Cidade"
                      />
                      <Input
                        value={editData.state}
                        onChange={(e) => setEditData({ ...editData, state: e.target.value })}
                        placeholder="Estado"
                        maxLength={2}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-2">
              {!isEditing ? (
                <>
                  <Button
                    onClick={() => setIsEditing(true)}
                    variant="outline"
                    className="gap-2"
                  >
                    <Edit2 className="w-4 h-4" />
                    Editar
                  </Button>
                  <Button
                    onClick={logout}
                    variant="outline"
                    className="gap-2 text-red-600 hover:text-red-700"
                  >
                    <LogOut className="w-4 h-4" />
                    Sair
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={handleSaveProfile}
                    className="gap-2 bg-red-600 hover:bg-red-700"
                  >
                    <Save className="w-4 h-4" />
                    Salvar
                  </Button>
                  <Button
                    onClick={() => setIsEditing(false)}
                    variant="outline"
                    className="gap-2"
                  >
                    <X className="w-4 h-4" />
                    Cancelar
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="text-sm text-muted-foreground mb-1">Avaliação</div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-foreground">{avgRating}</span>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.round(parseFloat(avgRating))
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-muted'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-4">
            <div className="text-sm text-muted-foreground mb-1">Avaliações</div>
            <div className="text-2xl font-bold text-foreground">{reviews.length}</div>
          </div>

          <div className="bg-card border border-border rounded-lg p-4">
            <div className="text-sm text-muted-foreground mb-1">Taxa de Sucesso</div>
            <div className="text-2xl font-bold text-foreground">{user.successRate}%</div>
          </div>

          <div className="bg-card border border-border rounded-lg p-4">
            <div className="text-sm text-muted-foreground mb-1">Tempo de Envio</div>
            <div className="text-2xl font-bold text-foreground">{user.averageShippingTime}d</div>
          </div>
        </div>

        {/* Dados Bancários */}
        <div className="bg-card border border-border rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Dados Bancários
            </h2>
          </div>

          {user.bankAccount ? (
            <div className="space-y-3">
              {user.bankAccount.type === 'pix' ? (
                <div>
                  <p className="text-sm text-muted-foreground">Chave PIX</p>
                  <p className="text-foreground font-mono">{user.bankAccount.pixKey}</p>
                </div>
              ) : (
                <>
                  <div>
                    <p className="text-sm text-muted-foreground">Banco</p>
                    <p className="text-foreground">{user.bankAccount.bank}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Conta</p>
                    <p className="text-foreground font-mono">{user.bankAccount.account}</p>
                  </div>
                </>
              )}
            </div>
          ) : (
            <p className="text-muted-foreground">Nenhum dados bancários cadastrados</p>
          )}
        </div>

        {/* Avaliações Recebidas */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-xl font-bold text-foreground mb-4">Avaliações Recebidas</h2>

          {reviews.length > 0 ? (
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="border-b border-border pb-4 last:border-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold text-foreground">{review.reviewerName}</p>
                      <div className="flex gap-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-muted'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {new Date(review.createdAt).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm">{review.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">Nenhuma avaliação ainda</p>
          )}
        </div>
      </div>
    </div>
  );
}
