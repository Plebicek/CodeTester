import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class Core {
    constructor() {

    }

    async getIndex(_, res) {
        let data = await prisma.users.findMany({})
        console.log(data)
        return res.render("index", {})
    }
}

export default new Core()