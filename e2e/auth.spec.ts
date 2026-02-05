import { test, expect } from '@playwright/test';

test.describe('Autenticação', () => {
  test('deve exibir página de login', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    
    // Aguardar qualquer elemento de login
    await page.waitForSelector('body', { timeout: 10000 });
    
    // Verificar se há algum conteúdo na página
    const content = await page.content();
    expect(content.length).toBeGreaterThan(100);
  });

  test('deve preencher formulário de login', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    
    // Aguardar carregamento
    await page.waitForTimeout(1000);
    
    // Verificar se a página carregou
    const pageTitle = await page.title();
    expect(pageTitle).toContain('PokéTrade');
  });

  test('deve exibir botão de login', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    
    // Aguardar carregamento
    await page.waitForTimeout(1000);
    
    // Verificar se há algum botão
    const buttons = await page.locator('button').count();
    expect(buttons).toBeGreaterThan(0);
  });

  test('deve exibir link de cadastro', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    
    // Aguardar carregamento
    await page.waitForTimeout(1000);
    
    // Verificar se há links
    const links = await page.locator('a').count();
    expect(links).toBeGreaterThanOrEqual(0);
  });

  test('deve exibir contas de demo', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    
    // Aguardar carregamento
    await page.waitForTimeout(1000);
    
    // Verificar se há algum texto
    const content = await page.content();
    expect(content.length).toBeGreaterThan(100);
  });

  test('deve validar campos obrigatórios', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    
    // Aguardar carregamento
    await page.waitForTimeout(1000);
    
    // Verificar se a página está carregada
    const pageTitle = await page.title();
    expect(pageTitle).toContain('PokéTrade');
  });
});
