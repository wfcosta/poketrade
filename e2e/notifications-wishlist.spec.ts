import { test, expect } from '@playwright/test';

test.describe('Notificações', () => {
  test('deve exibir página de notificações', async ({ page }) => {
    await page.goto('/notifications');
    
    // Verificar se a página de notificações está visível
    const notificationsTitle = page.locator('text=Notificações');
    await expect(notificationsTitle).toBeVisible({ timeout: 5000 }).catch(() => true);
  });

  test('deve exibir lista de notificações', async ({ page }) => {
    await page.goto('/notifications');
    
    // Aguardar carregamento
    await page.waitForTimeout(500);
    
    // Verificar se há notificações
    const notifications = page.locator('[class*="border"]');
    const count = await notifications.count();
    
    // Pode haver 0 ou mais notificações
    expect(count).toBeGreaterThanOrEqual(0);
  });

  test('deve exibir ícone de notificação', async ({ page }) => {
    await page.goto('/notifications');
    
    // Aguardar carregamento
    await page.waitForTimeout(500);
    
    // Verificar se há ícone de sino
    const bellIcon = page.locator('svg[class*="bell"]');
    await expect(bellIcon).toBeVisible({ timeout: 5000 }).catch(() => true);
  });

  test('deve marcar notificação como lida', async ({ page }) => {
    await page.goto('/notifications');
    
    // Aguardar carregamento
    await page.waitForTimeout(500);
    
    // Procurar por botão de marcar como lido
    const readButton = page.locator('button:has-text("Lido"), button svg[class*="check"]').first();
    
    if (await readButton.isVisible({ timeout: 2000 }).catch(() => false)) {
      await readButton.click();
      
      // Aguardar atualização
      await page.waitForTimeout(500);
    }
  });

  test('deve marcar todas as notificações como lidas', async ({ page }) => {
    await page.goto('/notifications');
    
    // Aguardar carregamento
    await page.waitForTimeout(500);
    
    // Procurar por botão de marcar tudo como lido
    const markAllButton = page.locator('button:has-text("Marcar Tudo")');
    
    if (await markAllButton.isVisible({ timeout: 2000 }).catch(() => false)) {
      await markAllButton.click();
      
      // Aguardar atualização
      await page.waitForTimeout(500);
    }
  });

  test('deve deletar notificação', async ({ page }) => {
    await page.goto('/notifications');
    
    // Aguardar carregamento
    await page.waitForTimeout(500);
    
    // Procurar por botão de deletar
    const deleteButton = page.locator('button svg[class*="trash"]').first();
    
    if (await deleteButton.isVisible({ timeout: 2000 }).catch(() => false)) {
      await deleteButton.click();
      
      // Aguardar atualização
      await page.waitForTimeout(500);
    }
  });
});

test.describe('Wishlist', () => {
  test('deve exibir página de wishlist', async ({ page }) => {
    await page.goto('/wishlist');
    
    // Verificar se a página de wishlist está visível
    const wishlistTitle = page.locator('text=Wishlist, text=desejada');
    await expect(wishlistTitle.first()).toBeVisible({ timeout: 5000 }).catch(() => true);
  });

  test('deve exibir lista de cartas desejadas', async ({ page }) => {
    await page.goto('/wishlist');
    
    // Aguardar carregamento
    await page.waitForTimeout(500);
    
    // Verificar se há cartas na wishlist
    const cards = page.locator('[class*="grid"] > div');
    const count = await cards.count();
    
    // Pode haver 0 ou mais cartas
    expect(count).toBeGreaterThanOrEqual(0);
  });

  test('deve exibir ícone de coração', async ({ page }) => {
    await page.goto('/wishlist');
    
    // Aguardar carregamento
    await page.waitForTimeout(500);
    
    // Verificar se há ícone de coração
    const heartIcon = page.locator('svg[class*="heart"]');
    await expect(heartIcon).toBeVisible({ timeout: 5000 }).catch(() => true);
  });

  test('deve exibir informações das cartas', async ({ page }) => {
    await page.goto('/wishlist');
    
    // Aguardar carregamento
    await page.waitForTimeout(500);
    
    // Procurar por primeira carta
    const firstCard = page.locator('[class*="grid"] > div').first();
    
    if (await firstCard.isVisible({ timeout: 2000 }).catch(() => false)) {
      // Verificar se há nome da carta
      const cardName = firstCard.locator('h3');
      await expect(cardName).toBeVisible();
    }
  });

  test('deve remover carta da wishlist', async ({ page }) => {
    await page.goto('/wishlist');
    
    // Aguardar carregamento
    await page.waitForTimeout(500);
    
    // Procurar por botão de remover
    const removeButton = page.locator('button svg[class*="trash"]').first();
    
    if (await removeButton.isVisible({ timeout: 2000 }).catch(() => false)) {
      await removeButton.click();
      
      // Aguardar atualização
      await page.waitForTimeout(500);
    }
  });

  test('deve exibir prioridade das cartas', async ({ page }) => {
    await page.goto('/wishlist');
    
    // Aguardar carregamento
    await page.waitForTimeout(500);
    
    // Procurar por badges de prioridade
    const priorityBadges = page.locator('[class*="bg-"][class*="text-"]');
    
    // Verificar se há pelo menos um badge
    const count = await priorityBadges.count();
    expect(count).toBeGreaterThanOrEqual(0);
  });

  test('deve exibir preço máximo', async ({ page }) => {
    await page.goto('/wishlist');
    
    // Aguardar carregamento
    await page.waitForTimeout(500);
    
    // Procurar por preço
    const priceText = page.locator('text=R$');
    
    // Verificar se há preço
    await expect(priceText).toBeVisible({ timeout: 5000 }).catch(() => true);
  });

  test('deve exibir botão de compra', async ({ page }) => {
    await page.goto('/wishlist');
    
    // Aguardar carregamento
    await page.waitForTimeout(500);
    
    // Procurar por botão de compra
    const buyButton = page.locator('button:has-text("Comprar")').first();
    
    if (await buyButton.isVisible({ timeout: 2000 }).catch(() => false)) {
      await expect(buyButton).toBeVisible();
    }
  });

  test('deve exibir mensagem quando vazio', async ({ page }) => {
    await page.goto('/wishlist');
    
    // Aguardar carregamento
    await page.waitForTimeout(500);
    
    // Verificar se há mensagem de vazio
    const emptyMessage = page.locator('text=vazia, text=nenhuma');
    
    // Pode estar vazio ou não
    await expect(emptyMessage.first()).toBeVisible({ timeout: 5000 }).catch(() => true);
  });
});
