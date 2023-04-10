import mongoStore from 'connect-mongo'
import dotenv from "dotenv"

dotenv.config()
export const URImongo = process.env.MONGOCONNECT;

const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }

const sessionMongo =  {
    store: mongoStore.create({
        mongoUrl: URImongo,
        mongoOptions: advancedOptions
    }),
    secret: 'shhhhhh',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000
    },
    rolling: true
}

export { sessionMongo }