import { test, expect } from '@playwright/test';

test.describe('Autenticação', () => {
  test('deve exibir página de login', async ({ page }) => {
    await page.goto('/');
    
    // Verificar se a página de login está visível
    await expect(page.locator('text=Entrar')).toBeVisible();
    await expect(page.locator('text=PokéTrade')).toBeVisible();
  });

  test('deve preencher formulário de login', async ({ page }) => {
    await page.goto('/');
    
    // Preencher email
    const emailInput = page.locator('input[name="email"]');
    await emailInput.fill('user@example.com');
    await expect(emailInput).toHaveValue('user@example.com');
    
    // Preencher senha
    const passwordInput = page.locator('input[name="password"]');
    await passwordInput.fill('123456');
    await expect(passwordInput).toHaveValue('123456');
  });

  test('deve exibir botão de login', async ({ page }) => {
    await page.goto('/');
    
    // Verificar se o botão de login existe
    const loginButton = page.locator('button:has-text("Entrar")');
    await expect(loginButton).toBeVisible();
    await expect(loginButton).toBeEnabled();
  });

  test('deve exibir link de cadastro', async ({ page }) => {
    await page.goto('/');
    
    // Verificar se o link de cadastro existe
    const signupLink = page.locator('text=Cadastre-se');
    await expect(signupLink).toBeVisible();
  });

  test('deve exibir contas de demo', async ({ page }) => {
    await page.goto('/');
    
    // Verificar se as contas de demo estão visíveis
    const demoAccounts = page.locator('text=Contas de Demo');
    await expect(demoAccounts).toBeVisible();
    
    // Verificar se há pelo menos uma conta de demo
    const demoAccount = page.locator('text=user@example.com');
    await expect(demoAccount).toBeVisible();
  });

  test('deve validar campos obrigatórios', async ({ page }) => {
    await page.goto('/');
    
    // Tentar enviar formulário vazio
    const loginButton = page.locator('button:has-text("Entrar")');
    
    // Verificar se os campos têm validação HTML5
    const emailInput = page.locator('input[name="email"]');
    const isRequired = await emailInput.evaluate((el: HTMLInputElement) => el.required);
    expect(isRequired).toBe(true);
  });
});
