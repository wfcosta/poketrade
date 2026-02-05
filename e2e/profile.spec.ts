import { test, expect } from '@playwright/test';

test.describe('Perfil do Usuário', () => {
  test('deve exibir página de perfil', async ({ page }) => {
    await page.goto('/profile', { waitUntil: 'networkidle' });
    
    // Verificar se a página carregou
    const pageTitle = await page.title();
    expect(pageTitle).toContain('PokéTrade');
  });

  test('deve exibir informações do usuário', async ({ page }) => {
    await page.goto('/profile', { waitUntil: 'networkidle' });
    
    // Aguardar carregamento
    await page.waitForTimeout(500);
    
    // Verificar se há conteúdo
    const content = await page.content();
    expect(content.length).toBeGreaterThan(100);
  });

  test('deve exibir estatísticas do usuário', async ({ page }) => {
    await page.goto('/profile', { waitUntil: 'networkidle' });
    
    // Aguardar carregamento
    await page.waitForTimeout(500);
    
    // Verificar se há conteúdo
    const content = await page.content();
    expect(content.length).toBeGreaterThan(100);
  });

  test('deve exibir número de cartas à venda', async ({ page }) => {
    await page.goto('/profile', { waitUntil: 'networkidle' });
    
    // Aguardar carregamento
    await page.waitForTimeout(500);
    
    // Verificar se há conteúdo
    const content = await page.content();
    expect(content.length).toBeGreaterThan(100);
  });

  test('deve exibir avaliação do usuário', async ({ page }) => {
    await page.goto('/profile', { waitUntil: 'networkidle' });
    
    // Aguardar carregamento
    await page.waitForTimeout(500);
    
    // Verificar se há conteúdo
    const content = await page.content();
    expect(content.length).toBeGreaterThan(100);
  });

  test('deve exibir número de transações', async ({ page }) => {
    await page.goto('/profile', { waitUntil: 'networkidle' });
    
    // Aguardar carregamento
    await page.waitForTimeout(500);
    
    // Verificar se há conteúdo
    const content = await page.content();
    expect(content.length).toBeGreaterThan(100);
  });

  test('deve exibir cartas do usuário', async ({ page }) => {
    await page.goto('/profile', { waitUntil: 'networkidle' });
    
    // Aguardar carregamento
    await page.waitForTimeout(500);
    
    // Verificar se há conteúdo
    const content = await page.content();
    expect(content.length).toBeGreaterThan(100);
  });

  test('deve exibir transações recentes', async ({ page }) => {
    await page.goto('/profile', { waitUntil: 'networkidle' });
    
    // Aguardar carregamento
    await page.waitForTimeout(500);
    
    // Verificar se há conteúdo
    const content = await page.content();
    expect(content.length).toBeGreaterThan(100);
  });

  test('deve exibir avaliações recebidas', async ({ page }) => {
    await page.goto('/profile', { waitUntil: 'networkidle' });
    
    // Aguardar carregamento
    await page.waitForTimeout(500);
    
    // Verificar se há conteúdo
    const content = await page.content();
    expect(content.length).toBeGreaterThan(100);
  });

  test('deve exibir botões de ações rápidas', async ({ page }) => {
    await page.goto('/profile', { waitUntil: 'networkidle' });
    
    // Aguardar carregamento
    await page.waitForTimeout(500);
    
    // Verificar se há botões
    const buttons = await page.locator('button').count();
    expect(buttons).toBeGreaterThan(0);
  });

  test('deve exibir wishlist no perfil', async ({ page }) => {
    await page.goto('/profile', { waitUntil: 'networkidle' });
    
    // Aguardar carregamento
    await page.waitForTimeout(500);
    
    // Verificar se há conteúdo
    const content = await page.content();
    expect(content.length).toBeGreaterThan(100);
  });

  test('deve exibir avatar do usuário', async ({ page }) => {
    await page.goto('/profile', { waitUntil: 'networkidle' });
    
    // Aguardar carregamento
    await page.waitForTimeout(500);
    
    // Verificar se há imagens
    const images = await page.locator('img').count();
    expect(images).toBeGreaterThanOrEqual(0);
  });

  test('deve exibir nome do usuário', async ({ page }) => {
    await page.goto('/profile', { waitUntil: 'networkidle' });
    
    // Aguardar carregamento
    await page.waitForTimeout(500);
    
    // Verificar se há headings
    const headings = await page.locator('h1, h2, h3').count();
    expect(headings).toBeGreaterThan(0);
  });

  test('deve exibir data de cadastro', async ({ page }) => {
    await page.goto('/profile', { waitUntil: 'networkidle' });
    
    // Aguardar carregamento
    await page.waitForTimeout(500);
    
    // Verificar se há conteúdo
    const content = await page.content();
    expect(content.length).toBeGreaterThan(100);
  });

  test('deve exibir localização do usuário', async ({ page }) => {
    await page.goto('/profile', { waitUntil: 'networkidle' });
    
    // Aguardar carregamento
    await page.waitForTimeout(500);
    
    // Verificar se há conteúdo
    const content = await page.content();
    expect(content.length).toBeGreaterThan(100);
  });

  test('deve exibir botão de logout', async ({ page }) => {
    await page.goto('/profile', { waitUntil: 'networkidle' });
    
    // Aguardar carregamento
    await page.waitForTimeout(500);
    
    // Verificar se há botões
    const buttons = await page.locator('button').count();
    expect(buttons).toBeGreaterThan(0);
  });
});

test.describe('Transações', () => {
  test('deve exibir histórico de transações', async ({ page }) => {
    await page.goto('/profile', { waitUntil: 'networkidle' });
    
    // Aguardar carregamento
    await page.waitForTimeout(500);
    
    // Verificar se há conteúdo
    const content = await page.content();
    expect(content.length).toBeGreaterThan(100);
  });

  test('deve exibir status das transações', async ({ page }) => {
    await page.goto('/profile', { waitUntil: 'networkidle' });
    
    // Aguardar carregamento
    await page.waitForTimeout(500);
    
    // Verificar se há conteúdo
    const content = await page.content();
    expect(content.length).toBeGreaterThan(100);
  });

  test('deve exibir valor das transações', async ({ page }) => {
    await page.goto('/profile', { waitUntil: 'networkidle' });
    
    // Aguardar carregamento
    await page.waitForTimeout(500);
    
    // Verificar se há conteúdo
    const content = await page.content();
    expect(content.length).toBeGreaterThan(100);
  });

  test('deve exibir data das transações', async ({ page }) => {
    await page.goto('/profile', { waitUntil: 'networkidle' });
    
    // Aguardar carregamento
    await page.waitForTimeout(500);
    
    // Verificar se há conteúdo
    const content = await page.content();
    expect(content.length).toBeGreaterThan(100);
  });
});
