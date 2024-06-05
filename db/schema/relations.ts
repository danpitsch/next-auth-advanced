import { relations } from "drizzle-orm/relations";
import { User} from "./User";
import { UserRole} from "./UserRole";
import { Account } from "./Account";
import { TwoFactorConfirmation } from "./TwoFactorConfirmation";

export const AccountRelations = relations(Account, ({one}) => ({
	User: one(User, {
		fields: [Account.userId],
		references: [User.id]
	}),
}));

export const UserRelations = relations(User, ({many}) => ({ 
	Accounts: many(Account),
	TwoFactorConfirmations: many(TwoFactorConfirmation),
}));

export const TwoFactorConfirmationRelations = relations(TwoFactorConfirmation, ({one}) => ({
	User: one(User, {
		fields: [TwoFactorConfirmation.userId],
		references: [User.id]
	}),
}));