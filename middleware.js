import { NextResponse } from "next/server";

export default function middleware(req) {
  let session = req.cookies.get("next-auth.session-token");
  let url = req.url;

  if (!session && url.includes("/home")) {
    return NextResponse.redirect("http://localhost:3000/");
  }

  if (url.includes("/posts") && !url.includes("/posts/")) {
    return NextResponse.redirect("http://localhost:3000/");
  }

  if (session && url.includes("/login")) {
    return NextResponse.redirect("http://localhost:3000/home");
  }
}
