const express = require('express');
//The dotenv loads environment variables from a . env file into process. env
require('dotenv').config({path:"./config/.env"})

const connectDB = require("./config/connectDB");

const personDB = require('./model/model')

const app= express();
connectDB();

//create one person
const createPerson=()=>{
const person = new personDB({name:"manel", age:30,favoriteFoods:["gateau","frite","fricasse"] })
person.save((err)=>{
    err? console.log(err) : console.log(person)
})
}
createPerson();

//Create Many persons
var array=[{name:"manel", age:30,favoriteFoods:["gateau","frite","fricasse"] },{name:"mohamed", age:25,favoriteFoods:["coffee","chapati"] },{name:"firas", age:23,favoriteFoods:["mlawi","jus"] }]
const createMany = async ()=>{
    try {
        const data = await personDB.create(array)
        console.log(data)
    } catch (error) {
        console.log(error)
    }
}
//createMany();

/* or create Many with callback
var array=[{name:"manel", age:30,favoriteFoods:["gateau","frite","fricasse"] },{name:"mohamed", age:25,favoriteFoods:["coffee","chapati"] },{name:"firas", age:23,favoriteFoods:["mlawi","jus"] }]
personDB.create(array, function (err,docs) {
    if (err) return console.log(err);
    console.log(docs)
});*/

//Search Database
const searchName = async ()=>{
    try {
        const data = await personDB.find({name:"mohamed"})
        console.log(data)
    } catch (error) {
        console.log(error)
    }
}
//searchName();

//findOne
const findOne = async (food)=>{
    try {
        const data = await personDB.findOne({favoriteFoods:food})
        console.log(data)
    } catch (error) {
        console.log(error)
    }
}
//findOne("jus");

//Search By _id
const findId = async (personId)=>{
    try {
        const data = await personDB.findById({_id:personId})
        console.log(data)
    } catch (error) {
        console.log(error)
    }
}
//findId("6392498e19b27ec681fef934")

//Classic Updates: find/update/save
const findUpdate = async (personId)=>{
    try {
        const data = await personDB.findById({_id:personId})
        console.log(data)
        data.favoriteFoods.push("hamburger")
        await data.save();
        console.log(data)

    } catch (error) {
        console.log(error)
    }
}
//findUpdate("6392498e19b27ec681fef934")

//New Updates
const update = async (personName)=>{
    try {
        const data = await personDB.findOneAndUpdate({name:personName},{name:"imen"},{
            new: true})
        console.log(data)

    } catch (error) {
        console.log(error)
    }
}
//update("dalila");

//Delete One Document
const deleteOne= (personId)=>{
         personDB.findOneAndRemove({_id:personId},function (err, docs) {
            (err)?console.log(err):console.log("Deleted User : ",docs);
        })   
}
//deleteOne("63924afc8f2ed38307c2a7c1")

//Delete Many Documents 
const deleteMany= async ()=>{
    try {
        const data = await personDB.remove({name:"mohamed"})
        console.log(data)

    } catch (error) {
        console.log(error)
    }
}
//deleteMany()

//Chain Search
const chainSearch=  async()=>{
        await personDB.find({ favoriteFoods: "jus"})
        .sort({ name:1})
        .limit(2)
        .select({ age: 0 })
        .exec(function(err, data) {
        err?console.log(err):
        console.log(data);
        });
    }
//chainSearch();

const PORT= process.env.PORT || 5000
//console.log(PORT)

app.listen(PORT, (err)=> err?
console.log(err)
:console.log(`server is running on port ${PORT}`))
