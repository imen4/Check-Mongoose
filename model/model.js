const mongoose = require("mongoose");
const {Schema , model} = mongoose;

const personSchema = new Schema({
    name: {type:String , required:true},
    age: {type:Number,required:true},
    favoriteFoods: {type:[String] , default:"pizza"}
})

const personDB = model("person" , personSchema);
module.exports = personDB