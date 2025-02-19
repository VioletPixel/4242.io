const stripe = Stripe('pk_test_51O2zNKCHlokEYlHRvTSxtf7Xhv6hVRBfnMObfmlxgPhtT5rGvfzSPIT11kQ3KdXQn1bxZASNYZ2RKaYuYLFjeuM400bjPRpvrM');

const output = document.querySelector('#output');

const elements = stripe.elements({
  mode: 'payment',
  amount: 4200,
  currency: 'gbp',
});

const expressCheckoutElement = elements.create('expressCheckout');

expressCheckoutElement.mount('#express-checkout-element');

expressCheckoutElement.on('confirm', async event => {
  const {error: submitError} = await elements.submit();
  
  if (submitError) {
    output.textContent = JSON.stringify(submitError, null, 2);
    return;
  }
  
  /*
  Scenario: imagine performing an inventory check here, and you find that
  you're out of stock.  At this point you want to dismiss the payment interface
  and display a custom error message.
  
  Ideally event.paymentFailed would allow you to provide a custom error message
  and/or allow you to dismiss the payment interface, but currently (as of
  December 2023) this is not possible, so the unmount/remount hack below must
  be used instead.
  */
  
  // Unmounting the Express Checkout Element dismisses the payment interface
  expressCheckoutElement.unmount();
  
  // You can optionally mount it again if you want
  expressCheckoutElement.mount('#express-checkout-element');
  
  // Let the customer know things are out of stock
  alert('Out of stock!');
});

