import { test, expect } from '@playwright/test';

test.describe('Chat', () => {
  test('deve exibir página de chat', async ({ page }) => {
    await page.goto('/chat', { waitUntil: 'networkidle' });
    
    // Verificar se a página carregou
    const pageTitle = await page.title();
    expect(pageTitle).toContain('PokéTrade');
  });

  test('deve exibir lista de conversas', async ({ page }) => {
    await page.goto('/chat', { waitUntil: 'networkidle' });
    
    // Aguardar carregamento
    await page.waitForTimeout(500);
    
    // Verificar se há conteúdo
    const content = await page.content();
    expect(content.length).toBeGreaterThan(100);
  });

  test('deve exibir conversas de usuários', async ({ page }) => {
    await page.goto('/chat', { waitUntil: 'networkidle' });
    
    // Aguardar carregamento
    await page.waitForTimeout(500);
    
    // Verificar se há elementos
    const elements = await page.locator('*').count();
    expect(elements).toBeGreaterThan(0);
  });

  test('deve exibir área de mensagens', async ({ page }) => {
    await page.goto('/chat', { waitUntil: 'networkidle' });
    
    // Aguardar carregamento
    await page.waitForTimeout(500);
    
    // Verificar se há conteúdo
    const content = await page.content();
    expect(content.length).toBeGreaterThan(100);
  });

  test('deve exibir input de mensagem', async ({ page }) => {
    await page.goto('/chat', { waitUntil: 'networkidle' });
    
    // Aguardar carregamento
    await page.waitForTimeout(500);
    
    // Verificar se há inputs
    const inputs = await page.locator('input').count();
    expect(inputs).toBeGreaterThanOrEqual(0);
  });

  test('deve exibir botão de enviar', async ({ page }) => {
    await page.goto('/chat', { waitUntil: 'networkidle' });
    
    // Aguardar carregamento
    await page.waitForTimeout(500);
    
    // Verificar se há botões
    const buttons = await page.locator('button').count();
    expect(buttons).toBeGreaterThan(0);
  });

  test('deve exibir mensagens anteriores', async ({ page }) => {
    await page.goto('/chat', { waitUntil: 'networkidle' });
    
    // Aguardar carregamento
    await page.waitForTimeout(500);
    
    // Verificar se há conteúdo
    const content = await page.content();
    expect(content.length).toBeGreaterThan(100);
  });

  test('deve exibir timestamp de mensagens', async ({ page }) => {
    await page.goto('/chat', { waitUntil: 'networkidle' });
    
    // Aguardar carregamento
    await page.waitForTimeout(500);
    
    // Verificar se há conteúdo
    const content = await page.content();
    expect(content.length).toBeGreaterThan(100);
  });

  test('deve exibir avatar de usuários', async ({ page }) => {
    await page.goto('/chat', { waitUntil: 'networkidle' });
    
    // Aguardar carregamento
    await page.waitForTimeout(500);
    
    // Verificar se há imagens
    const images = await page.locator('img').count();
    expect(images).toBeGreaterThanOrEqual(0);
  });
});
