import mongoose from 'mongoose';

export default async function connectToDatabase() {

    try{
        let DB = '';
        if(process.env.DATABASE_URL && process.env.DATABASE_PASSWORD){
             DB = process.env.DATABASE_URL.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)
        }

        mongoose.set('strictQuery', true)
        const res = await mongoose.connect(DB)
        
        console.log('MongoDB connection successful')
        return res
    } catch(err){
        console.log('Failed to connect to database')
    }

    
    }