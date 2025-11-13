import { Class, isNullish } from '@/shared/types/utils.types';
import type { JwtPayload } from '@/shared/types/utils.types';
import { User } from '../models/entities';
import jwt from 'jsonwebtoken';

/**
 * Helper class for transforming data from and to Postgres composite types
 */
export class PGDataTransformer {
    /**
     * Transforms data from Postgres composite type to a class instance (Embedded Entity)
     *
     * @template TEmbeddedEntity - Embedded Entity class type (e.g. Address, NameDetails, etc.)
     * @param toClass - class to transform data to
     * @returns - function that transforms data from Postgres composite type to a class instance
     */
    static fromPGCompositeType<TEmbeddedEntity extends object>(toClass: Class<TEmbeddedEntity>): (value: any) => any {
        const instance = new toClass();
        const fields = Object.keys(instance);

        return (dataFromPG: string) => {
            const values = dataFromPG.replace('(', '').replace(')', '').split(',');
            const result = fields.reduce((acc, field, index) => {
                if (!isNaN(parseFloat(values[index]))) {
                    acc[field] = parseFloat(values[index]);
                } else {
                    acc[field] = values[index] === '' ? null : values[index];
                }

                return acc;
            }, {} as any);
            return result as TEmbeddedEntity;
        };
    }

    /**
     * Transforms data from class instance (Embedded Entity) to Postgres composite type
     *
     * @template TEmbeddedEntity - Embedded Entity class type (e.g. Address, NameDetails, etc.)
     * @param fromClass - class to transform data from
     * @returns - function that transforms data from class instance to Postgres composite type
     */
    static toPGCompositeType<TEmbeddedEntity extends object>(
        fromClass: Class<TEmbeddedEntity>
    ): (value: TEmbeddedEntity) => string {
        return (data: TEmbeddedEntity) => {
            const fields = Object.keys(new fromClass());
            const values = fields.map((field) =>
                isNullish(data[field as keyof TEmbeddedEntity]) ? '' : String(data[field as keyof TEmbeddedEntity])
            );

            return `(${values.join(',')})`;
        };
    }
}

/**
 * Helper to convert time string (e.g., "7d", "15m") to milliseconds
 */
export class TimeHelper {
    /**
     * Converts time string to milliseconds
     * @param timeStr - Time string like "15m", "1h", "7d"
     * @returns milliseconds
     */
    static toMilliseconds(timeStr: string): number {
        const units: Record<string, number> = {
            ms: 1,
            s: 1000,
            m: 60 * 1000,
            h: 60 * 60 * 1000,
            d: 24 * 60 * 60 * 1000,
        };

        const match = timeStr.match(/^(\d+)([smhd]|ms)$/);
        if (!match) {
            throw new Error(`Invalid time format: ${timeStr}`);
        }

        const [, value, unit] = match;
        return parseInt(value, 10) * units[unit];
    }
}

export class JWTHelper {
    public static signAccessToken(userPayload: JwtPayload): string {
        return jwt.sign(
            { user_id: userPayload.user_id, username: userPayload.username, email: userPayload.email },
            process.env.JWT_SECRET!,
            {
                expiresIn: process.env.JWT_ACCESS_TOKEN_LENGTH || '15m',
            }
        );
    }

    public static signRefreshToken(userPayload: JwtPayload): string {
        return jwt.sign(
            { user_id: userPayload.user_id, username: userPayload.username, email: userPayload.email },
            process.env.REFRESH_TOKEN_SECRET || process.env.JWT_SECRET!,
            {
                expiresIn: process.env.JWT_REFRESH_TOKEN_LENGTH || '7d',
            }
        );
    }

    public static verifyToken(token: string): jwt.JwtPayload | string {
        return jwt.verify(token, process.env.JWT_SECRET!);
    }

    public static verifyRefreshToken(token: string): jwt.JwtPayload | string {
        return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET || process.env.JWT_SECRET!);
    }

    /**
     * Get refresh token maxAge in milliseconds
     */
    public static getRefreshTokenMaxAge(): number {
        const tokenLength = process.env.JWT_REFRESH_TOKEN_LENGTH || '7d';
        return TimeHelper.toMilliseconds(tokenLength);
    }
}