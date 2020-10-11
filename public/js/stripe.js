import axios from 'axios';
import { showAlert } from './alerts';

const stripe = Stripe(
  'pk_test_51Hb6v7ByMnCPpthAHyburrtb52tf1ft5TNVDnFOR3qKQT9Uv1QcWpzVHHN8xEPZwQxNj3LSPbAs9le7N4niIn6Lp000O8oqIH5',
);

export const bookTour = async tourId => {
  try {
    // get the session from the server
    const session = await axios(
      `http://127.0.0.1:3001/api/v1/booking/checkout/${tourId}`,
    );

    // create checkout form + charge the credit card
    await stripe.redirectToCheckout({
        sessionId: session.data.session.id
    })
  } catch (err) {
      console.log(err);
      showAlert('error', err);
  }
};
