import Link from "next/link"
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";

export function Footer () {
    return (
        <footer className="grid grid-cols-1 py-5 px-5 bg-gray-100 md:grid-cols-2 md:px-16 md:py-5 lg:grid-cols-4 lg:px-20 lg:py-5">
          <div>
            <p className="text-2xl font-bold text-blue-500">QwiikOrder</p>
            <p className="font-thin">About us</p>
            <p className="font-thin">Contact us</p>
            <p className="font-thin">Location</p>
          </div>  
          <div>
            <p className="text-2xl font-bold text-blue-500">Legal</p>
            <p className="font-thin">Privacy Policy</p>
            <p className="font-thin">Disclaimer</p>
            <p className="font-thin">Term of use</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-blue-500">Customer</p>
            <p className="font-thin">Privacy Policy</p>
            <p className="font-thin">Order Management</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-blue-500">Socials</p>
            <div className="flex gap-4 mt-2">
             <Link href="#"> <FaFacebookF className="text-xl text-blue-200" /></Link>
             <Link href="#"> <FaInstagram className="text-xl text-blue-200" /></Link>
             <Link href="#"> <FaLinkedin className="text-xl text-blue-200" /></Link>
            </div>

          </div>
        </footer>
    )
}