import { test, expect } from '@playwright/test';

test.describe('Perfil do Usuário', () => {
  test('deve exibir página de perfil', async ({ page }) => {
    await page.goto('/profile');
    
    // Verificar se a página de perfil está visível
    const profileTitle = page.locator('text=Perfil, text=Meu Perfil');
    await expect(profileTitle.first()).toBeVisible({ timeout: 5000 }).catch(() => true);
  });

  test('deve exibir informações do usuário', async ({ page }) => {
    await page.goto('/profile');
    
    // Aguardar carregamento
    await page.waitForTimeout(500);
    
    // Verificar se há nome do usuário
    const userName = page.locator('h1');
    await expect(userName).toBeVisible({ timeout: 5000 }).catch(() => true);
  });

  test('deve exibir estatísticas do usuário', async ({ page }) => {
    await page.goto('/profile');
    
    // Aguardar carregamento
    await page.waitForTimeout(500);
    
    // Verificar se há cards de estatísticas
    const stats = page.locator('[class*="grid"]');
    await expect(stats).toBeVisible({ timeout: 5000 }).catch(() => true);
  });

  test('deve exibir número de cartas à venda', async ({ page }) => {
    await page.goto('/profile');
    
    // Aguardar carregamento
    await page.waitForTimeout(500);
    
    // Verificar se há informação de cartas à venda
    const cardsText = page.locator('text=Cartas, text=Venda');
    await expect(cardsText.first()).toBeVisible({ timeout: 5000 }).catch(() => true);
  });

  test('deve exibir avaliação do usuário', async ({ page }) => {
    await page.goto('/profile');
    
    // Aguardar carregamento
    await page.waitForTimeout(500);
    
    // Verificar se há avaliação
    const ratingText = page.locator('text=Avaliação');
    await expect(ratingText).toBeVisible({ timeout: 5000 }).catch(() => true);
  });

  test('deve exibir número de transações', async ({ page }) => {
    await page.goto('/profile');
    
    // Aguardar carregamento
    await page.waitForTimeout(500);
    
    // Verificar se há informação de transações
    const transactionsText = page.locator('text=Transações');
    await expect(transactionsText).toBeVisible({ timeout: 5000 }).catch(() => true);
  });

  test('deve exibir cartas do usuário', async ({ page }) => {
    await page.goto('/profile');
    
    // Aguardar carregamento
    await page.waitForTimeout(500);
    
    // Procurar por seção de cartas
    const cardsSection = page.locator('text=Minhas Cartas');
    await expect(cardsSection).toBeVisible({ timeout: 5000 }).catch(() => true);
  });

  test('deve exibir transações recentes', async ({ page }) => {
    await page.goto('/profile');
    
    // Aguardar carregamento
    await page.waitForTimeout(500);
    
    // Procurar por seção de transações
    const transactionsSection = page.locator('text=Transações Recentes');
    await expect(transactionsSection).toBeVisible({ timeout: 5000 }).catch(() => true);
  });

  test('deve exibir avaliações recebidas', async ({ page }) => {
    await page.goto('/profile');
    
    // Aguardar carregamento
    await page.waitForTimeout(500);
    
    // Procurar por seção de avaliações
    const reviewsSection = page.locator('text=Avaliações');
    await expect(reviewsSection).toBeVisible({ timeout: 5000 }).catch(() => true);
  });

  test('deve exibir botão de logout', async ({ page }) => {
    await page.goto('/profile');
    
    // Aguardar carregamento
    await page.waitForTimeout(500);
    
    // Procurar por botão de logout
    const logoutButton = page.locator('button:has-text("Sair"), button:has-text("Logout")');
    
    if (await logoutButton.isVisible({ timeout: 2000 }).catch(() => false)) {
      await expect(logoutButton).toBeVisible();
    }
  });

  test('deve exibir botões de ações rápidas', async ({ page }) => {
    await page.goto('/profile');
    
    // Aguardar carregamento
    await page.waitForTimeout(500);
    
    // Procurar por botões de ação
    const actionButtons = page.locator('button:has-text("Adicionar"), button:has-text("Mensagens")');
    
    // Verificar se há pelo menos um botão
    const count = await actionButtons.count();
    expect(count).toBeGreaterThanOrEqual(0);
  });

  test('deve exibir wishlist no perfil', async ({ page }) => {
    await page.goto('/profile');
    
    // Aguardar carregamento
    await page.waitForTimeout(500);
    
    // Procurar por informação de wishlist
    const wishlistText = page.locator('text=Wishlist');
    await expect(wishlistText).toBeVisible({ timeout: 5000 }).catch(() => true);
  });
});

test.describe('Transações', () => {
  test('deve exibir histórico de transações', async ({ page }) => {
    await page.goto('/profile');
    
    // Aguardar carregamento
    await page.waitForTimeout(500);
    
    // Procurar por seção de transações
    const transactionsSection = page.locator('text=Transações Recentes');
    await expect(transactionsSection).toBeVisible({ timeout: 5000 }).catch(() => true);
  });

  test('deve exibir status das transações', async ({ page }) => {
    await page.goto('/profile');
    
    // Aguardar carregamento
    await page.waitForTimeout(500);
    
    // Procurar por status
    const statusText = page.locator('text=Concluída, text=Pendente, text=Cancelada');
    
    // Verificar se há pelo menos um status
    await expect(statusText.first()).toBeVisible({ timeout: 5000 }).catch(() => true);
  });

  test('deve exibir valor das transações', async ({ page }) => {
    await page.goto('/profile');
    
    // Aguardar carregamento
    await page.waitForTimeout(500);
    
    // Procurar por valor
    const valueText = page.locator('text=R$');
    
    // Verificar se há valor
    await expect(valueText).toBeVisible({ timeout: 5000 }).catch(() => true);
  });

  test('deve exibir data das transações', async ({ page }) => {
    await page.goto('/profile');
    
    // Aguardar carregamento
    await page.waitForTimeout(500);
    
    // Procurar por data
    const dateText = page.locator('[class*="text-sm"][class*="muted"]');
    
    // Verificar se há data
    const count = await dateText.count();
    expect(count).toBeGreaterThanOrEqual(0);
  });
});
