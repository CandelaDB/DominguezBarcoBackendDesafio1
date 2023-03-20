import mongoose from 'mongoose';
import dotenv from 'dotenv';
import logger from './Logger.js';

dotenv.config();

const MONGO = process.env.MONGO;

const connectMongo = async () => {
	try {
		mongoose.set('strictQuery', false);
		mongoose.connect(MONGO, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		logger.info('MongoDb Connected');
	} catch (error) {
		logger.error('Error connecting to database', error);
	}
};

export default connectMongo;
