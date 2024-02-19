import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function viewTasks(req,res) {
    try {
        let tasks = await prisma.users.findMany({
          where : {
            user_id : 1
          },
          select : {
                group_bridges : {
                    select : {
                        groups: {
                            select : {
                                grade_bridges : {
                                    select : {
                                        grades : {
                                            select : {
                                                topics : {
                                                    select : {
                                                        tasks : {
                                                            select : {
                                                                task_title : true,
                                                                task_id : true
                                                            }
                                                        }
                                                    }
                                                }
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
        console.log(tasks)
        res.json(tasks)
    } catch (err) {
        res.status(500).json(err)
    }
}