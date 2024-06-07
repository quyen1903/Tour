/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
import Stripe from 'stripe';
const stripe = new Stripe('stripe')('sk_test_51OfkV4IrBUVqHQdwtMe5WvpeoS8TQzj4cXv4m7c31Mwwtj3YSytZPgQLbx7UQh2VJHkaIuQu34qa3LnQldFUgnZh00fTYAhuIw');

export const bookTour = async tourId => {
  try {
    // 1) Get checkout session from API
    const session = await axios(`https://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`);
    // console.log(session);

    // 2) Create checkout form + chanre credit card
    // await stripe.redirectToCheckout({
    //     sessionId: session.data.sessionId
    // });
    window.location.href = session.data.url;

  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
