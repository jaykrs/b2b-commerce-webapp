import { NextResponse } from 'next/server';
import { parseAuthCookie, verifyJwt } from '../../utils/jwt';
import { hashSync } from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request) {
  const token = parseAuthCookie(request.headers.get('cookie'));
  const payload = token ? verifyJwt(token) : null;

  if (!payload) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.json({ userId: payload.userId, username: payload.username });
}


// export async function POST(request) {
//   try {
//     const body = await request.json();

//     const {
//       name,
//       email,
//       password,
//       countryCode,
//       phone,
//       profileImageId,
//       createdById,
//       role
//     } = body;


//     // Simple validation (you can use zod/yup for better validation)
//     if (!name || !email || !password || !phone ) {
//       return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
//     }
//     const hashedPassword = hashSync(password, 10);
//     const isUserExist = await prisma.user.findUnique({
//       where: {
//         email: email
//       }
//     })
//     if (isUserExist) {
//       return NextResponse.json({ error: 'User already exist with ' + email }, { status: 401 });
//     }
//     const user = await prisma.user.create({
//       data: {
//         name,
//         email,
//         password: hashedPassword,
//         countryCode,
//         phone,
//         profileImageId,
//         createdById
//       },
//     });

//     return NextResponse.json(user, { status: 201 });
//   } catch (error) {
//     console.error("[USER_POST_ERROR]", error);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }


export async function POST(request) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      password,
      countryCode,
      phone,
      profileImageId,
      createdById,
      role // This should be the role ID you want to assign
    } = body;

    if (!name || !email || !password || !phone || !role) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const isUserExist = await prisma.user.findUnique({
      where: { email }
    });

    if (isUserExist) {
      return NextResponse.json({ error: 'User already exists with ' + email }, { status: 409 });
    }

    const hashedPassword = hashSync(password, 10);

    // Step 1: Create the user


    const isRoleExist = await prisma.role.findUnique({
      where: { name: role }
    });
    let isRoleExistWithUser;
    if (!isRoleExist) {
       isRoleExistWithUser = await prisma.role.findUnique({
        where: { name: 'user' }
      });
      if (!isRoleExistWithUser) {
        isRoleExistWithUser = await prisma.role.create({
          data: {
            name: 'user'
          }
        });
      }
    }

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        countryCode,
        phone,
        profileImageId,
        createdById,
        status: 1,
        roleId: isRoleExist ? isRoleExist.id : isRoleExistWithUser.id
      }
    });

    return NextResponse.json(
      {
        message: "User created successfully",
        user: newUser
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("[USER_POST_ERROR]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
