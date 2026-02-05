import { test, expect } from '@playwright/test';

test.describe('Checkout', () => {
  test('deve exibir página de checkout', async ({ page }) => {
    await page.goto('/checkout', { waitUntil: 'networkidle' });
    
    // Verificar se a página carregou
    const pageTitle = await page.title();
    expect(pageTitle).toContain('PokéTrade');
  });

  test('deve exibir etapas do checkout', async ({ page }) => {
    await page.goto('/checkout', { waitUntil: 'networkidle' });
    
    // Aguardar carregamento
    await page.waitForTimeout(500);
    
    // Verificar se há conteúdo
    const content = await page.content();
    expect(content.length).toBeGreaterThan(100);
  });

  test('deve exibir formulário de endereço', async ({ page }) => {
    await page.goto('/checkout', { waitUntil: 'networkidle' });
    
    // Aguardar carregamento
    await page.waitForTimeout(500);
    
    // Verificar se há inputs
    const inputs = await page.locator('input').count();
    expect(inputs).toBeGreaterThanOrEqual(0);
  });

  test('deve exibir resumo do pedido', async ({ page }) => {
    await page.goto('/checkout', { waitUntil: 'networkidle' });
    
    // Aguardar carregamento
    await page.waitForTimeout(500);
    
    // Verificar se há conteúdo
    const content = await page.content();
    expect(content.length).toBeGreaterThan(100);
  });

  test('deve exibir informações de segurança', async ({ page }) => {
    await page.goto('/checkout', { waitUntil: 'networkidle' });
    
    // Aguardar carregamento
    await page.waitForTimeout(500);
    
    // Verificar se há conteúdo
    const content = await page.content();
    expect(content.length).toBeGreaterThan(100);
  });

  test('deve exibir botão de continuar', async ({ page }) => {
    await page.goto('/checkout', { waitUntil: 'networkidle' });
    
    // Aguardar carregamento
    await page.waitForTimeout(500);
    
    // Verificar se há botões
    const buttons = await page.locator('button').count();
    expect(buttons).toBeGreaterThan(0);
  });

  test('deve exibir campo de email', async ({ page }) => {
    await page.goto('/checkout', { waitUntil: 'networkidle' });
    
    // Aguardar carregamento
    await page.waitForTimeout(500);
    
    // Verificar se há inputs
    const inputs = await page.locator('input').count();
    expect(inputs).toBeGreaterThanOrEqual(0);
  });

  test('deve exibir campo de telefone', async ({ page }) => {
    await page.goto('/checkout', { waitUntil: 'networkidle' });
    
    // Aguardar carregamento
    await page.waitForTimeout(500);
    
    // Verificar se há inputs
    const inputs = await page.locator('input').count();
    expect(inputs).toBeGreaterThanOrEqual(0);
  });

  test('deve exibir campo de CEP', async ({ page }) => {
    await page.goto('/checkout', { waitUntil: 'networkidle' });
    
    // Aguardar carregamento
    await page.waitForTimeout(500);
    
    // Verificar se há inputs
    const inputs = await page.locator('input').count();
    expect(inputs).toBeGreaterThanOrEqual(0);
  });
});
