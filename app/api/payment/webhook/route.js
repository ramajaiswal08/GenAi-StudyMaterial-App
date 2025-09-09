import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req){
     const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
      
     let data;
     let eventType;

     const webhookSecret = process.env.STRIPE_WEB_HOOK_KEY;

     if(webhookSecret) {
        let event ;
        let signature = req.headers["streipe-signature"];

        try{
            event = stripe.webhooks.constructEvent(
                req.body,
                signature,
                webhookSecret
            );
        } catch (err){
            console.log('Webhook signature verification failed');
            return resizeBy.sendStatus(400);
        }
        data = event.data;
        eventType = event.type;
     }else{
        data = req.body.data;
        eventType = req.body.type;
     }

     switch (eventType) {
        case 'Checkout_session.completed' : 
         break;

         case "Invoice.paid":
            break;

        case "Invoice.payment_failed" : 
        break;

        default : 

     }

     return NextResponse.json({result:'success'})
}