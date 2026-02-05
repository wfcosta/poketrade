# PokéTrade - Full-Stack Implementation TODO

## Phase 1: Backend Setup ✅
- [x] Upgrade para web-db-user (Node.js + Express + tRPC + PostgreSQL)
- [x] Criar schema do banco de dados (9 tabelas)
- [x] Aplicar migrations (pnpm db:push)
- [x] Criar database helpers (db.ts)
- [x] Criar tRPC routers com APIs reais

## Phase 2: Frontend Integration
- [ ] Integrar Cards API com Home.tsx
- [ ] Integrar Transactions API com fluxo de compra
- [ ] Integrar Chat API com mensagens
- [ ] Integrar Notifications API
- [ ] Integrar Wishlist API
- [ ] Integrar Trade Proposals API
- [ ] Remover todos os mocks do DataContext

## Phase 3: File Upload
- [ ] Implementar upload de fotos de cartas
- [ ] Implementar upload de comprovante de rastreio
- [ ] Integrar com S3 storage

## Phase 4: Payment (Mock)
- [ ] Implementar fluxo de pagamento mock com Stripe
- [ ] Simular confirmação de pagamento
- [ ] Implementar escrow logic para trocas

## Phase 5: Testing
- [ ] Criar testes unitários (Jest) para backend
- [ ] Criar testes de integração para APIs
- [ ] Criar testes E2E para fluxos críticos
- [ ] Atingir 80%+ cobertura de testes

## Phase 6: Quality Assurance
- [ ] Testar fluxo de login/autenticação
- [ ] Testar fluxo de compra completo
- [ ] Testar fluxo de troca (online e presencial)
- [ ] Testar chat e notificações
- [ ] Testar upload de arquivos
- [ ] Testar histórico e wishlist

## Phase 7: Deployment
- [ ] Configurar variáveis de ambiente
- [ ] Fazer build de produção
- [ ] Deploy para plataforma (Railway/Vercel/Render)
- [ ] Gerar URL pública para testes
- [ ] Testar em produção

## Phase 8: Documentation
- [ ] Documentar API endpoints
- [ ] Criar guia de uso
- [ ] Documentar limitações conhecidas
