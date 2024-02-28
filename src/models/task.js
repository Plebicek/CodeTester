import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function getClasses(userId) {
    if (!userId) {
        return null 
    }
    try {
        let classes = prisma.users.findFirst({
            where : {
                user_id : userId
            },
           include: {
            group_bridges: {
                select: {
                    groups: {
                        include: {
                            grade_bridges: {
                                include: {
                                            grades: {
                                                select : {
                                                    grade_id : true,
                                                    grade_name :true
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                }
            }
        })
        return classes
    } catch (err) {
        return new Error("The SQL query for getClasses failed")
    }
}
