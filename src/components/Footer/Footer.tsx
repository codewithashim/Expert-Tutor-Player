import Link from "next/link";
import {
  Facebook,
  Instagram,
  Linkedin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-[#1C1D1F] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Information */}
          <div>
            <h3 className="text-lg font-medium mb-4">Company Information</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-300 hover:text-white">
                  Career
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-white">
                  Subject Answers
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-white">
                  Become a tutor
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-white">
                  Schools
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-white">
                  Staying safe online
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-white">
                  FAQ&lsquo;s
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-white">
                  Using the lesson space
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-white">
                  Testimonials & press
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-white">
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Requests */}
          <div>
            <h3 className="text-lg font-medium mb-4">Popular Requests</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-300 hover:text-white">
                  Maths tutors
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-white">
                  Chemistry tutors
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-white">
                  Physics tutors
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-white">
                  Biology tutors
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-white">
                  English tutors
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-white">
                  GCSE tutors
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-white">
                  A level tutors
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-white">
                  IB tutors
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-white">
                  Physics & Maths tutors
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-white">
                  Chemistry & Maths tutors
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-white">
                  GCSE Maths tutors
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-medium mb-4">
              We&apos;re here to help
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-blue-500" />
                <Link href="#" className="text-gray-300 hover:text-white">
                  Contact us
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <FaWhatsapp className="w-5 h-5 text-blue-500" />
                <Link href="#" className="text-gray-300 hover:text-white">
                  Message us on Whatsapp
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-blue-500" />
                <a
                  href="tel:+44123445557"
                  className="text-gray-300 hover:text-white"
                >
                  +44 12 34 45557
                </a>
              </li>
            </ul>

            <hr className="border-gray-700 my-6 w-[50%]" />

            {/* Social Media Icons */}
            <div className="flex gap-2 mt-6">
              <Link
                href="#"
                className="p-2 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                <Linkedin className="w-5 h-5 text-blue-500" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="#"
                className="p-2 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                <Instagram className="w-5 h-5 text-blue-500" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="#"
                className="p-2 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                <Facebook className="w-5 h-5 text-blue-500" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="#"
                className="p-2 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                <MessageCircle className="w-5 h-5 text-blue-500" />
                <span className="sr-only">Message</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <div>© ExpertTutor 2024</div>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="#" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white">
              Terms of Use
            </Link>
            <Link href="#" className="hover:text-white">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
