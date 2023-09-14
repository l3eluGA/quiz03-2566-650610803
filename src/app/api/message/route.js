import { DB, readDB, writeDB } from "@/app/libs/DB";
import { checkToken } from "@/app/libs/checkToken";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  const roomId = request.nextUrl.searchParams.get("roomId");
  readDB();
  let messages = DB.messages;
  let filtered=messages;
  const foundRoomId =DB.messages.find((x) => x.roomId===roomId);
  if(foundRoomId){
    filtered=filtered.filter((x)=> x.roomId===roomId)
    return NextResponse.json({ok: true,messages:filtered,});
  }
  else
  return NextResponse.json(
    {
      ok: false,
      message: `Room is not found`,
    },
    { status: 404 }
  );
  
};

export const POST = async (request) => {
  readDB();

  // return NextResponse.json(
  //   {
  //     ok: false,
  //     message: `Room is not found`,
  //   },
  //   { status: 404 }
  // );

  const messageId = nanoid();

  writeDB();

  return NextResponse.json({
    ok: true,
    // messageId,
    message: "Message has been sent",
  });
};

export const DELETE = async (request) => {
  const payload = checkToken();
  if(!payload)
  return NextResponse.json(
    {
      ok: false,
      message: "Invalid token",
    },
    { status: 401 }
  );
  const body = await request.json();
  const { roomId , messageText } = body;

  readDB();

  // return NextResponse.json(
  //   {
  //     ok: false,
  //     message: "Message is not found",
  //   },
  //   { status: 404 }
  // );

  writeDB();

  return NextResponse.json({
    ok: true,
    message: "Message has been deleted",
  });
};
