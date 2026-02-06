DROP TABLE `disputes`;--> statement-breakpoint
ALTER TABLE `users` DROP INDEX `users_openId_unique`;--> statement-breakpoint
ALTER TABLE `cards` MODIFY COLUMN `pokemonName` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `transactions` MODIFY COLUMN `paymentMethod` enum('pix','in_person') NOT NULL DEFAULT 'pix';--> statement-breakpoint
ALTER TABLE `transactions` MODIFY COLUMN `paymentStatus` enum('pending','payment_confirmed','completed','failed','refunded') NOT NULL DEFAULT 'pending';--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `name` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `email` varchar(320) NOT NULL;--> statement-breakpoint
ALTER TABLE `wishlist` MODIFY COLUMN `pokemonName` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `cards` ADD `imageUrl` text;--> statement-breakpoint
ALTER TABLE `tradeProposals` ADD `tradeType` enum('in_person','online') DEFAULT 'in_person' NOT NULL;--> statement-breakpoint
ALTER TABLE `transactions` ADD `pixProofUrl` text;--> statement-breakpoint
ALTER TABLE `users` ADD `passwordHash` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `city` varchar(255);--> statement-breakpoint
ALTER TABLE `users` ADD `state` varchar(2);--> statement-breakpoint
ALTER TABLE `users` ADD `totalSales` int DEFAULT 0;--> statement-breakpoint
ALTER TABLE `users` ADD `totalPurchases` int DEFAULT 0;--> statement-breakpoint
ALTER TABLE `users` ADD `averageRating` decimal(3,2) DEFAULT 5;--> statement-breakpoint
ALTER TABLE `users` ADD `balance` decimal(12,2) DEFAULT 0;--> statement-breakpoint
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_transactionId_unique` UNIQUE(`transactionId`);--> statement-breakpoint
ALTER TABLE `users` ADD CONSTRAINT `users_email_unique` UNIQUE(`email`);--> statement-breakpoint
ALTER TABLE `cards` DROP COLUMN `images`;--> statement-breakpoint
ALTER TABLE `chatMessages` DROP COLUMN `transactionId`;--> statement-breakpoint
ALTER TABLE `chatMessages` DROP COLUMN `attachments`;--> statement-breakpoint
ALTER TABLE `notifications` DROP COLUMN `relatedUserId`;--> statement-breakpoint
ALTER TABLE `reviews` DROP COLUMN `cardConditionAccuracy`;--> statement-breakpoint
ALTER TABLE `reviews` DROP COLUMN `communicationRating`;--> statement-breakpoint
ALTER TABLE `reviews` DROP COLUMN `shippingRating`;--> statement-breakpoint
ALTER TABLE `reviews` DROP COLUMN `photos`;--> statement-breakpoint
ALTER TABLE `reviews` DROP COLUMN `updatedAt`;--> statement-breakpoint
ALTER TABLE `transactions` DROP COLUMN `tradeCardId`;--> statement-breakpoint
ALTER TABLE `transactions` DROP COLUMN `tradeAmount`;--> statement-breakpoint
ALTER TABLE `transactions` DROP COLUMN `trackingUrl`;--> statement-breakpoint
ALTER TABLE `transactions` DROP COLUMN `sellerPhotos`;--> statement-breakpoint
ALTER TABLE `transactions` DROP COLUMN `buyerPhotos`;--> statement-breakpoint
ALTER TABLE `transactions` DROP COLUMN `notes`;--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `openId`;--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `loginMethod`;--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `lastSignedIn`;--> statement-breakpoint
ALTER TABLE `wishlist` DROP COLUMN `cardId`;--> statement-breakpoint
ALTER TABLE `wishlist` DROP COLUMN `cardNumber`;