const stripe = Stripe('pk_test_51O2hxMC4JnNRtz8VToJJbGHrFTPPr6TkP09h7ql3YJaqpNcxoSNxtk38glyzi9VrZKStns858YynOO2ZyGmU7VRi00CIUWuUdk');

const formElement = document.querySelector('#theForm');
const outputElement = document.querySelector('#output');

formElement.onsubmit = (event) => {
  event.preventDefault();
};

const elements = stripe.elements();      
const cardElement = elements.create('card');

cardElement.mount('#card-element');

cardElement.on('change', event => {
  console.log('cardElement change event:', JSON.stringify(event));
  
  if (!event.complete) {
    cardElementContainer.classList.add('incomplete');
  }
  else {
    cardElementContainer.classList.remove('incomplete');
  }
});

window.addEventListener('load', function () {
  cardElement.focus();
});

/* Pay with Card Number */

const payWithCardNumberButton = document.querySelector('#payWithCardNumber');

payWithCardNumberButton.addEventListener('click', async (event) => {
  outputElement.innerHTML = 'Processing...';
  
  // Get a Payment Intent client secret.
  const paymentIntentResponse = await fetch('?create-payment-intent');
  
  const {client_secret: clientSecret} = await paymentIntentResponse.json();

  if (!clientSecret) {
    outputElement.innerHTML = 'Error: Unable to obtain clientSecret!';
    return;
  }
  
  console.log('Got Payment Intent client secret! (' + clientSecret + ')');
  
  const {error, paymentIntent} = await stripe.confirmCardPayment(clientSecret, {
    payment_method: {
      card: cardElement,
    }
  });
  
  if (error) {
    console.log('confirmCardPayment error:', error);
    outputElement.innerHTML = 'Error handling card payment: <code>' + error.message + '</code>';
    return;
  }
  
  console.log('Payment Intent:', paymentIntent);
  
  outputElement.innerHTML = "Payment succeeded!\n\n" + JSON.stringify(paymentIntent, null, 2);
});

/* Create Payment Method with Card Button */

const createPaymentMethodButton = document.querySelector('#createPaymentMethodWithCardNumber');

createPaymentMethodButton.addEventListener('click', async (event) => {
  outputElement.innerHTML = 'Processing...';
  
  const {error, paymentMethod} = await stripe.createPaymentMethod({
    type: 'card',
    card: cardElement,
  });
  
  if (error) {
    console.log('createPaymentMethodError error:', error);
    outputElement.innerHTML = 'Error creating Payment Method: ' + error.message;
    return;
  }
  
  console.log('Payment Method:', paymentMethod);
  
  outputElement.innerHTML = "Payment Method created!\n\n" + JSON.stringify(paymentMethod, null, 2);
});

/* Create Token with Card Button */

const createTokenButton = document.querySelector('#createTokenWithCardNumber');

createTokenButton.addEventListener('click', async (event) => {
  outputElement.innerHTML = 'Processing...';
  
  const {error, token} = await stripe.createToken(cardElement);
  
  if (error) {
    console.log('createTokenError error:', error);
    outputElement.innerHTML = 'Error creating Token: ' + error.message;
    return;
  }
  
  console.log('Token:', token);
  
  outputElement.innerHTML = "Token created!\n\n" + JSON.stringify(token, null, 2);
});

/* Create Source with Card Button */

const createSourceButton = document.querySelector('#createSourceWithCardNumber');

createSourceButton.addEventListener('click', async (event) => {
  outputElement.innerHTML = 'Processing...';
  
  const {error, source} = await stripe.createSource(cardElement, {
    type: 'card',
  });
  
  if (error) {
    console.log('createSourceError error:', error);
    outputElement.innerHTML = 'Error creating Source: ' + error.message;
    return;
  }
  
  console.log('Source:', source);
  
  outputElement.innerHTML = "Source created!\n\n" + JSON.stringify(source, null, 2);
});
