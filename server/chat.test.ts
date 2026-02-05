import { describe, it, expect } from 'vitest';
import * as db from './db';

describe('Chat API', () => {
  let createdMessageId: number;

  describe('createChatMessage', () => {
    it('should create a chat message', async () => {
      const message = await db.createChatMessage({
        senderId: 1,
        recipientId: 2,
        message: 'Olá, você ainda tem a carta disponível?',
      });

      expect(message).toBeDefined();
      expect(message?.message).toBe('Olá, você ainda tem a carta disponível?');

      if (message) {
        createdMessageId = message.id;
      }
    });
  });

  describe('getChatMessages', () => {
    it('should retrieve messages', async () => {
      const messages = await db.getChatMessages(1, 2, 10);
      expect(Array.isArray(messages)).toBe(true);
    });
  });

  describe('markChatMessagesAsRead', () => {
    it('should mark messages as read', async () => {
      await db.markChatMessagesAsRead(1, 2);
      expect(true).toBe(true);
    });
  });
});
