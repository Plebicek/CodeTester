import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function viewAllUsers(req,res) {
    try {
        const users = await prisma.users.findMany()
        res.status(200).json(users)
    } catch (err) {
        console.log("Users error: " + err)
        res.status(500).json("Users server error")
    }
    } 
