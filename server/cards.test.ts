import { describe, it, expect } from 'vitest';
import * as db from './db';

describe('Cards API', () => {
  let createdCardId: number;

  describe('createCard', () => {
    it('should create a new card', async () => {
      const card = await db.createCard({
        userId: 1,
        name: 'Charizard EX',
        series: 'Base Set',
        cardNumber: '4/102',
        condition: 'Mint',
        conditionScore: 10,
        price: 1500,
      });

      expect(card).toBeDefined();
      expect(card?.name).toBe('Charizard EX');

      if (card) {
        createdCardId = card.id;
      }
    });
  });

  describe('getCardById', () => {
    it('should retrieve a card', async () => {
      if (!createdCardId) return;
      const card = await db.getCardById(createdCardId);
      expect(card).toBeDefined();
    });
  });

  describe('getCardsByUserId', () => {
    it('should retrieve cards by user', async () => {
      const cards = await db.getCardsByUserId(1);
      expect(Array.isArray(cards)).toBe(true);
    });
  });

  describe('getActiveCards', () => {
    it('should retrieve active cards', async () => {
      const cards = await db.getActiveCards(10, 0);
      expect(Array.isArray(cards)).toBe(true);
    });
  });

  describe('searchCards', () => {
    it('should search cards', async () => {
      const results = await db.searchCards('Charizard', 10);
      expect(Array.isArray(results)).toBe(true);
    });
  });

  describe('updateCard', () => {
    it('should update a card', async () => {
      if (!createdCardId) return;

      const updated = await db.updateCard(createdCardId, {
        price: 2000,
      });

      expect(updated).toBeDefined();
    });
  });

  describe('filterCards', () => {
    it('should filter cards', async () => {
      const cards = await db.filterCards({
        minPrice: 1000,
        maxPrice: 5000,
      });

      expect(Array.isArray(cards)).toBe(true);
    });
  });
});
