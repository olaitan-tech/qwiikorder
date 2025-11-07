import { auth } from "@/auth"
import { AuthorizationCheck } from "@/config/Authorization-check"
import orderSummary from "./order-summary";

export default async function () {
    const session = await auth();
    return (
        <>
        <AuthorizationCheck/>
        <orderSummary userId = {session?.user?.id}/>
        </>
    )
}