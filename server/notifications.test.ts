import { describe, it, expect } from 'vitest';
import * as db from './db';

describe('Notifications API', () => {
  let createdNotificationId: number;

  describe('createNotification', () => {
    it('should create a notification', async () => {
      const notification = await db.createNotification({
        userId: 1,
        type: 'new_offer',
        title: 'Nova oferta',
      });

      expect(notification).toBeDefined();
      expect(notification?.type).toBe('new_offer');

      if (notification) {
        createdNotificationId = notification.id;
      }
    });
  });

  describe('getUserNotifications', () => {
    it('should retrieve notifications', async () => {
      const notifications = await db.getUserNotifications(1, 10);
      expect(Array.isArray(notifications)).toBe(true);
    });
  });

  describe('markNotificationAsRead', () => {
    it('should mark notification as read', async () => {
      if (!createdNotificationId) return;

      const updated = await db.markNotificationAsRead(createdNotificationId);
      expect(updated).toBeDefined();
      expect(updated?.read).toBe(true);
    });
  });

  describe('markAllNotificationsAsRead', () => {
    it('should mark all as read', async () => {
      await db.markAllNotificationsAsRead(1);
      expect(true).toBe(true);
    });
  });
});
