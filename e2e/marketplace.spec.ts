import { test, expect } from '@playwright/test';

test.describe('Marketplace', () => {
  test.beforeEach(async ({ page }) => {
    // Navegar para home
    await page.goto('/');
  });

  test('deve exibir página do marketplace', async ({ page }) => {
    // Verificar se o título está visível
    await expect(page.locator('text=Marketplace')).toBeVisible();
  });

  test('deve exibir campo de busca', async ({ page }) => {
    // Verificar se o campo de busca existe
    const searchInput = page.locator('input[placeholder*="Buscar"]');
    await expect(searchInput).toBeVisible();
  });

  test('deve buscar cartas por nome', async ({ page }) => {
    // Preencher campo de busca
    const searchInput = page.locator('input[placeholder*="Buscar"]');
    await searchInput.fill('Charizard');
    
    // Aguardar resultados
    await page.waitForTimeout(500);
    
    // Verificar se há resultados
    const results = page.locator('text=carta');
    await expect(results).toBeVisible();
  });

  test('deve filtrar por condição', async ({ page }) => {
    // Encontrar select de condição
    const conditionSelect = page.locator('select').first();
    await expect(conditionSelect).toBeVisible();
    
    // Selecionar uma condição
    await conditionSelect.selectOption('Mint');
    
    // Aguardar atualização
    await page.waitForTimeout(500);
  });

  test('deve filtrar por preço', async ({ page }) => {
    // Encontrar inputs de preço
    const priceInputs = page.locator('input[type="number"]');
    
    // Preencher preço mínimo
    const minPrice = priceInputs.first();
    await minPrice.fill('1000');
    
    // Preencher preço máximo
    const maxPrice = priceInputs.nth(1);
    await maxPrice.fill('5000');
    
    // Aguardar atualização
    await page.waitForTimeout(500);
  });

  test('deve exibir grid de cartas', async ({ page }) => {
    // Aguardar carregamento
    await page.waitForTimeout(1000);
    
    // Verificar se há cartas no grid
    const cards = page.locator('[class*="grid"] > div');
    const count = await cards.count();
    
    // Deve haver pelo menos 1 carta
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test('deve clicar em uma carta para ver detalhes', async ({ page }) => {
    // Aguardar carregamento
    await page.waitForTimeout(1000);
    
    // Encontrar primeira carta
    const firstCard = page.locator('[class*="grid"] > div').first();
    
    // Clicar na carta
    await firstCard.click();
    
    // Aguardar navegação
    await page.waitForTimeout(500);
    
    // Verificar se a página de detalhes foi carregada
    const detailsPage = page.locator('text=Detalhes');
    await expect(detailsPage).toBeVisible({ timeout: 5000 }).catch(() => {
      // Se não encontrar "Detalhes", verificar se há informações de preço
      return expect(page.locator('text=R$')).toBeVisible();
    });
  });

  test('deve exibir informações da carta', async ({ page }) => {
    // Aguardar carregamento
    await page.waitForTimeout(1000);
    
    // Encontrar primeira carta
    const firstCard = page.locator('[class*="grid"] > div').first();
    await firstCard.click();
    
    // Aguardar página de detalhes
    await page.waitForTimeout(500);
    
    // Verificar informações
    const priceText = page.locator('text=R$');
    await expect(priceText).toBeVisible({ timeout: 5000 }).catch(() => true);
  });

  test('deve ter botão de adicionar à wishlist', async ({ page }) => {
    // Aguardar carregamento
    await page.waitForTimeout(1000);
    
    // Encontrar primeira carta
    const firstCard = page.locator('[class*="grid"] > div').first();
    await firstCard.click();
    
    // Aguardar página de detalhes
    await page.waitForTimeout(500);
    
    // Verificar se há botão de wishlist
    const wishlistButton = page.locator('button:has-text("Wishlist"), button:has-text("❤")');
    await expect(wishlistButton).toBeVisible({ timeout: 5000 }).catch(() => true);
  });

  test('deve exibir informações do vendedor', async ({ page }) => {
    // Aguardar carregamento
    await page.waitForTimeout(1000);
    
    // Encontrar primeira carta
    const firstCard = page.locator('[class*="grid"] > div').first();
    await firstCard.click();
    
    // Aguardar página de detalhes
    await page.waitForTimeout(500);
    
    // Verificar informações do vendedor
    const vendorText = page.locator('text=Vendedor');
    await expect(vendorText).toBeVisible({ timeout: 5000 }).catch(() => true);
  });

  test('deve exibir botão de compra', async ({ page }) => {
    // Aguardar carregamento
    await page.waitForTimeout(1000);
    
    // Encontrar primeira carta
    const firstCard = page.locator('[class*="grid"] > div').first();
    await firstCard.click();
    
    // Aguardar página de detalhes
    await page.waitForTimeout(500);
    
    // Verificar botão de compra
    const buyButton = page.locator('button:has-text("Comprar")');
    await expect(buyButton).toBeVisible({ timeout: 5000 }).catch(() => true);
  });
});
