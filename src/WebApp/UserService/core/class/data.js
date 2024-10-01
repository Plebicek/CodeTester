import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

/**
 * Class model database
 * @class ClassModel
 */
export default class ClassModel {
    constructor() { }
    /**
     * Return users classes data by user_id from database  
     * @param {(number)} id - user id 
     * @returns {Array} - array of classes objects 
     */
    static async getClassAndGradeByUserId(user_id) {
        if (!user_id) throw new Error("getClassByUserId needs specified user_id")
        try {
            return await prisma.Class_bridge.findFirst({
                where: {
                    user_id: Number(user_id)
                },
                select: {
                    class_id: true,
                    Class: {
                        select: {
                            class_name: true,
                            Grade_bridge: {
                                select: {
                                    grade_id: true,
                                    grade_bridge_show: true,
                                    Grade: {
                                        select: {
                                            grade_name: true,
                                        }
                                    }
                                }
                            }
                        }
                    },
                }
            })
        } catch (error) {
            console.log("getUser err: ", error.message)
        }
    }
}
