CREATE TABLE `cards` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`name` varchar(255) NOT NULL,
	`series` varchar(255) NOT NULL,
	`cardNumber` varchar(50) NOT NULL,
	`pokemonName` varchar(255),
	`cardType` varchar(50),
	`rarity` varchar(50),
	`condition` enum('Mint','Near Mint','Excellent','Very Good','Good','Lightly Played','Moderately Played','Heavily Played','Poor') NOT NULL,
	`conditionScore` int NOT NULL,
	`price` decimal(10,2) NOT NULL,
	`images` text,
	`status` enum('active','sold','traded','pending') NOT NULL DEFAULT 'active',
	`acceptsTrade` boolean DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `cards_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `chatMessages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`transactionId` int,
	`senderId` int NOT NULL,
	`recipientId` int NOT NULL,
	`message` text NOT NULL,
	`attachments` text,
	`read` boolean DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `chatMessages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `disputes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`transactionId` int NOT NULL,
	`reportedByUserId` int NOT NULL,
	`reportedUserId` int NOT NULL,
	`reason` varchar(255) NOT NULL,
	`description` text,
	`evidence` text,
	`status` enum('open','under_review','resolved','closed') NOT NULL DEFAULT 'open',
	`resolution` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`resolvedAt` timestamp,
	CONSTRAINT `disputes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `notifications` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`type` enum('new_offer','offer_accepted','offer_rejected','payment_received','item_shipped','item_delivered','review_received','message_received','trade_proposed','trade_accepted','trade_completed') NOT NULL,
	`title` varchar(255) NOT NULL,
	`message` text,
	`relatedUserId` int,
	`relatedTransactionId` int,
	`read` boolean DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `notifications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `reviews` (
	`id` int AUTO_INCREMENT NOT NULL,
	`transactionId` int NOT NULL,
	`fromUserId` int NOT NULL,
	`toUserId` int NOT NULL,
	`rating` int NOT NULL,
	`comment` text,
	`cardConditionAccuracy` int,
	`communicationRating` int,
	`shippingRating` int,
	`photos` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `reviews_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `tradeProposals` (
	`id` int AUTO_INCREMENT NOT NULL,
	`proposerId` int NOT NULL,
	`recipientId` int NOT NULL,
	`proposerCardId` int NOT NULL,
	`recipientCardId` int NOT NULL,
	`status` enum('pending','accepted','rejected','cancelled','completed') NOT NULL DEFAULT 'pending',
	`message` text,
	`meetingLocation` varchar(255),
	`meetingDate` datetime,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`respondedAt` timestamp,
	CONSTRAINT `tradeProposals_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `transactions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`buyerId` int NOT NULL,
	`sellerId` int NOT NULL,
	`cardId` int NOT NULL,
	`tradeCardId` int,
	`type` enum('sale','trade') NOT NULL,
	`amount` decimal(10,2) NOT NULL,
	`tradeAmount` decimal(10,2),
	`paymentMethod` enum('credit_card','debit_card','pix','bank_transfer','in_person'),
	`paymentStatus` enum('pending','processing','completed','failed','refunded') NOT NULL DEFAULT 'pending',
	`status` enum('pending','payment_confirmed','shipped','delivered','completed','cancelled','disputed') NOT NULL DEFAULT 'pending',
	`trackingCode` varchar(100),
	`trackingUrl` text,
	`sellerPhotos` text,
	`buyerPhotos` text,
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`completedAt` timestamp,
	CONSTRAINT `transactions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `wishlist` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`cardId` int,
	`pokemonName` varchar(255),
	`series` varchar(255),
	`cardNumber` varchar(50),
	`priority` enum('low','medium','high') DEFAULT 'medium',
	`maxPrice` decimal(10,2),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `wishlist_id` PRIMARY KEY(`id`)
);
