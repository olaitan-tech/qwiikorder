   "use client"
import { db } from "@/config/firebase.config"
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { collection, getDocs, query, where } from "firebase/firestore"
import { useSession } from "next-auth/react"
import React, { useState } from "react"

export default function(){
    const {data : session} = useSession();
    const [orders, setOrders] = React.useState([]);
    const [loading, setLoading] = React.useState();

    React.useEffect(()=>{
        const fetchOrders = async ()=>{
            try{
              const q = query(collection(db, "orders"),
                  where("user", "==", session?.user?.id)
                );
                const snapShot = await getDocs(q);
                const compileOrder = [];
                snapShot.docs.forEach((doc)=>{
                    compileOrder.push({
                    id: doc.id,
                    data: doc.data(),
                })  
                })
                setOrders(compileOrder);
                console.log(compileOrder)
            }
            catch(error) {
                console.error("An error occured",error);
            }
        }
        if(session) {
            fetchOrders();
        }
    },[session]);

    const totalOrders = orders.length;
    const progressOrders =orders.filter((order)=>order.status === "In-progress").length;
    const CompletedOrders = orders.filter((order)=>order.status === "Completed").length

    const totalAmount = orders.reduce((sum, order)=> sum + order.data.amount,0)
    const recentOrder =orders.slice(0,3);

    if (loading)
            return(
                <div className="flex justify-center items-center h-[60vh]">
                <CircularProgress/>
                </div>
            )
    return(
        <main className="min-h-screen max-w-5xl mx-auto my-10 p-4">
            <h1 className="text-4xl font-bold text-center mb-10 text-gray-700">Orders Summary</h1>
            <div className="grid grid-cols-1 mb-5 md:grid-cols-2 mb-10 lg:grid-cols-4 gap-6 lg:mb-10">
                <Paper className="p-6 text-center shadow-md rounded-md">
                    <h1 className="text-lg font-semibold text-gray-500">Total Orders</h1>
                    <p className="text-3xl font-bold text-blue-600">{totalOrders}</p>
                </Paper>
                <Paper className="p-6 text-center shadow-md rounded-md">
                    <h1 className="text-lg font-semibold text-gray-500">Pending Orders</h1>
                    <p className="text-3xl font-bold text-yellow-600">{progressOrders}</p>
                </Paper>
                <Paper className="p-6 text-center shadow-md rounded-md">
                    <h1 className="text-lg font-semibold text-gray-500">Completed Orders</h1>
                    <p className="text-3xl font-bold text-green-600">{CompletedOrders}</p>
                </Paper>
                <Paper className="p-6 text-center shadow-md rounded-md">
                    <h1 className="text-lg font-semibold text-gray-500">Total Amount (₦)</h1>
                    <p className="text-3xl font-bold text-green-500">{totalAmount}</p>
                </Paper>
            </div>
            <div>
                <h1 className="text-2xl font-semibold mb-1 text-blue-300">Recent Orders</h1>
                <TableContainer component={Paper} className="shadow-lg rounded-xl">
                                <Table>
                                    <TableHead sx={{backgroundColor: "gray"}}>
                                        <TableRow>
                                            <TableCell sx={{color: "white"}}>Customer Name</TableCell>
                                            <TableCell sx={{color: "white"}}>ServiceType</TableCell>
                                            <TableCell sx={{color: "white"}}>Delivery Date</TableCell>
                                            <TableCell sx={{color: "white"}}>Amount (₦)</TableCell>
                                            <TableCell sx={{color: "white"}}>Status</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                       {recentOrder.map(orders =>
                                        <TableRow key={orders.id} sx={{borderBottom: "gray"}}>
                                            <TableCell>{orders.data.customerName}</TableCell>
                                            <TableCell>{orders.data.serviceType}</TableCell>
                                            <TableCell>{orders.data.deliveryDate}</TableCell>
                                            <TableCell>{orders.data.amount}</TableCell>
                                            <TableCell>{orders.data.status}</TableCell>
                                        </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                
                            </TableContainer>
            </div>
        </main>
    )
}