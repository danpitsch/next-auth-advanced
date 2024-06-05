CREATE TABLE `Account` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`type` text NOT NULL,
	`provider` text NOT NULL,
	`providerAccountId` text NOT NULL,
	`refresh_token` text,
	`access_token` text,
	`expires_at` integer,
	`token_type` text,
	`scope` text,
	`id_token` text,
	`session_state` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT UPDATE_TIMESTAMP NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `PasswordResetToken` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`token` text NOT NULL,
	`expires` numeric NOT NULL
);
--> statement-breakpoint
CREATE TABLE `TwoFactorConfirmation` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `TwoFactorToken` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`token` text NOT NULL,
	`expires` numeric NOT NULL
);
--> statement-breakpoint
CREATE TABLE `Users` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text,
	`email` text NOT NULL,
	`emailVerified` numeric,
	`password` text,
	`role` text DEFAULT 'USER' NOT NULL,
	`isTwoFactorEnabled` numeric NOT NULL,
	`image` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT UPDATE_TIMESTAMP NOT NULL,
	FOREIGN KEY (`role`) REFERENCES `UserRole`(`name`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `UserRole` (
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `VerificationToken` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`token` text NOT NULL,
	`expires` numeric NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `Account_provider_providerAccountId_key` ON `Account` (`provider`,`providerAccountId`);--> statement-breakpoint
CREATE UNIQUE INDEX `PasswordResetToken_email_token_key` ON `PasswordResetToken` (`email`,`token`);--> statement-breakpoint
CREATE UNIQUE INDEX `PasswordResetToken_token_key` ON `PasswordResetToken` (`token`);--> statement-breakpoint
CREATE UNIQUE INDEX `TwoFactorConfirmation_userId_key` ON `TwoFactorConfirmation` (`userId`);--> statement-breakpoint
CREATE UNIQUE INDEX `TwoFactorToken_email_token_key` ON `TwoFactorToken` (`email`,`token`);--> statement-breakpoint
CREATE UNIQUE INDEX `TwoFactorToken_token_key` ON `TwoFactorToken` (`token`);--> statement-breakpoint
CREATE UNIQUE INDEX `Users_email_unique` ON `Users` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `User_email_key` ON `Users` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `UserRole_name_key` ON `UserRole` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `VerificationToken_email_token_key` ON `VerificationToken` (`email`,`token`);--> statement-breakpoint
CREATE UNIQUE INDEX `VerificationToken_token_key` ON `VerificationToken` (`token`);