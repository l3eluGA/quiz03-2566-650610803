import jwt from "jsonwebtoken";

import { DB, readDB } from "@/app/libs/DB";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const body = await request.json();
  const { username , password } = body;
  readDB();
  const foundUser = DB.users.find((x)=> x.username===username && x.password===password)
  if(!foundUser)
  return NextResponse.json(
    {
      ok: false,
      message: "Username or Password is incorrect",
    },
    { status: 400 }
  );

  const token = "Replace this with token creation";

  return NextResponse.json({ ok: true, token });
};
