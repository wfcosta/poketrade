import { test as base, expect } from '@playwright/test';

export const test = base.extend({
  authenticatedPage: async ({ page }, use) => {
    // Navegar para a página de login
    await page.goto('/');
    
    // Preencher credenciais de teste
    await page.fill('input[name="email"]', 'user@example.com');
    await page.fill('input[name="password"]', '123456');
    
    // Clicar em entrar
    await page.click('button:has-text("Entrar")');
    
    // Aguardar redirecionamento
    await page.waitForURL('**/');
    
    // Usar a página autenticada
    await use(page);
  },
});

export { expect };
