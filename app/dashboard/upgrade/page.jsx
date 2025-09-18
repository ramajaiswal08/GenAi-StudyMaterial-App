"use client";

import { db } from "@/configs/db";
import { USER_TABLE } from "@/configs/schema";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";

const Upgrade = () => {
  const [loading, setLoading] = useState(false);

  // const handleCheckoutClick = async () => {
  //   try {
  //     setLoading(true);
  //     const result = await axios.post("/api/payment/checkout", {
  //       priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_MONTHLY,
  //     });
  //     console.log(result.data);
  //     // Redirect to Stripe Checkout
  //     if (result.data.url) {
  //       window.location.href = result.data.url;
  //     }
  //   } catch (error) {
  //     console.error("Checkout Error:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const {user} = useUser();
  const[userDetail,setUserDetail] = useState();

  useEffect(()=>{
   user&&GetUserDetail();
    },[user])



  const GetUserDetail= async ()=>{
    const result = await db.select().from(USER_TABLE)
    .where(eq(USER_TABLE.email,user?.primaryEmailAddress?.emailAddress))

    console.log("DB result:", result);
    setUserDetail(result[0]);
  }

  const handleCheckoutClick = async () => {
  if (loading) return; // Prevent double-clicks

  try {
    setLoading(true);

    const result = await axios.post("/api/payment/checkout", {
      priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_MONTHLY,
    });

    console.log("Stripe Checkout Session:", result.data);

    const checkoutUrl = result.data.session.url;
    console.log("Checkout URL:", checkoutUrl);

    if (checkoutUrl) {
      window.location.href = checkoutUrl;
    } else {
      console.error("Stripe returned no URL for checkout");
    }
  } catch (error) {
    console.error("Checkout Error:", error);
  } finally {
    setLoading(false);
  
  }
};

  const onPaymentManage = async () => {
  try {
    const result = await axios.post("/api/payment/manage-payment", {
      customerId: userDetail?.customerId,
    });

    console.log("Stripe Portal Session:", result.data);

    if (result.data.url) {
      window.location.href = result.data.url; // redirect
    }
  } catch (err) {
    console.error("Error managing payment:", err.response?.data || err);
  }
};


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full grid md:grid-cols-2 gap-8">

        {/* Free Plan */}
        <div className="bg-white p-8 rounded-lg shadow-md text-center border hover:border-blue-500 transition">
          <h2 className="text-xl font-semibold mb-4">Free</h2>
          <p className="text-4xl font-bold mb-4">
            $0 <span className="text-base font-normal">/month</span>
          </p>
          <ul className="mb-6 text-left space-y-2">
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✔</span>5 Course Generate
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✔</span>Limited Support
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✔</span>Email support
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✔</span>Help center access
            </li>
          </ul>
          <button className="text-blue-600 font-medium cursor-not-allowed">
            Current Plan
          </button>
        </div>

        {/* Monthly Plan */}
        <div
          className={`bg-white p-8 rounded-lg shadow-md text-center border-2 hover:border-blue-500 transition`}
        >
          <h2 className="text-xl font-semibold mb-4">Monthly</h2>
          <p className="text-4xl font-bold mb-4">
            9.99$ <span className="text-base font-normal">/month</span>
          </p>
          <ul className="mb-6 text-left space-y-2">
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✔</span>Unlimited Course Generate
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✔</span>Unlimited Flashcard, Quiz
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✔</span>Email support
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✔</span>Help center access
            </li>
          </ul>

          {userDetail?.member==false?<button
            onClick={handleCheckoutClick}
            disabled={loading}
            className={`w-full px-6 py-2 rounded ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            {loading ? "Processing..." : "Get Started"}
          </button>:

          <button
            onClick={onPaymentManage}
            disabled={loading}
            className={`w-full px-6 py-2 rounded ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            {loading ? "Processing..." : "Manage Payment"}
          </button>}
        </div>
      </div>
    </div>
    
  );
};

export default Upgrade;

