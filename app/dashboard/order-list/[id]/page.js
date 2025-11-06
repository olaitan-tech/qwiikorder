"use client"
import { db } from "@/config/firebase.config";
import { CircularProgress, Paper } from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";

export default function Order ({params}) {
       const {id} = useParams()
       const [orders, setOrders] = useState(null)
       const router = useRouter();
       const [loading,setLoading] = useState(true);

      useEffect(()=>{
         const fetchOrder = async ()=>{
            try {
             const orderRef  = doc(db,"orders",id);
             const snapShot = await getDoc(orderRef);
                 //if no order found in the database, redirect the user
              if(!snapShot){
                router.push("/dashboard/new-order")
              }
              setOrders({
                id,
                ...snapShot.data(),
              })
            }
            catch(error) {
                console.error("unable to fetch",error)
            }
            finally{
                setLoading(false)
            }
         }
         fetchOrder()
      },[id,router])
        if (loading)
        return(
            <div className="flex justify-center items-center h-[60vh]">
             <CircularProgress/>
            </div>
        )
    return (
        <main className="min-h-screen flex justify-center ">
            <Paper className="shadow-xl rounded-md p-20 my-20">
                <h1 className="text-lg text-center text-blue-500 font-bold ">Order Details</h1>
                <div className="flex justify-between items-center gap-15 mb-5">
                    <h1 className="font-semibold text-gray-700">Customer Name</h1>
                    <p className="text-sm text-gray-600">{orders?.customerName} </p>
                </div>
                <div className="flex justify-between items-center gap-15 mb-5">
                    <h1 className="font-semibold text-gray-700">Service Type</h1>
                    <p className="text-sm text-gray-600">{orders?.serviceType}</p>
                </div>
                <div className="flex justify-between items-center gap-15 mb-5">
                    <h1 className="font-semibold text-gray-700">DeliveryDate</h1>
                    <p className="text-sm text-gray-600">{orders?.deliveryDate}</p>
                </div>
                 <div className="flex justify-between items-center gap-15 mb-5">
                    <h1 className="font-semibold text-gray-700">Amount</h1>
                    <p className="text-sm text-gray-600">₦ {orders?.amount}</p>
                </div>
                 <div className="flex justify-between items-center gap-15 mb-5">
                    <h1 className="font-semibold text-gray-700">Status</h1>
                    <p className="text-sm text-gray-600">{orders?.status}</p>
                </div>
                 <div className="mt-3 cursor-pointer w-[100px] h-[50px] bg-red-500 flex justify-center rounded-md items-center gap-3 ">
                   <button className="flex justify-center items-center gap-3">
                   <RiDeleteBin5Line className="text-white" /> 
                   <span className="text-white">Delete</span>
                </button>
            </div>
            </Paper>
            
        </main>
    )
}