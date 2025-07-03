import express from "express";
import { PrismaClient } from "@prisma/client"; 

const client = new PrismaClient();
const app = express();

app.use(express.json());

app.get("/",async(req,res) =>{
    try{
        const allUsers = await client.user.findMany();
        res.status(200).json({
            message : "Successfully fetched all users",
            allUsers
        })
    } 
    catch(err ){
        if(err instanceof Error){
            res.status(500).json({
                message : "Error fetching all users",
                err : err.message
            })
        }
        res.status(500).json({
            message: "Unable to create new user",
            error: "Unknown error occurred",
        });
    }  
})

app.post("/", async (req,res) => {
    const { username, password } = req.body;
    try{
        const newUser = await client.user.create({
            data : {
                username,
                password
            }
        })
        res.status(200).json({
            message : "New user created",
            newUser
        })
    }
    catch(err){
        res.status(500).json({
            message : "Unable to create new user",
            err : err
        })
    }
    
})

app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})