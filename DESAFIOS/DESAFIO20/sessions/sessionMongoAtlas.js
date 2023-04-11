import mongoStore from 'koa-session-mongo'
import MongooseStore from 'koa-session-mongoose'
import dotenv from "dotenv"


dotenv.config()
export const URImongo = process.env.MONGOCONNECT;


const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }

const sessionMongo =  new MongooseStore({
    store: mongoStore.create({
        mongoUrl: URImongo,
        db: 'ecommerce',
        mongoOptions: advancedOptions
    }),
    secret: 'shhhhhh',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000
    },
    rolling: true
})


export { sessionMongo }

