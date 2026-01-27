import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useState } from 'react';
import { toast } from 'sonner';

/**
 * Design Philosophy: Minimalismo Escandinavo
 * - Formulário limpo com espaçamento generoso
 * - Botões segmentados para estado da carta
 * - Toggle switch para aceitar trocas
 * - Feedback visual ao enviar
 */

interface FormData {
  cardName: string;
  condition: string;
  price: string;
  acceptsTrade: boolean;
}

export default function Cadastro() {
  const [formData, setFormData] = useState<FormData>({
    cardName: '',
    condition: 'near-mint',
    price: '',
    acceptsTrade: true,
  });

  const conditionOptions = [
    { value: 'mint', label: 'Mint (10/10)' },
    { value: 'near-mint', label: 'Near Mint (9/10)' },
    { value: 'excellent', label: 'Excellent (8/10)' },
    { value: 'lightly-played', label: 'Lightly Played (7/10)' },
    { value: 'played', label: 'Played (5-6/10)' },
    { value: 'poor', label: 'Poor (1-4/10)' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.cardName || !formData.price) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }

    if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      toast.error('Preço deve ser um valor válido');
      return;
    }

    // Simular envio
    toast.success('Carta cadastrada com sucesso!');
    setFormData({
      cardName: '',
      condition: 'near-mint',
      price: '',
      acceptsTrade: true,
    });
  };

  return (
    <div className="flex-1 pb-20 lg:pb-0">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-foreground">Cadastrar Carta</h1>
          <p className="text-muted-foreground mt-1">
            Adicione uma nova carta ao seu inventário
          </p>
        </div>
      </div>

      {/* Form Container */}
      <div className="max-w-3xl mx-auto px-4 py-8">
        <Card className="p-6 md:p-8 bg-card border-border">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Card Name */}
            <div className="space-y-2">
              <Label htmlFor="cardName" className="text-foreground font-medium">
                Nome da Carta
              </Label>
              <Input
                id="cardName"
                placeholder="ex: Charizard EX, Blastoise Holo..."
                value={formData.cardName}
                onChange={(e) =>
                  setFormData({ ...formData, cardName: e.target.value })
                }
                className="border-border focus:ring-accent"
              />
              <p className="text-xs text-muted-foreground">
                Busque pelo nome da carta no banco de dados
              </p>
            </div>

            {/* Condition */}
            <div className="space-y-3">
              <Label className="text-foreground font-medium">
                Estado da Carta
              </Label>
              <ToggleGroup
                type="single"
                value={formData.condition}
                onValueChange={(value) => {
                  if (value) setFormData({ ...formData, condition: value });
                }}
                className="justify-start flex-wrap gap-2"
              >
                {conditionOptions.map((option) => (
                  <ToggleGroupItem
                    key={option.value}
                    value={option.value}
                    className="border-border data-[state=on]:bg-accent data-[state=on]:text-white data-[state=on]:border-accent"
                  >
                    {option.label}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <Label htmlFor="price" className="text-foreground font-medium">
                Preço (R$)
              </Label>
              <Input
                id="price"
                type="number"
                placeholder="0.00"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                className="border-border focus:ring-accent"
              />
            </div>

            {/* Accepts Trade */}
            <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
              <div>
                <Label className="text-foreground font-medium">
                  Aceita Trocas?
                </Label>
                <p className="text-xs text-muted-foreground mt-1">
                  Permitir que outros usuários façam trocas por esta carta
                </p>
              </div>
              <Switch
                checked={formData.acceptsTrade}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, acceptsTrade: checked })
                }
              />
            </div>

            {/* Submit Button */}
            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                className="flex-1 bg-accent hover:bg-red-700 text-white font-semibold h-10"
              >
                Cadastrar Carta
              </Button>
              <Button
                type="button"
                variant="outline"
                className="flex-1 border-border hover:bg-secondary h-10"
                onClick={() =>
                  setFormData({
                    cardName: '',
                    condition: 'near-mint',
                    price: '',
                    acceptsTrade: true,
                  })
                }
              >
                Limpar
              </Button>
            </div>
          </form>
        </Card>

        {/* Info Box */}
        <Card className="mt-6 p-4 bg-secondary border-border bg-card">
          <h3 className="font-semibold text-foreground text-sm">💡 Dica</h3>
          <p className="text-xs text-muted-foreground mt-2">
            Cartas em melhor estado (Mint) tendem a ter maior valor. Seja honesto
            sobre o estado para garantir transações bem-sucedidas.
          </p>
        </Card>
      </div>
    </div>
  );
}
