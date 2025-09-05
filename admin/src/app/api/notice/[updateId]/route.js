import { NextResponse } from "next/server";
import notice from "../notice.json";
import { verifyJwt, parseAuthCookie } from "../../utils/jwt";

export async function GET(request, { params }) {

   const token = parseAuthCookie(request.headers.get('cookie'));
  const payload = token ? verifyJwt(token) : null;
  if (!payload) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }
  const singleNotice = (await params).updateId;

  const noticeObj = notice?.data.find((elem) => elem.id == singleNotice);

  return NextResponse.json(noticeObj);
}
