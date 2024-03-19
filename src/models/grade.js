import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getGradesByUser(userId) {
  if (!userId) {
    return null;
  }
  try {
    let grades = prisma.users.findFirst({
      where: {
        user_id: userId,
      },
      include: {
        group_bridges: {
          select: {
            groups: {
              include: {
                grade_bridges: {
                  include: {
                    grades: {
                      select: {
                        grade_id: true,
                        grade_name: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
    return grades;
  } catch (err) {
    return new Error("The SQL query for getGrades failed");
  }
}

export async function getGradeAndTopicsById(gradeId) {
  try {
    let gradeAndTopics = await prisma.grades.findFirst({
      where: {
        grade_id: gradeId,
      },
      include: {
        topics: {
          select: {
            topic_name: true,
            topic_id: true,
            tasks: {
              select: {
                task_id: true,
                task_title: true,
                task_lock: true,
              },
            },
          },
        },
      },
    });
    return gradeAndTopics;
  } catch (err) {
    return new Error("The getGradeById error occured");
  }
}
