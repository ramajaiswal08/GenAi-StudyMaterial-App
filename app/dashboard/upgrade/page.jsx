"use client";

import { cn } from "@/lib/utils";
import axios from "axios";
import React, { useState } from "react";

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
          className={`bg-white p-8 rounded-lg shadow-md text-center border-2  border hover:border-blue-500 transition`}
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

          <button
            onClick={handleCheckoutClick}
            disabled={loading}
            className={`w-full px-6 py-2 rounded ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            {loading ? "Processing..." : "Get Started"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default Upgrade;

