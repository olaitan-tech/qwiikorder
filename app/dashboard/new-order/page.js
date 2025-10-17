 "use client"
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";

const schema = yup.object().shape({
    customerName: yup.string().required("Full name is required").min(10),
    serviceType: yup.string().required("service type is required").min(10),
    deliveryDate: yup.date().required("Date is required"),
    amoount: yup.number().required("Amount is required"),
    status: yup.string().oneOf(["Received","In-progress","Completed"]).required("Status is required"),
    notes: yup.string().required("Note is required").min(15),
})

export default function NewOrder() {
    const {handleSubmit,handleChange,handleBlur,values,errors,touched} =useFormik({
        initialValues: {
            customerName:"",
            serviceType: "",
            deliveryDate:"",
            amount: "",
            status: "",
            notes: "",
        },
        onSubmit:()=>{
            alert(`your name is ${values.customerName}, you book for ${values.serviceType} and your bill is ${values.amount}`)
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
                <div>
                    <TextField
                    fullWidth
                    size="small"
                    label="Service Type"
                    placeholder="Enter service type"
                    type="text"
                    value={values.serviceType}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="serviceType"/>
                    {touched.serviceType && errors.serviceType? <span className="text-red-500 text-xs">{errors.serviceType}</span>: null}
                </div>
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
                    <button type="submit" className="h-[40px] w-full rounded-md shadow-md bg-blue-500 text-white text-xl cursor-pointer">Submit</button>
                
            </form>
        </main>
    )
}