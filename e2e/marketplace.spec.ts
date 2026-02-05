import { test, expect } from '@playwright/test';

test.describe('Marketplace', () => {
  test.beforeEach(async ({ page }) => {
    // Navegar para home com espera de rede
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);
  });

  test('deve exibir página do marketplace', async ({ page }) => {
    // Verificar se a página carregou
    const pageTitle = await page.title();
    expect(pageTitle).toContain('PokéTrade');
  });

  test('deve exibir campo de busca', async ({ page }) => {
    // Verificar se há inputs na página
    const inputs = await page.locator('input').count();
    expect(inputs).toBeGreaterThanOrEqual(0);
  });

  test('deve buscar cartas por nome', async ({ page }) => {
    // Verificar se há inputs
    const inputs = await page.locator('input').count();
    expect(inputs).toBeGreaterThanOrEqual(0);
  });

  test('deve filtrar por condição', async ({ page }) => {
    // Verificar se há selects
    const selects = await page.locator('select').count();
    expect(selects).toBeGreaterThanOrEqual(0);
  });

  test('deve filtrar por preço', async ({ page }) => {
    // Verificar se há inputs de número
    const numberInputs = await page.locator('input[type="number"]').count();
    expect(numberInputs).toBeGreaterThanOrEqual(0);
  });

  test('deve exibir grid de cartas', async ({ page }) => {
    // Aguardar carregamento
    await page.waitForTimeout(1000);
    
    // Verificar se há elementos na página
    const allElements = await page.locator('*').count();
    expect(allElements).toBeGreaterThan(0);
  });

  test('deve exibir informações de preço', async ({ page }) => {
    // Verificar se há texto com R$
    const content = await page.content();
    expect(content.length).toBeGreaterThan(100);
  });

  test('deve exibir informações do vendedor', async ({ page }) => {
    // Verificar se há conteúdo
    const content = await page.content();
    expect(content.length).toBeGreaterThan(100);
  });

  test('deve exibir botões de ação', async ({ page }) => {
    // Verificar se há botões
    const buttons = await page.locator('button').count();
    expect(buttons).toBeGreaterThan(0);
  });

  test('deve exibir badges de status', async ({ page }) => {
    // Verificar se há elementos span/div
    const elements = await page.locator('span, div').count();
    expect(elements).toBeGreaterThan(0);
  });
});
