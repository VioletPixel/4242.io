const outputElement = document.querySelector('#output');

const stripe = Stripe('pk_test_51O2hxMC4JnNRtz8VToJJbGHrFTPPr6TkP09h7ql3YJaqpNcxoSNxtk38glyzi9VrZKStns858YynOO2ZyGmU7VRi00CIUWuUdk');

const elements = stripe.elements({
  mode: 'payment',
  amount: 4200,
  currency: 'usd',
});

const paymentElement = elements.create('payment');
paymentElement.mount('#payment-element');

const payButton = document.querySelector('#payButton');

payButton.addEventListener('click', async event => {
  const {error: submitError} = await elements.submit();
  
  if (submitError) {
    output.textContent = JSON.stringify(submitError, null, 2);
    return;
  }
  
  const response = await fetch('?createPaymentIntent');
  
  const {clientSecret} = await response.json();
  
  const {error} = await stripe.confirmPayment({
    elements,
    clientSecret,
    confirmParams: {
      return_url: window.location.href,
    },
  });
  
  if (error) {
    outputElement.textContent = 'Error confirming payment: ' . error.message;
  }
});

// If the URL contains a Payment Intent's client secret, retrieve the Payment Intent and display it
const urlSearchParams = new URLSearchParams(window.location.search);

if (urlSearchParams.has('payment_intent_client_secret')) {
  stripe.retrievePaymentIntent(urlSearchParams.get('payment_intent_client_secret')).then(result => {
    if (result.error) {
      output.textContent = 'Unable to retrieve Payment Intent using client secret in URL: ' + JSON.stringify(result.error, null, 2);
      return;
    }
    
    output.textContent = "Payment Intent retrieved using client secret in URL:\n\n" + JSON.stringify(result.paymentIntent, null, 2);
  });
}
