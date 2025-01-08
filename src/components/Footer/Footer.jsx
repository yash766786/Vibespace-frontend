import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
    {/* divider */}
    {/* <div className="divider m-0 h-0 lg:ml-8 bg-white"></div> */}

    {/* <section className="bg-gray-800 text-gray-200 py-10 lg:ml-8 "> */}
    <section className="bg-[rgb(var(--custom-color2))] opacity-75 text-gray-200 py-10 lg:ml-8 border-t-[1px]">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Logo and Copyright */}
          <div className="col-span-1 md:col-span-1 lg:col-span-1">
            <h1 className="text-3xl font-bold mb-4 text-white">VibeSpace</h1>
            <p className="text-sm text-gray-400">
              &copy; Copyright 2023. All Rights Reserved by DevUI.
            </p>
          </div>

          {/* Company Links */}
          <div className="col-span-1">
            <h6 className="text-sm font-semibold uppercase mb-4 text-gray-300">
              Company
            </h6>
            <ul className="space-y-2">
              <li>
                <Link
                  className="text-base font-medium text-gray-400 hover:text-white"
                  to="/"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  className="text-base font-medium text-gray-400 hover:text-white"
                  to="/"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  className="text-base font-medium text-gray-400 hover:text-white"
                  to="/"
                >
                  Affiliate Program
                </Link>
              </li>
              <li>
                <Link
                  className="text-base font-medium text-gray-400 hover:text-white"
                  to="/"
                >
                  Press Kit
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div className="col-span-1">
            <h6 className="text-sm font-semibold uppercase mb-4 text-gray-300">
              Support
            </h6>
            <ul className="space-y-2">
              <li>
                <Link
                  className="text-base font-medium text-gray-400 hover:text-white"
                  to="/"
                >
                  Account
                </Link>
              </li>
              <li>
                <Link
                  className="text-base font-medium text-gray-400 hover:text-white"
                  to="/"
                >
                  Help
                </Link>
              </li>
              <li>
                <Link
                  className="text-base font-medium text-gray-400 hover:text-white"
                  to="/"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  className="text-base font-medium text-gray-400 hover:text-white"
                  to="/"
                >
                  Customer Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="col-span-1">
            <h6 className="text-sm font-semibold uppercase mb-4 text-gray-300">
              Legals
            </h6>
            <ul className="space-y-2">
              <li>
                <Link
                  className="text-base font-medium text-gray-400 hover:text-white"
                  to="/"
                >
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link
                  className="text-base font-medium text-gray-400 hover:text-white"
                  to="/"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  className="text-base font-medium text-gray-400 hover:text-white"
                  to="/"
                >
                  Licensing
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}

export default Footer;
