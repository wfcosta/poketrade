import { eq, and, or, desc, asc, like, gte, lte } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { 
  InsertUser, 
  users,
  cards,
  transactions,
  reviews,
  chatMessages,
  notifications,
  wishlist,
  tradeProposals,
  disputes,
  type Card,
  type Transaction,
  type Review,
  type ChatMessage,
  type Notification,
  type Wishlist,
  type TradeProposal,
  type Dispute
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

/**
 * Card Queries
 */
export async function getCardById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(cards).where(eq(cards.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getCardsByUserId(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(cards).where(eq(cards.userId, userId));
}

export async function getActiveCards(limit = 50, offset = 0) {
  const db = await getDb();
  if (!db) return [];
  return await db
    .select()
    .from(cards)
    .where(eq(cards.status, "active"))
    .orderBy(desc(cards.createdAt))
    .limit(limit)
    .offset(offset);
}

export async function searchCards(query: string, limit = 50) {
  const db = await getDb();
  if (!db) return [];
  return await db
    .select()
    .from(cards)
    .where(
      and(
        eq(cards.status, "active"),
        or(
          like(cards.name, `%${query}%`),
          like(cards.pokemonName, `%${query}%`),
          like(cards.series, `%${query}%`)
        )
      )
    )
    .orderBy(desc(cards.createdAt))
    .limit(limit);
}

export async function filterCards(filters: {
  minPrice?: number | string;
  maxPrice?: number | string;
  condition?: string;
  series?: string;
  acceptsTrade?: boolean;
  limit?: number;
  offset?: number;
}) {
  const db = await getDb();
  if (!db) return [];
  
  const { minPrice, maxPrice, condition, series, acceptsTrade, limit = 50, offset = 0 } = filters;
  const conditions: any[] = [eq(cards.status, "active")];
  
  if (minPrice !== undefined) conditions.push(gte(cards.price as any, minPrice));
  if (maxPrice !== undefined) conditions.push(lte(cards.price as any, maxPrice));
  if (condition) conditions.push(eq(cards.condition as any, condition));
  if (series) conditions.push(like(cards.series, `%${series}%`));
  if (acceptsTrade !== undefined) conditions.push(eq(cards.acceptsTrade, acceptsTrade));

  return await db
    .select()
    .from(cards)
    .where(and(...conditions))
    .orderBy(desc(cards.createdAt))
    .limit(limit)
    .offset(offset);
}

export async function createCard(data: {
  userId: number;
  name: string;
  series: string;
  cardNumber: string;
  pokemonName?: string;
  cardType?: string;
  rarity?: string;
  condition: string;
  conditionScore: number;
  price: number | string;
  images?: string;
  acceptsTrade?: boolean;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(cards).values(data as any);
  // Return the created card by fetching it
  const result = await db.select().from(cards).orderBy(desc(cards.createdAt)).limit(1);
  return Array.isArray(result) && result.length > 0 ? result[0] : undefined;
}

export async function updateCard(id: number, data: Partial<Card>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(cards).set(data).where(eq(cards.id, id));
  return getCardById(id);
}

/**
 * Transaction Queries
 */
export async function getTransactionById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(transactions).where(eq(transactions.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getUserTransactions(userId: number, limit = 50, offset = 0) {
  const db = await getDb();
  if (!db) return [];
  return await db
    .select()
    .from(transactions)
    .where(
      or(
        eq(transactions.buyerId, userId),
        eq(transactions.sellerId, userId)
      )
    )
    .orderBy(desc(transactions.createdAt))
    .limit(limit)
    .offset(offset);
}

export async function createTransaction(data: {
  buyerId: number;
  sellerId: number;
  cardId: number;
  tradeCardId?: number;
  type: "sale" | "trade";
  amount: number | string;
  tradeAmount?: number | string;
  paymentMethod?: string;
  paymentStatus?: string;
  status?: string;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(transactions).values(data as any);
  const result = await db.select().from(transactions).orderBy(desc(transactions.createdAt)).limit(1);
  return Array.isArray(result) && result.length > 0 ? result[0] : undefined;
}

export async function updateTransaction(id: number, data: Partial<Transaction>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(transactions).set(data).where(eq(transactions.id, id));
  return getTransactionById(id);
}

/**
 * Review Queries
 */
export async function getReviewsByUserId(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return await db
    .select()
    .from(reviews)
    .where(eq(reviews.toUserId, userId))
    .orderBy(desc(reviews.createdAt));
}

export async function createReview(data: {
  transactionId: number;
  fromUserId: number;
  toUserId: number;
  rating: number;
  comment?: string;
  cardConditionAccuracy?: number;
  communicationRating?: number;
  shippingRating?: number;
  photos?: string;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(reviews).values(data as any);
  const result = await db.select().from(reviews).orderBy(desc(reviews.createdAt)).limit(1);
  return Array.isArray(result) && result.length > 0 ? result[0] : undefined;
}

/**
 * Chat Message Queries
 */
export async function getChatMessages(userId1: number, userId2: number, limit = 50) {
  const db = await getDb();
  if (!db) return [];
  return await db
    .select()
    .from(chatMessages)
    .where(
      or(
        and(eq(chatMessages.senderId, userId1), eq(chatMessages.recipientId, userId2)),
        and(eq(chatMessages.senderId, userId2), eq(chatMessages.recipientId, userId1))
      )
    )
    .orderBy(desc(chatMessages.createdAt))
    .limit(limit);
}

export async function createChatMessage(data: {
  transactionId?: number;
  senderId: number;
  recipientId: number;
  message: string;
  attachments?: string;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(chatMessages).values(data as any);
  const result = await db.select().from(chatMessages).orderBy(desc(chatMessages.createdAt)).limit(1);
  return Array.isArray(result) && result.length > 0 ? result[0] : undefined;
}

export async function markChatMessagesAsRead(senderId: number, recipientId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db
    .update(chatMessages)
    .set({ read: true })
    .where(
      and(
        eq(chatMessages.senderId, senderId),
        eq(chatMessages.recipientId, recipientId),
        eq(chatMessages.read, false)
      )
    );
}

/**
 * Notification Queries
 */
export async function getUserNotifications(userId: number, limit = 50) {
  const db = await getDb();
  if (!db) return [];
  return await db
    .select()
    .from(notifications)
    .where(eq(notifications.userId, userId))
    .orderBy(desc(notifications.createdAt))
    .limit(limit);
}

export async function createNotification(data: {
  userId: number;
  type: string;
  title: string;
  message?: string;
  relatedUserId?: number;
  relatedTransactionId?: number;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(notifications).values(data as any);
  const result = await db.select().from(notifications).orderBy(desc(notifications.createdAt)).limit(1);
  return Array.isArray(result) && result.length > 0 ? result[0] : undefined;
}

export async function markNotificationAsRead(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(notifications).set({ read: true }).where(eq(notifications.id, id));
  const result = await db.select().from(notifications).where(eq(notifications.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function markAllNotificationsAsRead(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db
    .update(notifications)
    .set({ read: true })
    .where(and(eq(notifications.userId, userId), eq(notifications.read, false)));
}

/**
 * Wishlist Queries
 */
export async function getUserWishlist(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return await db
    .select()
    .from(wishlist)
    .where(eq(wishlist.userId, userId))
    .orderBy(desc(wishlist.createdAt));
}

export async function addToWishlist(data: {
  userId: number;
  cardId?: number;
  pokemonName?: string;
  series?: string;
  cardNumber?: string;
  priority?: string;
  maxPrice?: number | string;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(wishlist).values(data as any);
  const result = await db.select().from(wishlist).orderBy(desc(wishlist.createdAt)).limit(1);
  return Array.isArray(result) && result.length > 0 ? result[0] : undefined;
}

export async function removeFromWishlist(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.delete(wishlist).where(eq(wishlist.id, id));
}

/**
 * Trade Proposal Queries
 */
export async function getTradeProposalById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(tradeProposals).where(eq(tradeProposals.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getUserTradeProposals(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return await db
    .select()
    .from(tradeProposals)
    .where(
      or(
        eq(tradeProposals.proposerId, userId),
        eq(tradeProposals.recipientId, userId)
      )
    )
    .orderBy(desc(tradeProposals.createdAt));
}

export async function createTradeProposal(data: {
  proposerId: number;
  recipientId: number;
  proposerCardId: number;
  recipientCardId: number;
  message?: string;
  meetingLocation?: string;
  meetingDate?: Date;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(tradeProposals).values(data as any);
  const result = await db.select().from(tradeProposals).orderBy(desc(tradeProposals.createdAt)).limit(1);
  return Array.isArray(result) && result.length > 0 ? result[0] : undefined;
}

export async function updateTradeProposal(id: number, data: Partial<TradeProposal>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(tradeProposals).set(data).where(eq(tradeProposals.id, id));
  return getTradeProposalById(id);
}

/**
 * Dispute Queries
 */
export async function getDisputeById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(disputes).where(eq(disputes.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createDispute(data: {
  transactionId: number;
  reportedByUserId: number;
  reportedUserId: number;
  reason: string;
  description?: string;
  evidence?: string;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(disputes).values(data as any);
  const result = await db.select().from(disputes).orderBy(desc(disputes.createdAt)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function updateDispute(id: number, data: Partial<Dispute>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(disputes).set(data).where(eq(disputes.id, id));
  return getDisputeById(id);
}
