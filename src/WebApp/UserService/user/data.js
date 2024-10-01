import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

/**
 * User model database
 * @class UserModel
 */
export default class UserModel {
    constructor() { }

    /**
     * Return user data by Id from database  
     * @param {(number)} id - user id 
     * @returns {Object} - user object
     */
    static async getUserById(user_id) {
        if (!user_id) throw new Error("getuserById needs specified user_id")
        try {
            return await prisma.user.findFirst({
                where: {
                    user_id: Number(user_id)
                }
            })
        } catch (error) {
            console.log("getUser err: ", error.message)
        }
    }
}
