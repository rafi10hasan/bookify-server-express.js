const Room = require("../models/rooms-model");


const getPriceRange = async()=>{
     try{
        const [minPriceRoom] = await Room.find().sort({price: 1}).limit(1)
        const [maxPriceRoom] = await Room.find().sort({price: -1}).limit(1)
        const minPrice = minPriceRoom ? minPriceRoom.price : 0;
        const maxPrice = maxPriceRoom ? maxPriceRoom.price : 0;
        return {minPrice,maxPrice}
     }catch(error){
        throw new Error(error)
     }
}

module.exports = {getPriceRange}