import express from 'express';
import 'reflect-metadata';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import * as dotenv from 'dotenv';
dotenv.config();

import { AppDataSource } from '@/shared/db/pg.data-source';
import UserRouter from '@/api/users/user.router';
import AuthRouter from '@/api/auth/auth.router';
import OrderRouter from '@/api/orders/order.router';
import CartRouter from '@/api/carts/carts.router';
import ReviewRouter from '@/api/reviews/review.router';
import ProductRouter from '@/api/products/product.router';
import { errorMiddleware } from '@/middlewares/error.middleware';
import corsMiddleware from './middlewares/cors.middleware';

// Express app setup:
const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);

// Middlewares (before routes):
app.use(
	process.env.NODE_ENV === 'production'
		? cors({ origin: process.env.CLIENT_PROD_URL, credentials: true })
		: corsMiddleware
);
app.use(express.json());
app.use(cookieParser());

// Health check endpoint
app.get('/api/health', (req, res) => {
	res.status(200).json({ 
		status: 'ok', 
		timestamp: new Date().toISOString(),
		database: AppDataSource.isInitialized ? 'connected' : 'disconnected'
	});
});

// Routes:
app.use('/api/user', UserRouter);
app.use('/api/auth', AuthRouter);
app.use('/api/order', OrderRouter);
app.use('/api/cart', CartRouter);
app.use('/api/review', ReviewRouter);
app.use('/api/product', ProductRouter);

// Middlewares (after routes):
app.use(errorMiddleware); // Every endpoint & middleware chain avaliable will eventually go to error middleware in case of exception thrown

//  !!!!!!!! npm run start:dev !!!!!!!!
// Initialize database connection first, then start server
AppDataSource.initialize()
	.then(() => {
		console.log('✅ Database is up and running');
		
		app.listen(PORT, '0.0.0.0', () => {
			console.log(`🚀 Server is running on port ${PORT}`);
		});
	})
	.catch((error) => {
		console.error(`❌ Error starting database connection -> ${error.message}`);
		process.exit(1);
	});
