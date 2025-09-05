import order from "../order.json";
import { NextResponse } from "next/server";
import { verifyJwt, parseAuthCookie } from "../../utils/jwt";

export async function GET(_, { params }) {
const token = parseAuthCookie(request.headers.get('cookie'));
  const payload = token ? verifyJwt(token) : null;
  if (!payload) {
    const response = NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    response.cookies.set("token", "", {
      httpOnly: true,
      path: "/",
      maxAge: 0, // 👈 Expires immediately
    });
    return response;
  }

  const singleOrder = (await params).updateId;

  const orderObj = order?.data.find((elem) => elem.order_number == singleOrder);

  return NextResponse.json(orderObj);
}
