async function embedCheckout() {
  const stripe = Stripe('pk_test_51O2hxMC4JnNRtz8VToJJbGHrFTPPr6TkP09h7ql3YJaqpNcxoSNxtk38glyzi9VrZKStns858YynOO2ZyGmU7VRi00CIUWuUdk');

  const result = await fetch('?createCheckoutSession');
  
  const response = await result.json();
  
  const checkout = await stripe.initEmbeddedCheckout({
    clientSecret: response.clientSecret,
  });
  
  checkout.mount('#checkout');
}

embedCheckout();

// If the URL contains a Checkout Session ID display it in the output element
const urlSearchParams = new URLSearchParams(window.location.search);

const checkoutSessionIdFromURL = urlSearchParams.get('session');

if (urlSearchParams.has('session')) {
  output.textContent = 'Checkout Session ID from URL: ' + urlSearchParams.get('session');
}
