import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export  async function getUserByName(username) {
    const filtered_user = await prisma.users.findUnique({
        where : {
            user_name : username
        }
    })
    return filtered_user
}

export async function createUser(username, hash) {
    return new Promise((reslove, rejected) => {
        prisma.users.create({
            data : {
                user_name : username,
                user_hash : hash
            }
        }).then((newUser) => {
            if (newUser) {
                reslove(1)
            } else {
                rejected(new Error("user creation failed"))
            }
        }).catch(err => {
            if (err === "P2002") {
                rejected(new Error("User already exists"))
            }
        })
    })
}