// import { NextResponse } from "next/server";
// import Stripe from "stripe";

// export async function POST(req) {
//     const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//     const {priceId} = await req.json();

//     const session = await stripe.checkout.session.create({
//         mode: "subscription",
//         line_items: [
//             {
//                 price: priceId,
//                 //for metered billing,do not pass quantity
//                 quantity : 1,
//             },
//         ],
//         success_url : process.env.HOST_URL+"payment-sucess?.session_id+{CHECKOUT_SESSION_ID}",
//         cancel_url : process.env.HOST_URL
//     });
//     return NextResponse.json({session})
// }

import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req) {
    try {
        console.log("HOST_URL:", process.env.HOST_URL);
        console.log("STRIPE_SECRET_KEY:", process.env.STRIPE_SECRET_KEY);
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

        const { priceId } = await req.json();

        const session = await stripe.checkout.sessions.create({  // plural 'sessions'
            mode: "subscription",
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            success_url: `${process.env.HOST_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: process.env.HOST_URL,
        });

        return NextResponse.json({ session });
    } catch (error) {
        console.error("Checkout Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
};
