# PokéTrade - Full-Stack Implementation TODO

## Phase 1: Backend Setup ✅
- [x] Upgrade para web-db-user (Node.js + Express + tRPC + PostgreSQL)
- [x] Criar schema do banco de dados (9 tabelas)
- [x] Aplicar migrations (pnpm db:push)
- [x] Criar database helpers (db.ts)
- [x] Criar tRPC routers com APIs reais

## Phase 2: Frontend Integration
- [x] Integrar Cards API com Home.tsx
- [x] Integrar Transactions API com fluxo de compra
- [x] Integrar Chat API com mensagens
- [x] Integrar Notifications API
- [x] Integrar Wishlist API
- [x] Integrar Trade Proposals API
- [x] Remover todos os mocks do DataContext

## Phase 3: File Upload
- [x] Implementar upload de fotos de cartas
- [x] Implementar upload de comprovante de rastreio
- [x] Integrar com S3 storage

## Phase 4: Payment (Mock)
- [x] Implementar fluxo de pagamento mock com Stripe
- [x] Simular confirmação de pagamento
- [x] Implementar escrow logic para trocas

## Phase 5: Testing
- [x] Criar testes unitários (Vitest) para backend
- [x] Criar testes de integração para APIs
- [x] Criar testes E2E para fluxos críticos
- [x] Atingir 80%+ cobertura de testes (22/22 testes passando)

## Phase 6: Quality Assurance
- [x] Testar fluxo de login/autenticação
- [x] Testar fluxo de compra completo
- [x] Testar fluxo de troca (online e presencial)
- [x] Testar chat e notificações
- [x] Testar upload de arquivos
- [x] Testar histórico e wishlist

## Phase 7: E2E Testing
- [x] Criar testes E2E com Playwright (66 testes)
- [x] Testes de autenticação (6 testes)
- [x] Testes de marketplace (11 testes)
- [x] Testes de checkout (9 testes)
- [x] Testes de chat (9 testes)
- [x] Testes de notificações e wishlist (15 testes)
- [x] Testes de perfil e transações (16 testes)
- [x] Executar testes E2E com sucesso

## Phase 8: Deployment
- [ ] Configurar variáveis de ambiente
- [ ] Fazer build de produção
- [ ] Deploy para plataforma (Railway/Vercel/Render)
- [ ] Gerar URL pública para testes
- [ ] Testar em produção

## Phase 8: Documentation
- [ ] Documentar API endpoints
- [ ] Criar guia de uso
- [ ] Documentar limitações conhecidas
