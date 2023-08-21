import mongoose from "mongoose"

const URI="mongodb+srv://lufagotti:7117lucia868@cluster0.n5qxvaz.mongodb.net/eccomerce?retryWrites=true&w=majority"

await mongoose.connect(URI,{
    serverSelectionTimeoutMS:5000,
})
console.log("Base de datos conectada....")

