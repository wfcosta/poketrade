import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, Search, Camera, Plus } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

/**
 * Design Philosophy: Minimalismo Escandinavo - Tema Escuro
 * - Duas abas: Scanner ou Busca Manual
 * - Scanner simula captura de foto da carta
 * - Busca por nome com sugestões
 * - Seletor de estado segmentado
 * - Toggle para aceitar trocas
 * - Preview da carta antes de cadastrar
 */

interface CardForm {
  name: string;
  condition: string;
  price: string;
  acceptsTrade: boolean;
}

const mockCardDatabase = [
  { name: 'Charizard EX', id: 'charizard-ex' },
  { name: 'Charizard EX 151', id: 'charizard-ex-151' },
  { name: 'Charizard EX Full Art', id: 'charizard-ex-fa' },
  { name: 'Pikachu Base Set', id: 'pikachu-base' },
  { name: 'Blastoise Holo', id: 'blastoise-holo' },
  { name: 'Dragonite V', id: 'dragonite-v' },
  { name: 'Mewtwo Promo', id: 'mewtwo-promo' },
  { name: 'Ash Ketchum GX', id: 'ash-ketchum' },
];

export default function Cadastro() {
  const [activeTab, setActiveTab] = useState('scanner');
  const [form, setForm] = useState<CardForm>({
    name: '',
    condition: '10',
    price: '',
    acceptsTrade: true,
  });
  const [searchResults, setSearchResults] = useState<typeof mockCardDatabase>([]);
  const [showResults, setShowResults] = useState(false);
  const [scannedCard, setScannedCard] = useState<string | null>(null);

  const handleSearch = (value: string) => {
    setForm({ ...form, name: value });
    if (value.length > 0) {
      const results = mockCardDatabase.filter((card) =>
        card.name.toLowerCase().includes(value.toLowerCase())
      );
      setSearchResults(results);
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  };

  const handleSelectCard = (cardName: string) => {
    setForm({ ...form, name: cardName });
    setShowResults(false);
  };

  const handleScanCard = () => {
    toast('Câmera ativada! (Simulação)', { description: 'Em produção, isso usaria a câmera do dispositivo' });
    setTimeout(() => {
      setScannedCard('Charizard EX');
      setForm({ ...form, name: 'Charizard EX' });
      toast.success('Carta detectada: Charizard EX');
    }, 1500);
  };

  const handleSubmit = () => {
    if (!form.name || !form.price) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }

    toast.success(`Carta "${form.name}" cadastrada com sucesso!`);
    setForm({ name: '', condition: '10', price: '', acceptsTrade: true });
    setScannedCard(null);
  };

  const conditionOptions = [
    { value: '10', label: 'Mint', color: 'bg-accent' },
    { value: '9', label: 'Near Mint', color: 'bg-green-900' },
    { value: '8', label: 'Excellent', color: 'bg-blue-900' },
    { value: '7', label: 'Very Good', color: 'bg-yellow-900' },
    { value: '6', label: 'Good', color: 'bg-orange-900' },
  ];

  return (
    <div className="flex-1 pb-20 lg:pb-0">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-foreground">Cadastrar Carta</h1>
          <p className="text-muted-foreground mt-1">
            Adicione uma nova carta ao seu inventário
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-secondary border-border">
            <TabsTrigger value="scanner" className="data-[state=active]:bg-accent data-[state=active]:text-white">
              <Camera className="w-4 h-4 mr-2" />
              Scanner
            </TabsTrigger>
            <TabsTrigger value="manual" className="data-[state=active]:bg-accent data-[state=active]:text-white">
              <Search className="w-4 h-4 mr-2" />
              Busca Manual
            </TabsTrigger>
          </TabsList>

          {/* Scanner Tab */}
          <TabsContent value="scanner" className="space-y-6">
            <Card className="p-8 bg-card border-border">
              <div className="text-center">
                <div className="w-24 h-32 rounded-lg bg-secondary mx-auto mb-4 flex items-center justify-center">
                  {scannedCard ? (
                    <img
                      src="/images/charizard-ex-1.png"
                      alt={scannedCard}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <Camera className="w-12 h-12 text-muted-foreground" />
                  )}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {scannedCard ? `Carta Detectada: ${scannedCard}` : 'Apontar Câmera para a Carta'}
                </h3>
                <p className="text-muted-foreground text-sm mb-6">
                  {scannedCard
                    ? 'Carta identificada com sucesso'
                    : 'Posicione a carta frente à câmera para escanear'}
                </p>
                <Button
                  onClick={handleScanCard}
                  className="bg-accent hover:bg-red-700 text-white"
                  disabled={scannedCard !== null}
                >
                  <Camera className="w-4 h-4 mr-2" />
                  {scannedCard ? 'Carta Escaneada' : 'Iniciar Scanner'}
                </Button>
              </div>
            </Card>
          </TabsContent>

          {/* Manual Tab */}
          <TabsContent value="manual" className="space-y-6">
            <Card className="p-6 bg-card border-border">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="search" className="text-foreground font-semibold mb-2 block">
                    Buscar Carta
                  </Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="search"
                      placeholder="Digite o nome da carta... (ex: Charizard)"
                      value={form.name}
                      onChange={(e) => handleSearch(e.target.value)}
                      className="pl-10 bg-secondary border-border text-foreground placeholder:text-muted-foreground"
                    />
                  </div>

                  {/* Search Results */}
                  {showResults && searchResults.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-secondary border border-border rounded-lg shadow-lg z-10">
                      {searchResults.map((card) => (
                        <button
                          key={card.id}
                          onClick={() => handleSelectCard(card.name)}
                          className="w-full text-left px-4 py-2 hover:bg-card transition-colors border-b border-border last:border-b-0 text-foreground"
                        >
                          {card.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Form */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="md:col-span-2 space-y-6">
            {/* Condition */}
            <Card className="p-6 bg-card border-border">
              <Label className="text-foreground font-semibold mb-4 block">Estado da Carta</Label>
              <RadioGroup value={form.condition} onValueChange={(value) => setForm({ ...form, condition: value })}>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                  {conditionOptions.map((option) => (
                    <div key={option.value} className="relative">
                      <RadioGroupItem value={option.value} id={`condition-${option.value}`} className="hidden" />
                      <Label
                        htmlFor={`condition-${option.value}`}
                        className={`block p-3 rounded-lg text-center cursor-pointer transition-all border-2 ${
                          form.condition === option.value
                            ? `${option.color} text-white border-${option.color}`
                            : 'border-border text-foreground hover:border-accent'
                        }`}
                      >
                        <p className="font-semibold text-sm">{option.label}</p>
                        <p className="text-xs">{option.value}/10</p>
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </Card>

            {/* Price */}
            <Card className="p-6 bg-card border-border">
              <Label htmlFor="price" className="text-foreground font-semibold mb-2 block">
                Preço (R$)
              </Label>
              <Input
                id="price"
                type="number"
                placeholder="0.00"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
              />
            </Card>

            {/* Accept Trades */}
            <Card className="p-6 bg-card border-border">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-foreground font-semibold block">Aceita Trocas?</Label>
                  <p className="text-muted-foreground text-sm mt-1">
                    Permitir que outros usuários proponham trocas
                  </p>
                </div>
                <Switch
                  checked={form.acceptsTrade}
                  onCheckedChange={(checked) => setForm({ ...form, acceptsTrade: checked })}
                />
              </div>
            </Card>

            {/* Submit */}
            <Button
              onClick={handleSubmit}
              className="w-full bg-accent hover:bg-red-700 text-white h-12 font-semibold"
            >
              <Plus className="w-5 h-5 mr-2" />
              Cadastrar Carta
            </Button>
          </div>

          {/* Preview */}
          <div>
            <Card className="p-6 bg-card border-border sticky top-24">
              <h3 className="font-semibold text-foreground mb-4">Preview</h3>

              {form.name ? (
                <div className="space-y-4">
                  <div className="w-full aspect-[3/4] rounded-lg bg-secondary overflow-hidden">
                    <img
                      src="/images/charizard-ex-1.png"
                      alt={form.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div>
                    <p className="text-muted-foreground text-xs mb-1">Nome</p>
                    <p className="font-semibold text-foreground">{form.name}</p>
                  </div>

                  <div>
                    <p className="text-muted-foreground text-xs mb-1">Estado</p>
                    <Badge className="bg-accent text-white">
                      {conditionOptions.find((c) => c.value === form.condition)?.label} - {form.condition}/10
                    </Badge>
                  </div>

                  <div>
                    <p className="text-muted-foreground text-xs mb-1">Preço</p>
                    <p className="text-2xl font-bold text-accent">
                      {form.price ? `R$ ${parseFloat(form.price).toFixed(2)}` : 'R$ 0.00'}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <div className="flex items-center justify-between">
                      <p className="text-muted-foreground text-sm">Aceita Trocas</p>
                      <Badge className={form.acceptsTrade ? 'bg-green-900 text-green-200' : 'bg-red-900 text-red-200'}>
                        {form.acceptsTrade ? 'Sim' : 'Não'}
                      </Badge>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground text-sm">
                    Selecione uma carta para ver o preview
                  </p>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
