import Image from "next/image"
import { Button } from "@mui/material"

export default function Profile () {
    return (
        <main className="min-h-screen flex justify-center py-4 md:py-23 md:px-12 lg:py-15 lg:px-16">
            <div className="w-full md:w-[360px] flex flex-col gap-4 shadow-lg rounded-md ">
                <div className="flex justify-center">
                    <Image
                    width={80}
                    height={80}
                    src="/mybg.jpg"
                    alt="profile-image"
                    className="w-[80px] h-[80px] rounded-full"
                    />
                </div>
                <p className="text-center py-3 border-b border-gray-600">User Name</p>
                <p className="text-center py-3 border-b border-gray-600">User Email</p>
                <p className="text-center py-3 border-b border-gray-600">User ID</p>
                <form>
                    <Button variant="contained" className="w-full" color="error">Log Out</Button>
                </form>

            </div>

        </main>
    )
}