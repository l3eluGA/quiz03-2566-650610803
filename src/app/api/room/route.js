import { DB, readDB, writeDB } from "@/app/libs/DB";
import { checkToken } from "@/app/libs/checkToken";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";

export const GET = async () => {
  readDB();
  let room = DB.rooms;
  return NextResponse.json({
    ok: true,
    room,
    totalRooms: room.length,
  });
};

export const POST = async (request) => {
  const payload = checkToken();
  if(!payload)
  return NextResponse.json(
    {
      ok: false,
      message: "Invalid token",
    },
    { status: 401 }
  );

  readDB();
  const body = await request.json();
  const { roomName } = body;
  const foundRoomDupe = DB.rooms.find((x)=>x.roomId===roomId )
  if(!foundRoomDupe)
  return NextResponse.json(
    {
      ok: false,
      message: `Room ${roomName} already exists`,
    },
    { status: 400 }
  );

  const roomId = nanoid();

  //call writeDB after modifying Database
  writeDB();

  return NextResponse.json({
    ok: true,
    //roomId,
    message: `Room ${"replace this with room name"} has been created`,
  });
};
