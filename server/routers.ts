import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie("session", { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Cards API
  cards: router({
    list: publicProcedure.query(() => db.getActiveCards(50, 0)),
    
    search: publicProcedure
      .input(z.object({ query: z.string() }))
      .query(({ input }) => db.searchCards(input.query, 50)),
    
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(({ input }) => db.getCardById(input.id)),
    
    getByUser: protectedProcedure
      .query(({ ctx }) => db.getCardsByUserId(ctx.user.id)),
    
    create: protectedProcedure
      .input(z.object({
        name: z.string(),
        series: z.string(),
        cardNumber: z.string(),
        condition: z.string(),
        conditionScore: z.number(),
        price: z.number(),
        pokemonName: z.string().optional(),
        cardType: z.string().optional(),
        rarity: z.string().optional(),
        images: z.string().optional(),
        acceptsTrade: z.boolean().optional(),
      }))
      .mutation(({ ctx, input }) => 
        db.createCard({ userId: ctx.user.id, ...input })
      ),
  }),

  // Transactions API
  transactions: router({
    list: protectedProcedure
      .query(({ ctx }) => db.getUserTransactions(ctx.user.id, 50, 0)),
    
    getById: protectedProcedure
      .input(z.object({ id: z.number() }))
      .query(({ input }) => db.getTransactionById(input.id)),
    
    create: protectedProcedure
      .input(z.object({
        sellerId: z.number(),
        cardId: z.number(),
        type: z.enum(["sale", "trade"]),
        amount: z.number(),
        tradeCardId: z.number().optional(),
        paymentMethod: z.string().optional(),
      }))
      .mutation(({ ctx, input }) =>
        db.createTransaction({
          buyerId: ctx.user.id,
          ...input,
          paymentStatus: "pending",
          status: "pending",
        })
      ),
  }),

  // Reviews API
  reviews: router({
    getByUser: publicProcedure
      .input(z.object({ userId: z.number() }))
      .query(({ input }) => db.getReviewsByUserId(input.userId)),
    
    create: protectedProcedure
      .input(z.object({
        transactionId: z.number(),
        toUserId: z.number(),
        rating: z.number(),
        comment: z.string().optional(),
      }))
      .mutation(({ ctx, input }) =>
        db.createReview({
          fromUserId: ctx.user.id,
          ...input,
        })
      ),
  }),

  // Chat API
  chat: router({
    getMessages: protectedProcedure
      .input(z.object({ userId: z.number() }))
      .query(({ ctx, input }) => db.getChatMessages(ctx.user.id, input.userId, 50)),
    
    sendMessage: protectedProcedure
      .input(z.object({
        recipientId: z.number(),
        message: z.string(),
        transactionId: z.number().optional(),
      }))
      .mutation(({ ctx, input }) =>
        db.createChatMessage({
          senderId: ctx.user.id,
          ...input,
        })
      ),
  }),

  // Notifications API
  notifications: router({
    list: protectedProcedure
      .query(({ ctx }) => db.getUserNotifications(ctx.user.id, 50)),
    
    markAsRead: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(({ input }) => db.markNotificationAsRead(input.id)),
    
    markAllAsRead: protectedProcedure
      .mutation(({ ctx }) => db.markAllNotificationsAsRead(ctx.user.id)),
  }),

  // Wishlist API
  wishlist: router({
    list: protectedProcedure
      .query(({ ctx }) => db.getUserWishlist(ctx.user.id)),
    
    add: protectedProcedure
      .input(z.object({
        cardId: z.number().optional(),
        pokemonName: z.string().optional(),
        series: z.string().optional(),
        cardNumber: z.string().optional(),
        priority: z.string().optional(),
        maxPrice: z.number().optional(),
      }))
      .mutation(({ ctx, input }) =>
        db.addToWishlist({ userId: ctx.user.id, ...input })
      ),
    
    remove: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(({ input }) => db.removeFromWishlist(input.id)),
  }),

  // Trade Proposals API
  tradeProposals: router({
    list: protectedProcedure
      .query(({ ctx }) => db.getUserTradeProposals(ctx.user.id)),
    
    getById: protectedProcedure
      .input(z.object({ id: z.number() }))
      .query(({ input }) => db.getTradeProposalById(input.id)),
    
    create: protectedProcedure
      .input(z.object({
        recipientId: z.number(),
        proposerCardId: z.number(),
        recipientCardId: z.number(),
        message: z.string().optional(),
        meetingLocation: z.string().optional(),
      }))
      .mutation(({ ctx, input }) =>
        db.createTradeProposal({
          proposerId: ctx.user.id,
          ...input,
        })
      ),
    
    updateStatus: protectedProcedure
      .input(z.object({
        id: z.number(),
        status: z.string(),
      }))
      .mutation(({ input }) => 
        db.updateTradeProposal(input.id, { 
          status: input.status as any,
          respondedAt: new Date(),
        })
      ),
  }),
});

export type AppRouter = typeof appRouter;
