const outputElement = document.querySelector('#output');

const stripe = Stripe('pk_test_51O2hxMC4JnNRtz8VToJJbGHrFTPPr6TkP09h7ql3YJaqpNcxoSNxtk38glyzi9VrZKStns858YynOO2ZyGmU7VRi00CIUWuUdk');

async function goToCheckout() {
  const result = await fetch('?createCheckoutSession');
  
  const response = await result.json();
  
  const redirect = await stripe.redirectToCheckout({
    sessionId: response.checkoutSessionID,
  });
  
  if (redirect.error) {
    outputElement.textContent = 'Error redirecting to Checkout: ' + JSON.stringify(redirect.error, true, 2);
  }
}

const checkoutButton = document.querySelector('#checkout');

checkoutButton.addEventListener('click', event => {
  goToCheckout();
});
