import React from "react";
import Link from "next/link";
import { Facebook, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-900 py-10">
      <div className="container mx-auto px-6 max-w-screen-xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
          {/* Logo & Socials */}
          <div className="md:col-span-1 flex flex-col items-center md:items-start">
            <img
              src="https://live.templately.com/wp-content/uploads/2020/09/5b956696-spacehub_.png"
              alt="Space Hub Logo"
              className="w-36 mb-3 hover:scale-110 transition-transform duration-300"
            />
            <p className="text-gray-600 text-xs text-center md:text-left">
              Explore the future of innovation with Space Hub.
            </p>
            <div className="flex space-x-3 mt-4 justify-center md:justify-start">
              {[
                { icon: <Facebook size={20} />, href: "#" },
                { icon: <Twitter size={20} />, href: "#" },
                { icon: <Instagram size={20} />, href: "#" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="p-3 bg-gray-200 rounded-full text-gray-700 hover:bg-purple-500 hover:text-white transition-transform transform hover:scale-110 shadow-md"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {[
            {
              title: "Quick Links",
              links: [
                { name: "Home", href: "/" },
                { name: "About", href: "/about" },
                { name: "Workspace", href: "/workspace" },
              ],
            },
            {
              title: "Support",
              links: [
                { name: "FAQ", href: "/faq" },
                { name: "Privacy Policy", href: "/privacy" },
                { name: "Terms & Conditions", href: "/term" },
              ],
            },
            {
              title: "Contact",
              links: [
                { name: "7707076831", href: "tel:7707076831" },
                { name: "info@spacehub.com", href: "mailto:info@spacehub.com" },
                {
                  name: "1910, Kamdhenu Commerz Sector 14 Kharghar, Navi Mumbai",
                  href: "",
                },
              ],
            },
          ].map((section, index) => (
            <div key={index} className="md:col-span-1 text-center md:text-left">
              <h4 className="font-semibold text-gray-800 mb-4 text-lg border-b-2 border-purple-500 pb-2 inline-block">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link href={link.href}>
                      <span className="text-gray-700 hover:text-purple-500 transition-transform transform hover:translate-x-1 cursor-pointer">
                        {link.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        
        <div className="border-t border-gray-300 mt-8 pt-4 text-center text-xs text-gray-600">
          <p>© 2025 Space Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
