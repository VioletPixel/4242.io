const outputElement = document.querySelector('#output');

const stripe = Stripe('pk_test_51O2hxMC4JnNRtz8VToJJbGHrFTPPr6TkP09h7ql3YJaqpNcxoSNxtk38glyzi9VrZKStns858YynOO2ZyGmU7VRi00CIUWuUdk');

const elements = stripe.elements();

const cardNumberElement = elements.create('cardNumber');

cardNumberElement.mount('#card-element-number');

const cardExpirationElement = elements.create('cardExpiry');

cardExpirationElement.mount('#card-element-expiration');

const cardCVCElement = elements.create('cardCvc');

cardCVCElement.mount('#card-element-cvc');

const postalCodeElement = elements.create('postalCode');

postalCodeElement.mount('#card-element-postal-code');

const payButton = document.querySelector('#pay-button');

payButton.addEventListener('click', async (event) => {
  outputElement.textContent = 'Processing...';
  
  // Get a Payment Intent client secret.
  const paymentIntentResponse = await fetch('?create-payment-intent');
  
  const {client_secret: clientSecret} = await paymentIntentResponse.json();

  if (!clientSecret) {
    outputElement.textContent = 'Error: Unable to obtain clientSecret!';
    return;
  }
  
  const {error, paymentIntent} = await stripe.confirmCardPayment(clientSecret, {
    payment_method: {
      card: cardNumberElement,
    }
  });
  
  if (error) {
    console.log('confirmCardPayment error:', error);
    outputElement.textContent = 'Error handling card payment: ' + error.message;
    return;
  }
  
  outputElement.textContent = "Success!\n\n" + JSON.stringify(paymentIntent, null, 2);
});
