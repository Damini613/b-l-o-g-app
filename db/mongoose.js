const dotenv= require('dotenv')
const mongoose =require('mongoose')

dotenv.config()


const connectDB = async()=>{
    try {
      const resp = await  mongoose.connect(process.env.DATABASE_URL)
      console.log('mongo connected')
    } catch (error) {
        console.log(error)
    }

}

module.exports= connectDB




