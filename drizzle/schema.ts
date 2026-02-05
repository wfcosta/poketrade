import { 
  int, 
  mysqlEnum, 
  mysqlTable, 
  text, 
  timestamp, 
  varchar,
  decimal,
  boolean,
  json,
  datetime
} from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Pokémon Cards Table
 * Armazena todas as cartas cadastradas pelos usuários
 */
export const cards = mysqlTable("cards", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  
  name: varchar("name", { length: 255 }).notNull(),
  series: varchar("series", { length: 255 }).notNull(),
  cardNumber: varchar("cardNumber", { length: 50 }).notNull(),
  pokemonName: varchar("pokemonName", { length: 255 }),
  cardType: varchar("cardType", { length: 50 }),
  rarity: varchar("rarity", { length: 50 }),
  
  condition: mysqlEnum("condition", [
    "Mint",
    "Near Mint",
    "Excellent",
    "Very Good",
    "Good",
    "Lightly Played",
    "Moderately Played",
    "Heavily Played",
    "Poor"
  ]).notNull(),
  conditionScore: int("conditionScore").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  
  images: text("images"),
  
  status: mysqlEnum("status", [
    "active",
    "sold",
    "traded",
    "pending"
  ]).default("active").notNull(),
  
  acceptsTrade: boolean("acceptsTrade").default(false),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Card = typeof cards.$inferSelect;
export type InsertCard = typeof cards.$inferInsert;

/**
 * Transactions Table
 */
export const transactions = mysqlTable("transactions", {
  id: int("id").autoincrement().primaryKey(),
  buyerId: int("buyerId").notNull(),
  sellerId: int("sellerId").notNull(),
  cardId: int("cardId").notNull(),
  tradeCardId: int("tradeCardId"),
  
  type: mysqlEnum("type", ["sale", "trade"]).notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  tradeAmount: decimal("tradeAmount", { precision: 10, scale: 2 }),
  
  paymentMethod: mysqlEnum("paymentMethod", [
    "credit_card",
    "debit_card",
    "pix",
    "bank_transfer",
    "in_person"
  ]),
  paymentStatus: mysqlEnum("paymentStatus", [
    "pending",
    "processing",
    "completed",
    "failed",
    "refunded"
  ]).default("pending").notNull(),
  
  status: mysqlEnum("status", [
    "pending",
    "payment_confirmed",
    "shipped",
    "delivered",
    "completed",
    "cancelled",
    "disputed"
  ]).default("pending").notNull(),
  
  trackingCode: varchar("trackingCode", { length: 100 }),
  trackingUrl: text("trackingUrl"),
  sellerPhotos: text("sellerPhotos"),
  buyerPhotos: text("buyerPhotos"),
  notes: text("notes"),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  completedAt: timestamp("completedAt"),
});

export type Transaction = typeof transactions.$inferSelect;
export type InsertTransaction = typeof transactions.$inferInsert;

/**
 * Reviews Table
 */
export const reviews = mysqlTable("reviews", {
  id: int("id").autoincrement().primaryKey(),
  transactionId: int("transactionId").notNull(),
  fromUserId: int("fromUserId").notNull(),
  toUserId: int("toUserId").notNull(),
  
  rating: int("rating").notNull(),
  comment: text("comment"),
  cardConditionAccuracy: int("cardConditionAccuracy"),
  communicationRating: int("communicationRating"),
  shippingRating: int("shippingRating"),
  photos: text("photos"),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Review = typeof reviews.$inferSelect;
export type InsertReview = typeof reviews.$inferInsert;

/**
 * Chat Messages Table
 */
export const chatMessages = mysqlTable("chatMessages", {
  id: int("id").autoincrement().primaryKey(),
  transactionId: int("transactionId"),
  senderId: int("senderId").notNull(),
  recipientId: int("recipientId").notNull(),
  message: text("message").notNull(),
  attachments: text("attachments"),
  read: boolean("read").default(false),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ChatMessage = typeof chatMessages.$inferSelect;
export type InsertChatMessage = typeof chatMessages.$inferInsert;

/**
 * Notifications Table
 */
export const notifications = mysqlTable("notifications", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  
  type: mysqlEnum("type", [
    "new_offer",
    "offer_accepted",
    "offer_rejected",
    "payment_received",
    "item_shipped",
    "item_delivered",
    "review_received",
    "message_received",
    "trade_proposed",
    "trade_accepted",
    "trade_completed"
  ]).notNull(),
  
  title: varchar("title", { length: 255 }).notNull(),
  message: text("message"),
  relatedUserId: int("relatedUserId"),
  relatedTransactionId: int("relatedTransactionId"),
  read: boolean("read").default(false),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Notification = typeof notifications.$inferSelect;
export type InsertNotification = typeof notifications.$inferInsert;

/**
 * Wishlist Table
 */
export const wishlist = mysqlTable("wishlist", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  cardId: int("cardId"),
  pokemonName: varchar("pokemonName", { length: 255 }),
  series: varchar("series", { length: 255 }),
  cardNumber: varchar("cardNumber", { length: 50 }),
  priority: mysqlEnum("priority", ["low", "medium", "high"]).default("medium"),
  maxPrice: decimal("maxPrice", { precision: 10, scale: 2 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Wishlist = typeof wishlist.$inferSelect;
export type InsertWishlist = typeof wishlist.$inferInsert;

/**
 * Trade Proposals Table
 */
export const tradeProposals = mysqlTable("tradeProposals", {
  id: int("id").autoincrement().primaryKey(),
  proposerId: int("proposerId").notNull(),
  recipientId: int("recipientId").notNull(),
  proposerCardId: int("proposerCardId").notNull(),
  recipientCardId: int("recipientCardId").notNull(),
  
  status: mysqlEnum("status", [
    "pending",
    "accepted",
    "rejected",
    "cancelled",
    "completed"
  ]).default("pending").notNull(),
  
  message: text("message"),
  meetingLocation: varchar("meetingLocation", { length: 255 }),
  meetingDate: datetime("meetingDate"),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  respondedAt: timestamp("respondedAt"),
});

export type TradeProposal = typeof tradeProposals.$inferSelect;
export type InsertTradeProposal = typeof tradeProposals.$inferInsert;

/**
 * Disputes Table
 */
export const disputes = mysqlTable("disputes", {
  id: int("id").autoincrement().primaryKey(),
  transactionId: int("transactionId").notNull(),
  reportedByUserId: int("reportedByUserId").notNull(),
  reportedUserId: int("reportedUserId").notNull(),
  
  reason: varchar("reason", { length: 255 }).notNull(),
  description: text("description"),
  evidence: text("evidence"),
  
  status: mysqlEnum("status", [
    "open",
    "under_review",
    "resolved",
    "closed"
  ]).default("open").notNull(),
  
  resolution: text("resolution"),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  resolvedAt: timestamp("resolvedAt"),
});

export type Dispute = typeof disputes.$inferSelect;
export type InsertDispute = typeof disputes.$inferInsert;