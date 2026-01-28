import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigation } from '@/contexts/NavigationContext';
import { AlertCircle, Loader2 } from 'lucide-react';

export default function Login() {
  const { login } = useAuth();
  const { setActiveTab } = useNavigation();
  const [email, setEmail] = useState('user@example.com');
  const [password, setPassword] = useState('123456');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [signupData, setSignupData] = useState({
    email: '',
    password: '',
    name: '',
    city: '',
    state: '',
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      setActiveTab('home');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao fazer login');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const { signup } = await import('@/contexts/AuthContext').then(m => ({ signup: m.AuthProvider }));
      // This is a workaround - we'll use the login function to create new user
      // In a real app, this would call a signup endpoint
      setError('Cadastro em desenvolvimento. Use user@example.com / 123456 para testar.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao fazer cadastro');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">PokéTrade</h1>
          <p className="text-muted-foreground">Marketplace de Pokémon TCG</p>
        </div>

        {/* Card */}
        <div className="bg-card border border-border rounded-lg p-8 shadow-lg">
          {!isSignup ? (
            <>
              <h2 className="text-2xl font-bold text-foreground mb-6">Entrar</h2>

              {error && (
                <div className="mb-4 p-3 bg-destructive/10 border border-destructive rounded-lg flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <Input
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                  />
                  <p className="text-xs text-muted-foreground mt-1">Demo: user@example.com</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Senha
                  </label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                  />
                  <p className="text-xs text-muted-foreground mt-1">Demo: 123456</p>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold h-10"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Entrando...
                    </>
                  ) : (
                    'Entrar'
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Não tem conta?{' '}
                  <button
                    onClick={() => setIsSignup(true)}
                    className="text-red-600 hover:text-red-700 font-semibold"
                  >
                    Cadastre-se
                  </button>
                </p>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-foreground mb-6">Criar Conta</h2>

              {error && (
                <div className="mb-4 p-3 bg-destructive/10 border border-destructive rounded-lg flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

              <form onSubmit={handleSignup} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Nome Completo
                  </label>
                  <Input
                    type="text"
                    placeholder="Seu nome"
                    value={signupData.name}
                    onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <Input
                    type="email"
                    placeholder="seu@email.com"
                    value={signupData.email}
                    onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Senha
                  </label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={signupData.password}
                    onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                    disabled={isLoading}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Cidade
                    </label>
                    <Input
                      type="text"
                      placeholder="São Paulo"
                      value={signupData.city}
                      onChange={(e) => setSignupData({ ...signupData, city: e.target.value })}
                      disabled={isLoading}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Estado
                    </label>
                    <Input
                      type="text"
                      placeholder="SP"
                      value={signupData.state}
                      onChange={(e) => setSignupData({ ...signupData, state: e.target.value })}
                      disabled={isLoading}
                      maxLength={2}
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold h-10"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Cadastrando...
                    </>
                  ) : (
                    'Criar Conta'
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Já tem conta?{' '}
                  <button
                    onClick={() => setIsSignup(false)}
                    className="text-red-600 hover:text-red-700 font-semibold"
                  >
                    Entrar
                  </button>
                </p>
              </div>
            </>
          )}
        </div>

        {/* Demo info */}
        <div className="mt-6 p-4 bg-card border border-border rounded-lg">
          <p className="text-xs text-muted-foreground">
            <strong>Contas de Demo:</strong>
            <br />
            📧 user@example.com / 123456
            <br />
            📧 seller@example.com / 123456
          </p>
        </div>
      </div>
    </div>
  );
}
