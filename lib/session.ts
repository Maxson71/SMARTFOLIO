import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function getCurrentUser() {
    // @ts-ignore
    const session = await getServerSession(authOptions);
    return session?.user;
}