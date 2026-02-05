import { describe, it, expect } from 'vitest';
import * as db from './db';

describe('Transactions API', () => {
  let createdTransactionId: number;

  describe('createTransaction', () => {
    it('should create a sale transaction', async () => {
      const transaction = await db.createTransaction({
        buyerId: 1,
        sellerId: 2,
        cardId: 1,
        type: 'sale',
        amount: 1500,
        paymentStatus: 'pending',
        status: 'pending',
      });

      expect(transaction).toBeDefined();
      expect(transaction?.type).toBe('sale');

      if (transaction) {
        createdTransactionId = transaction.id;
      }
    });
  });

  describe('getTransactionById', () => {
    it('should retrieve a transaction', async () => {
      if (!createdTransactionId) return;
      const transaction = await db.getTransactionById(createdTransactionId);
      expect(transaction).toBeDefined();
    });
  });

  describe('getUserTransactions', () => {
    it('should retrieve transactions for a user', async () => {
      const transactions = await db.getUserTransactions(1, 10, 0);
      expect(Array.isArray(transactions)).toBe(true);
    });
  });

  describe('updateTransaction', () => {
    it('should update transaction status', async () => {
      if (!createdTransactionId) return;

      const updated = await db.updateTransaction(createdTransactionId, {
        status: 'payment_confirmed',
      });

      expect(updated).toBeDefined();
      expect(updated?.status).toBe('payment_confirmed');
    });
  });
});
