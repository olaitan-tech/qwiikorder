import { auth } from "@/auth"
import { AuthorizationCheck } from "@/config/Authorization-check"
import OrderList from "./order-list";

export default async function () {
    const session = await auth();
    return (
        <>
        <AuthorizationCheck/>
        <OrderList userId = {session?.user?.id}/>
        </>
    )
}