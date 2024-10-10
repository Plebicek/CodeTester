import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

/**
 * Class model database
 * @class ClassModel
 */
export class ClassModel {
    /* 
        Maybe some wrapper that checks if incomming args are set 
    */
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
            return null
        }
    }
}

export class TopicModel {

    /**
     * Get topics and assignments data
     * @param {(number|string)} class_id 
     * @param {(number|string)} grade_id 
     * @returns {(null| Array)} 
     */
    static async getTopicsWithAssignments(class_id, grade_id) {
        if (!class_id || !grade_id) throw new Error("getTopicsAndAssignments does not specified group_id or grade_id")
        try {
            const result = await prisma.Topic_bridge.findMany({
                where: {
                    grade_id: Number(grade_id),
                    class_id: Number(class_id)
                },
                select: {
                    Topic: {
                        select: {
                            topic_name: true,
                            topic_id: true,
                            Assignment: {
                                select: {
                                    assignment_title: true,
                                    assignment_id: true
                                }
                            }
                        }
                    },
                }
            })
            return this._destructTopics(result)
        } catch (error) {
            console.log("New Error : ", error.message)
            return null
        }
    }

    static _destructTopics(data) {
        if (!data) throw new Error("Cannot destruct any undefined data")
        data = data.map(item => {
            const { topic_name, topic_id, Assignment: assignments } = item.Topic
            return { topic_name, topic_id, assignments }
        })
        return data
    }
}

export class AssignmentModel {
    static async getAssignmentById(assignment_id) {
        if (!assignment_id) throw new Error("getAssighnmentById has not specified assignment_id")
        try {
            return prisma.Assignment.findFirst({
                where: {
                    assignment_id: Number(assignment_id)
                }
            })
        } catch (error) {

        }
    }
}