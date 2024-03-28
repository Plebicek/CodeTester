import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// === USERS ===
export async function getAllUsers() {
  try {
    return await prisma.users.findMany({
      select: {
        user_id: true,
        user_job_title: true,
        user_name: true,
      },
    });
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function searchUserById(id) {
  return await prisma.users.findFirst({
    where: {
      user_id: id,
    },
    select: {
      user_id: true,
      user_job_title: true,
      user_name: true,
    },
  });
}

export async function searchUsers(user) {
  try {
    if (!isNaN(parseInt(user))) {
      return await searchUserById(parseInt(user));
    }
    if (!user) {
      return await getAllUsers();
    }
    return await prisma.users.findMany({
      where: {
        user_name: { contains: user },
      },
      select: {
        user_id: true,
        user_job_title: true,
        user_name: true,
      },
    });
  } catch (err) {
    return err;
  }
}
// === GRADES ===
export async function getGrades() {
  try {
    return await prisma.grades.findMany({
      select: {
        grade_id: true,
        grade_name: true,
      },
    });
  } catch (err) {
    return err;
  }
}

// === GROUPS ===
export async function getGroups() {
  try {
    return await prisma.groups.findMany({
      select: {
        group_id: true,
        group_name: true,
      },
    });
  } catch (err) {
    return err;
  }
}

export async function setGroup(name) {
  try {
    return await prisma.groups.findMany({
      data: {
        group_name: name,
      },
    });
  } catch (err) {
    return err;
  }
}

/* export async function setUserToGroup(groupId, user) {
    try {
        return await prisma.group_bridges.upsert({
            where : {
                group_id : parseInt(groupId)
            },
            update : {

            }
        })    
    } catch (err)  { 
        return err
    }
} */

// === TOPICS ===
export async function getTopics(gradeId) {
  try {
    return await prisma.topics.findMany({
      where: {
        grade_id: gradeId,
      },
      select: {
        topic_id: true,
        topic_name: true,
      },
    });
  } catch (err) {
    return err;
  }
}
// === TASKS ===
export async function getTasks(topicId) {
  try {
    return await prisma.tasks.findMany({
      where: {
        topic_id: topicId,
      },
      select: {
        task_id: true,
        task_title: true,
      },
    });
  } catch (err) {
    return err;
  }
}
// === TESTS ===
/*
uplod file
update task.test_id -> testid
add test to queue
decrompise 
rename to id as test id 
*/
export async function createTest() {
  try {
    return await prisma.tests.create({
      data : {
        test_path : "path",
        
      }
    })
  } catch (err) {
  console.log(err)
  return err 
  }
}

export async function updateTest(testId,taskId) {
  if (!testId || !taskId) {
    return null
  }
  try {
    return await prisma.tests.update({
      where : {
        test_id : parseInt(testId)
      },
      data : {
        task_id : parseInt(taskId)
      }
    })
  } catch (err) {
  console.log(err)
  return err 
  }
}

export async function getTestsAndTopics() {
  try {
    return await prisma.topics.findMany({
      select: {
        topic_name: true,
        tasks: {
          select: {
            task_title: true,
            task_id: true,
            tests: {
              select: {
                test_id: true,
              },
            },
          },
        },
      },
    });
  } catch (err) {
    console.log(err);
    return err;
  }
}
// === ANSWERS ===
export async function getAnswers(taskId) {
  try {
    const answers = await prisma.answers.findMany({
      where: {
        task_id: taskId,
      },
      select: {
        pass: true,
        fails: true,
        answer_overtime : true,
        users: {
          select: {
            user_id: true,
            user_name: true,
          },
        },
      },
    });

    return answers;
  } catch (error) {
    return error;
  }
}
