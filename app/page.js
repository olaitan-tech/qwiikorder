import { auth } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
    const session = await auth();
     if(!session) {
       redirect("/auth/login")
     }
  return (
    <main className="min-h-screen">
      {/* <h1 className="text-4xl font-bold text-blue-500 py-5 text-center">Welcome to QWIIKORDER</h1> */}
      <div className="text-center py-10">
        <h1 className="text-3xl fon t-bold text-gray-800">Track your orders effortlessly</h1>
        <p className="text-sm text-gray-600 mt-3">Place orders, monitor delivery in real time, <br />and access your order history all in one app.</p>
        <button className="mt-6 bg-blue-500 px-6 py-2 rounded-md text-white font-semibold shadow-md hover">START TRACKING</button>
      </div>

      <div className="px-9 py-10 text-center">
        <h2 className="font-bold text-2xl text-gray-800 mb-6">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
          <div className="border border-gray-300 rounded-lg p-6 flex flex-col items-center">
            <Image 
            src="/order1.png"
            alt="Place Orders" 
            width={40} 
            height={40} />
            <Link href="/dashboard/new-order"><h3 className="font-semibold text-lg mt-4">Place Orders</h3></Link>
            <p className="text-xs text-gray-500 mt-2">Order products with just a few clicks.</p>
          </div>

          <div className="border border-gray-300 rounded-lg p-6 flex flex-col items-center">
            <Image 
            src="/location.png" 
            alt="Track Delivery" 
            width={40} 
            height={40} />
            <Link href="/dashboard/order-list/id"><h3 className="font-semibold text-lg mt-4">Track Delivery</h3></Link>
            <p className="text-xs text-gray-500 mt-2">Monitor your orders in real time.</p>  
          </div>

          <div className="border border-gray-300 rounded-lg p-6 flex flex-col items-center">
            <Image 
            src="/order.png" 
            alt="Order History" 
            width={40} 
            height={40} />
            <Link href="/dashboard/order-list"><h3 className="font-semibold text-lg mt-4">Order History</h3></Link>
            <p className="text-xs text-gray-500 mt-2">Easily access past orders anytime.</p> 
          </div>

          <div className="border border-gray-300 rounded-lg p-6 flex flex-col items-center">
            <Image 
            src="/feedback.png" 
            alt="Customer Feedback" 
            width={40} 
            height={40} />
            <h3 className="font-semibold text-lg mt-4">Customer Feedback</h3>
            <p className="text-xs text-gray-500 mt-2">Share your experience and read reviews.</p>
          </div>
        </div>
      </div>

      <div className="px-9 py-12 text-center">
        <h2 className="font-bold text-2xl text-gray-800 mb-8">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="font-semibold">1. Sign Up / Log In</p>
            <p className="text-sm text-gray-600 mt-2">Create an account or log into your existing one.</p>
          </div>
          <div>
            <p className="font-semibold">2. Place an Order</p>
            <p className="text-sm text-gray-600 mt-2">Choose products and complete checkout.</p>
          </div>
          <div>
            <p className="font-semibold">3. Track Delivery</p>
            <p className="text-sm text-gray-600 mt-2">Monitor your order status in real time.</p>
          </div>
          <div>
            <p className="font-semibold">4. Leave Feedback</p>
            <p className="text-sm text-gray-600 mt-2">Share your experience after delivery.</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
        <div>

        </div>
      </div>
    </main>
  );
}