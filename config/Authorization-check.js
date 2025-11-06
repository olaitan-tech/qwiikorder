import { auth } from "@/auth";
import { redirect } from "next/navigation";

export async function AuthorizationCheck () {
    const session = await auth();
    // if user is not logged in, redirect them to the login page 
    if(!session?.user) {
        redirect("/auth/login")
    }
}