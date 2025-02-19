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

$('#pay-button').click(payFunction);

function payFunction() {
  outputElement.textContent = 'Processing...';
  
  // Get a Payment Intent client secret.
  fetch('?create-payment-intent').then(function (result) {
    return result.json();
  }).then(function (response) {
    const clientSecret = response.client_secret;
    
    if (!clientSecret) {
      outputElement.textContent = 'Error: Unable to obtain clientSecret!';
      return;
    }
    
    stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardNumberElement,
      },
      return_url: window.location.href,
    }, {
      handleActions: false,
    }).then(function (result) {
      if (result.error) {
        console.log('confirmCardPayment error:', result.error);
        outputElement.textContent = 'Error handling card payment: ' + result.error.message;
        return;
      }
      
      outputElement.textContent = "Success!\n\n" + JSON.stringify(result.paymentIntent, null, 2);
    });
  });
}
