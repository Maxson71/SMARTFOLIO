import { authOptions } from "@/lib/auth"
import NextAuth from "next-auth"

let handler: any;
// @ts-ignore
handler = NextAuth(authOptions);

export { handler as GET, handler as POST }