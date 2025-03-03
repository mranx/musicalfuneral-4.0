import { NextRequest, NextResponse } from "next/server";
import { findAdminByEmail } from "@/prisma/adminService";
import { verifyToken } from "@/app/utils/auth";

export async function GET(req: NextRequest) {
  try {
    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const decoded = verifyToken(token);

    if (!decoded.email) {
      return NextResponse.json({ message: "Invalid token structure" }, { status: 400 });
    }

    const admin = await findAdminByEmail(decoded.email);
    if (!admin) {
      return NextResponse.json({ message: "Admin not found" }, { status: 404 });
    }

    return NextResponse.json({ email: admin.email, role: admin.role });
  } catch (error) {
    console.error("Error fetching admin profile:", error);
    return NextResponse.json({ message: "Error fetching profile" }, { status: 500 });
  }
}
