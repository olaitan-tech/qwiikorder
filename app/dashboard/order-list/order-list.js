"use client"
import { db } from "@/config/firebase.config";
import { CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { LuView } from "react-icons/lu";

export default function OrderList () {
    const [orders, setOrders] = React.useState([]);
    const [loading, setLoading] = React.useState(true)
    const {data: session} = useSession();
    const router = useRouter()

    React.useEffect(()=>{
        const fetchOrders = async ()=>{
            try{
                const q = query(collection(db,"orders"),
                where("user", "==", session?.user?.id),
                // orderBy("timecreated","desc"),
            );
                const snapShot = await getDocs(q)

                const compileOrder = [];
                snapShot.docs.forEach((doc)=> {
                    compileOrder.push({
                        id: doc.id,
                        data: doc.data(),
                    });
                });
                  setOrders(compileOrder);
                 
            }catch(error) {
                console.error("Error occured while fetching Orders", error)
            }
            finally{
                setLoading(false)
            };
        }
        if(session){
            fetchOrders();
        }
    },[session])
     if (loading)
        return(
            <div className="flex justify-center items-center h-[60vh]">
               <CircularProgress/>
            </div>
    )
    return (
        <main className="min-h-screen max-w-5xl mx-auto my-10 p-4">
             <h1 className="text-4xl mb-10 text-center font-bold text-gray-700">All Orders</h1>
            <TableContainer component={Paper} className="shadow-lg rounded-xl">
                <Table>
                    <TableHead sx={{backgroundColor: "gray"}}>
                        <TableRow>
                             <TableCell sx={{color: "white"}}>Customer Name</TableCell>
                             <TableCell sx={{color: "white"}}>ServiceType</TableCell>
                             <TableCell sx={{color: "white"}}>Delivery Date</TableCell>
                             <TableCell sx={{color: "white"}}>Amount (₦)</TableCell>
                             <TableCell sx={{color:"white"}}>Status</TableCell>
                             <TableCell sx={{color: "white"}}>Note</TableCell>
                             <TableCell sx={{color: "white"}}>View</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                         {orders.map((order)=>
                        <TableRow onClick={()=>router.push(`/dashboard/order-list/${order.id}`)} key={order.id} sx={{borderBottom: "gray" , cursor: "pointer"}}>
                            <TableCell>{order.data.customerName}</TableCell>
                            <TableCell>{order.data.serviceType}</TableCell>
                            <TableCell>{order.data.deliveryDate}</TableCell>
                            <TableCell>{order.data.amount}</TableCell>
                            <TableCell>{order.data.status}</TableCell>
                            <TableCell>{order.data.notes}</TableCell>
                            <TableCell><LuView className="text-2xl cursor-pointer"/></TableCell>
                        </TableRow>
                     )}
                    </TableBody>
                </Table>

            </TableContainer>

        </main>
    )
}