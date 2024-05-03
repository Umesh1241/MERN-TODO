const express = require('express');
const mongoose =require('mongoose');
const TaskSchema = require('./model');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({
    origin: '*'
}))

mongoose.connect('mongodb://localhost:27017')
.then(()=>console.log("DB connected..."))
.catch((err)=>console.log(err.message));

// app.get('/', (req, res)=>{
//     res.send('hello world');
// })

app.post('/addtask', async (req, res)=>{
    const { todo }=req.body;
    try {
        const newData = new TaskSchema({
             todo : todo 
            });
        await newData.save();
        return res.json(await TaskSchema.find());

    } catch (error) {
        console.log(error.message);
    }
})

app.get('/gettask', async (req, res)=>{
    try{
        return res.json(await TaskSchema.find());
    }
    catch(err){
        console.log(err.message);
    }
});

app.delete('/deletetask/:id', async (req, res)=>{
   try{
    await TaskSchema.findByIdAndDelete(req.params.id)
    return res.json(await TaskSchema.find())
   }
   catch(err){
    console.log(err.message);
   }
})

app.listen(PORT, ()=>console.log("server is running..."));