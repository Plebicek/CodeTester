import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getUserByName(username) {
  const filtered_user = await prisma.users.findUnique({
    where: {
      user_name: username,
    },
  });
  return filtered_user;
}

export async function createUser(username, hash) {
  return new Promise((reslove, rejected) => {
    prisma.users
      .create({
        data: {
          user_name: username,
          user_hash: hash,
        },
      })
      .then((newUser) => {
        if (newUser) {
          reslove(1);
        } else {
          rejected(new Error("user creation failed"));
        }
      })
      .catch((err) => {
        if (err === "P2002") {
          rejected(new Error("User already exists"));
        }
      });
  });
}

export async function findUserByOAuth(oauth_id) {
  try {
    let result = prisma.users.findFirst({
      where: {
        user_oauth: oauth_id,
      },
      select: {
        user_id: true,
        user_oauth: true,
      },
    });
    return result;
  } catch (err) {
    console.log("while searching for user in findUserByOAuth err " + err);
    return false;
  }
}

export async function createUserByOAuth(user_data) {
  try {
    return await prisma.users.create({
      data: {
        ...user_data,
      },
    });
  } catch (err) {
    console.log("while creating user by oauth err occured " + err);
    return err;
  }
}

export async function checkGroup(userId, groupname) {
  let isGroup = await isGroup(groupname);
  if (!isGroup) {
    let newGroup = await createGroup(groupname);
    return await setUserToGroup(userId, newGroup.group_id);
  }
  try {
    await assigneGroup(isGroup.group_id);
    return await setUserToGroup(userId, isGroup.group_id);
  } catch (err) {
    console.log("checkGoup " + err);
    return err;
  }
}

export async function isGroup(groupname) {
  try {
    return await prisma.groups.findFirst({
      where: {
        group_name: groupname,
      },
      select: {
        group_id: true,
        group_name: true,
      },
    });
  } catch (err) {
    console.log("checkGoup " + err);
    return err;
  }
}

export async function createGroup(groupname) {
  try {
    return await prisma.groups.create({
      data: {
        group_name: groupname,
      },
    });
  } catch (err) {
    console.log("createGroup " + err);
    return err;
  }
}

export async function setUserToGroup(userId, groupId) {
  try {
    return await prisma.group_bridges.create({
      data: {
        group_id: parseInt(groupId),
        user_id: parseInt(userId),
      },
    });
  } catch (err) {
    console.log("setUserToGroup " + err);
    return err;
  }
}

export async function assigneGroup(groupId) {
  const grades = [1, 2, 3, 4];
  try {
    grades.forEach(async (gradeId) => {
      if (gradeId == 4) {
        await prisma.grade_bridges.create({
          data: {
            grade_id: parseInt(gradeId),
            group_id: parseInt(groupId),
          },
        });
      } else {
        await prisma.grade_bridges.create({
          data: {
            grade_id: parseInt(gradeId),
            group_id: parseInt(groupId),
          },
        });
      }
    });
  } catch (err) {
    console.log("function assigneGroup error " + err);
    return err;
  }
}

export async function getGroupByUser(userId) {
  try {
    return await prisma.group_bridges.findMany({
      where: {
        user_id: parseInt(userId),
      },
      select: {
        group_id: true,
        groups: {
          select: {
            group_name: true,
          },
        },
      },
    });
  } catch (err) {
    console.log(err);
    return err;
  }
}
