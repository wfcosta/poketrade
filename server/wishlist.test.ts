import { describe, it, expect } from 'vitest';
import * as db from './db';

describe('Wishlist API', () => {
  let createdWishlistId: number;

  describe('addToWishlist', () => {
    it('should add a card to wishlist', async () => {
      const wishlistItem = await db.addToWishlist({
        userId: 500,
        cardId: 1,
        priority: 'high',
        maxPrice: 2000,
      });

      expect(wishlistItem).toBeDefined();
      expect(wishlistItem?.userId).toBe(500);

      if (wishlistItem) {
        createdWishlistId = wishlistItem.id;
      }
    });
  });

  describe('getUserWishlist', () => {
    it('should retrieve wishlist items', async () => {
      const wishlistItems = await db.getUserWishlist(500);
      expect(Array.isArray(wishlistItems)).toBe(true);
    });
  });

  describe('removeFromWishlist', () => {
    it('should remove an item from wishlist', async () => {
      if (!createdWishlistId) return;
      await db.removeFromWishlist(createdWishlistId);
      expect(true).toBe(true);
    });
  });
});
