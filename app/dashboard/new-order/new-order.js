 "use client"
import { db } from "@/config/firebase.config";
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { addDoc, collection } from "firebase/firestore";
import { useFormik } from "formik";
import { useSession } from "next-auth/react";
import { useState } from "react";
import * as yup from "yup";

const schema = yup.object().shape({
    customerName: yup.string().required("Full name is required").min(5),
    serviceType: yup.string().oneOf(["Barbing-services","Catering-services","Cleaning-services","Fashion-designing","Logistics-services"]).required("servicetype is required"),
    deliveryDate: yup.date().required("Date is required"),
    amount: yup.number().required("Amount is required").min(5000),
    status: yup.string().oneOf(["Received","In-progress","Completed"]).required("Status is required"),
    notes: yup.string().required("Note is required").min(8),
})

export default function NewOrder() {
    const [progress, setProgress] = useState(false);
    const [open, setOpen] = useState(false);
    const {data : session} = useSession();

    const handleClose =()=>{
        setOpen(false)
    }
    const {handleSubmit,handleChange,handleBlur,values,errors,touched} =useFormik({
        initialValues: {
            customerName:"",
            serviceType: "",
            deliveryDate:"",
            amount: "",
            status: "",
            notes: "",
        },
        onSubmit:async(values, {resetForm})=>{
            setProgress(true)
            await addDoc(collection(db,"orders"),{
                user: session?.user?.id,
                customerName: values.customerName,
                serviceType: values.serviceType,
                deliveryDate: values.deliveryDate,
                amount: values.amount,
                status: values.status,
                notes: values.notes,
                timeCreated: new Date().getTime(),
            }).then(()=>{
                setOpen(true)
                setProgress(false)
                resetForm()
            })
            .catch(e=>{
                console.error(e);
                alert("Unable to submit")
                setOpen(false)
                setProgress(false)
            })
        },
        validationSchema:schema
    })
    return(
        <main className="min-h max-w-xl mx-auto my-10 px-6 py-8 bg-white shadow-lg rounded-xl">
            <h1 className="text-2xl font-semibold mb-6 text-center">Make Your Order</h1>
            <form onSubmit={handleSubmit}
            className="flex flex-col gap-4 mt-5">
                <div>
                    <TextField
                    fullWidth
                    size="small"
                    label="Customer Name"
                    placeholder="Enter Full Name"
                    type="text"
                    id="customerName"
                    value={values.customerName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    />
                    {touched.customerName && errors.customerName? <span className="text-red-500 text-xs">{errors.customerName}</span>: null}
                </div>
                  <FormControl>
                    <InputLabel id="serviceType-label">service Type</InputLabel>
                    <Select
                    labelId="serviceType-label"
                    id="serviceType"
                    name="serviceType"
                    label="Service Type"
                    size="small"
                    value={values.serviceType}
                    onChange={handleChange}
                    onBlur={handleBlur} >
                        <MenuItem value="Barbing-services">Barbing services</MenuItem>
                        <MenuItem value="Catering-services">Catering services</MenuItem>
                        <MenuItem value="Cleaning-services">Cleaning services</MenuItem>
                        <MenuItem value="Fashion-designing">Fashion designing</MenuItem>
                        <MenuItem value="Logistics-services">Logistics services</MenuItem>
                    </Select>
                    {touched.serviceType && errors.serviceType? <span className="text-red-500 text-xs">{errors.serviceType}</span>: null}
                  </FormControl>
                <div>
                    <TextField
                    fullWidth
                    size="small"
                    InputLabelProps={{shrink:true}}
                    type="date"
                    label="Delivery Date"
                    value={values.deliveryDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="deliveryDate"/>
                    {touched.deliveryDate && errors.deliveryDate? <span className="text-red-500 text-xs">{errors.deliveryDate}</span>: null}
                </div>
                <div>
                    <TextField
                    fullWidth
                    size="small"
                    type="number"
                    label="Enter Amount"
                    value={values.amount}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="amount"/>
                    {touched.amount && errors.amount? <span className="text-red-500 text-xs">{errors.amount}</span>: null}
                </div>
                    <FormControl fullWidth>
                        <InputLabel id="orderStatus-label">Status</InputLabel>
                        <Select
                        labelId="orderStatus-label"
                        id="status"
                        size="small"
                        label="Status"
                        name="status"
                        value={values.status}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        >
                            <MenuItem value="Received">Received</MenuItem>
                            <MenuItem value="In-progress">In progress</MenuItem>
                            <MenuItem value="Completed">Completed</MenuItem>

                        </Select>
                        {touched.status && errors.status? <span className="text-red-500 text-xs">{errors.status}</span>: null}
                    </FormControl>
                    <div>
                        <TextField
                        fullWidth
                        type="text"
                        multiline
                        rows={2}
                        label="Notes"
                        placeholder="Notes/Comments"
                        value={values.notes}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        id="notes"/>
                        {touched.notes && errors.notes? <span className="text-red-500 text-xs">{errors.notes}</span>: null}
                    </div>
                    <button type="submit" className="h-[40px] w-full flex justify-center items-center gap-8 rounded-md shadow-md bg-blue-500 text-white text-xl cursor-pointer">Submit
                        {progress ? <CircularProgress color="inherit" size="30px" /> : null}
                    </button>
            </form>
            {/* success Dialog  */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Success</DialogTitle>
                <DialogContent>
                    <Typography>Order Placed Successfully</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" variant="contained" autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

        </main>
    )
}