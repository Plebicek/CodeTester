import express from 'express';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

async function main() {
    const allUsers = await prisma.user.findMany()
    console.log(allUsers)
}

const app = express()

app.use('/',function (req,res) {
    main()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
    res.send('hi')
})



export default app