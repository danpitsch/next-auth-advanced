import { eq, sql } from 'drizzle-orm'
import {
	db,
	twoFactorTokens,
	verificationTokens,
	passwordResetTokens,
} from '@/db'

import { getVerificationTokenByEmail } from '@/data/verification-token'
import { getPasswordResetTokenByEmail } from '@/data/password-reset-token'
import { getTwoFactorTokenByEmail } from '@/data/two-factor-token'

import crypto from 'crypto'
import { v4 as uuidv4 } from 'uuid'

export const generateTwoFactorToken = async (email: string) => {
	const token = crypto.randomInt(100_000, 1_000_000).toString()
	const expires = new Date(new Date().getTime() + 5 * 60 * 1000)

	const existingTwoFactorToken = await getTwoFactorTokenByEmail(email)

	if (existingTwoFactorToken) {
		await db.delete(twoFactorTokens).where(sql`"id" = ${existingTwoFactorToken.id}`)
	}

	const twoFactorToken = await db
		.insert(twoFactorTokens)
		.values({
			email: twoFactorTokens.email,
			token: twoFactorTokens.token,
			expires: twoFactorTokens.expires,
		})
    .returning();

	return twoFactorToken[0];
}

export const generateVerificationToken = async (email: string) => {
	const token = uuidv4()
	const expires = new Date(new Date().getTime() + 3600 * 1000)
	console.log('/lib/tokens.ts: generateVerificationToken() email: ', email)
	console.log('/lib/tokens.ts: generateVerificationToken() token: ', token)
	console.log('/lib/tokens.ts: generateVerificationToken() expires: ', expires)

	const existingVerificationToken = await getVerificationTokenByEmail(email)

	console.log('/lib/tokens.ts: generateVerificationToken: existingVerificationToken', existingVerificationToken)

	if (existingVerificationToken) {
		await db
			.delete(verificationTokens)
			.where(sql`"identifier" = ${existingVerificationToken.identifier}`)
	}

	const verificationToken = await db
		.insert(verificationTokens)
		.values({
			email: email,
			token: token,
			expires: expires,
		})
		.returning({
			email: verificationTokens.email,
			token: verificationTokens.token,
			expires: verificationTokens.expires,
		})
	console.log(
		'/lib/tokens.ts: generateVerificationToken: verificationToken',
		verificationToken
	)

	return verificationToken[0];
}

export const generateResetPasswordToken = async (email: string) => {
	const token = uuidv4()
	const expires = new Date(new Date().getTime() + 3600 * 1000)

	const existingResetToken = await getPasswordResetTokenByEmail(email)

	if (existingResetToken) {
		await db.delete(passwordResetTokens).where(sql`"id" = ${existingResetToken.id}`)
	}

	const passwordResetToken = await db.insert(passwordResetTokens)
    .values({
      email: email,
      token: token,
      expires: expires,
    })
    .returning();

	return passwordResetToken[0];
}
