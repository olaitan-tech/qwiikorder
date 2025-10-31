  "use client"
import { db } from "@/config/firebase.config";
import { CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useSession } from "next-auth/react";
import React from "react";
import { LuView } from "react-icons/lu";

export default function OrderList () {
    const [order, setOrder] = React.useState([]);
    const [loading, setLoading] = React.useState([true])
    const {data: session} = useSession();
    // console.log(session) 

    React.useEffect(()=>{
        const fetchOrders = async ()=>{
            try{
                const q = query(collection(db,"orders"),
                 where("user", "==", session?.user?.id));
                 const snapShot = await getDocs(q)

                 const compileOrder = [];
                 snapShot.docs.forEach((doc)=> {
                    compileOrder.push({
                        id: doc.id,
                        data: doc.data(),
                    });
                 });
                 console.log(compileOrder)
                 setOrder(compileOrder);

            }catch(error) {
                console.error("Error occured while fetching Orders", error)
            }
            finally{
                setLoading(false)
            }
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
            <h1 className="text-4xl mb-10 text-black text-center font-bold">All Orders</h1>
            <TableContainer component={Paper} className="shadow-lg rounded-xl">
                <Table>
                    <TableHead sx={{backgroundColor: "gray"}}>
                        <TableRow>
                            <TableCell sx={{color: "white"}}>Customer Name</TableCell>
                            <TableCell sx={{color: "white"}}>ServiceType</TableCell>
                            <TableCell sx={{color: "white"}}>Delivery Date</TableCell>
                            <TableCell sx={{color: "white"}}>Amount (₦)</TableCell>
                            <TableCell sx={{color: "white"}}>Status</TableCell>
                            <TableCell sx={{color: "white"}}>Note</TableCell>
                            <TableCell sx={{color: "white"}}><LuView className="text-2xl" /></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {order.map((order)=>
                        <TableRow key={order.id} sx={{borderBottom: "gray"}}>
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