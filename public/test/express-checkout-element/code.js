const output = document.querySelector('#output');

function appendToOutput(string) {
    const output = document.querySelector('#output');
    
    if (!output.textContent) {
      output.textContent = string;
    }
    else {
      output.textContent += "\n\n" + string;
    }
}

// US

const stripe = Stripe('pk_test_51O2hxMC4JnNRtz8VToJJbGHrFTPPr6TkP09h7ql3YJaqpNcxoSNxtk38glyzi9VrZKStns858YynOO2ZyGmU7VRi00CIUWuUdk');

const elements = stripe.elements({
  mode: 'payment',
  amount: 4200,
  currency: 'usd',
});

const expressCheckoutElement = elements.create('expressCheckout', {
  layout: {
    overflow: 'never',
  },
});

expressCheckoutElement.on('ready', event => {
  appendToOutput("US Express Checkout Element emitted `ready` event:\n\n" + JSON.stringify(event, null, 2));
});

expressCheckoutElement.mount('#express-checkout-element');

expressCheckoutElement.on('click', async event => {
  event.resolve({
    shippingAddressRequired: false,
    phoneNumberRequired: true,
  });
});

expressCheckoutElement.on('confirm', async event => {
  console.log('Express Checkout Element confirm event:', JSON.stringify(event, null, 2));
  
  const {error: submitError} = await elements.submit();
  
  if (submitError) {
    output.textContent = JSON.stringify(submitError, null, 2);
    return;
  }
  
  const result = await fetch('?createPaymentIntent');
  
  const response = await result.json();
  
  const {error} = await stripe.confirmPayment({
    elements: elements,
    clientSecret: response.clientSecret,
    confirmParams: {
      return_url: window.location.origin + window.location.pathname + '?country=US',
    },
  });
  
  if (error) {
    output.textContent = error.message;
    return;
  }
});

// GB

const stripeGB = Stripe('pk_test_51O2zNKCHlokEYlHRvTSxtf7Xhv6hVRBfnMObfmlxgPhtT5rGvfzSPIT11kQ3KdXQn1bxZASNYZ2RKaYuYLFjeuM400bjPRpvrM');

const elementsGB = stripeGB.elements({
  mode: 'payment',
  amount: 4200,
  currency: 'gbp',
});

const expressCheckoutElementGB = elementsGB.create('expressCheckout', {
  layout: {
    overflow: 'never',
  },
});

expressCheckoutElementGB.on('ready', event => {
  appendToOutput("GB Express Checkout Element emitted `ready` event:\n\n" + JSON.stringify(event, null, 2));
});

expressCheckoutElementGB.mount('#express-checkout-element-gb');

expressCheckoutElementGB.on('click', async event => {
  event.resolve({
    shippingAddressRequired: false,
    phoneNumberRequired: true,
  });
});

expressCheckoutElementGB.on('confirm', async event => {
  console.log('Express Checkout Element confirm event:', JSON.stringify(event, null, 2));
  
  const {error: submitError} = await elementsGB.submit();
  
  if (submitError) {
    output.textContent = JSON.stringify(submitError, null, 2);
    return;
  }
  
  const result = await fetch('?createPaymentIntentGB');
  
  const response = await result.json();
  
  const {error} = await stripeGB.confirmPayment({
    elements: elementsGB,
    clientSecret: response.clientSecret,
    confirmParams: {
      return_url: window.location.origin + window.location.pathname + '?country=GB',
    },
  });
  
  if (error) {
    output.textContent = error.message;
    return;
  }
});

// If the URL contains a Payment Intent's client secret, retrieve the Payment Intent and display it
const urlSearchParams = new URLSearchParams(window.location.search);

if (urlSearchParams.has('payment_intent_client_secret')) {
  let stripeInstance;
  
  if (urlSearchParams.get('country') == 'US') {
    stripeInstance = stripe;
  }
  else if (urlSearchParams.get('country') == 'GB') {
    stripeInstance = stripeGB;
  }
  
  stripeInstance.retrievePaymentIntent(urlSearchParams.get('payment_intent_client_secret')).then(result => {
    if (result.error) {
      output.textContent = 'Unable to retrieve Payment Intent using client secret in URL: ' + JSON.stringify(result.error, null, 2);
      return;
    }
    
    output.textContent = "Payment Intent retrieved using client secret in URL:\n\n" + JSON.stringify(result.paymentIntent, null, 2);
  });
}
