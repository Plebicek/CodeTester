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
                        grade_show: true,
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

export async function getGradeAndTopicsById(gradeId, userId) {
  if (!gradeId) {
    return new Error("gradeId or userId is not set");
  }
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
                answers: {
                  where: {
                    user_id: userId,
                  },
                  select: {
                    answer_id: true,
                    task_id: true,
                  },
                },
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

export async function getGrades(groupId) {
  return await prisma.grade_bridges.findMany({
    where: {
      group_id: parseInt(groupId),
    },
    select: {
      grade_id: true,
      grades: {
        select: {
          grade_name: true,
        },
      },
    },
  });
}
