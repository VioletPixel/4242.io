const outputElement = document.querySelector('#output');

const stripe = Stripe('pk_test_51O2hxMC4JnNRtz8VToJJbGHrFTPPr6TkP09h7ql3YJaqpNcxoSNxtk38glyzi9VrZKStns858YynOO2ZyGmU7VRi00CIUWuUdk');

async function initializePaymentElement() {
  const result = await fetch('?createPaymentIntent');
  
  const response = await result.json();
  
  const elements = stripe.elements({
    clientSecret: response.clientSecret,
  });
  
  const paymentElement = elements.create('payment');
  
  paymentElement.mount('#payment-element');
  
  const payButton = document.querySelector('#payButton');
  
  payButton.addEventListener('click', async (event) => {
    outputElement.innerHTML = 'Processing...';
    
    const {error} = await stripe.confirmPayment({
      elements: elements,
      confirmParams: {
        return_url: window.location.href,
      }
    });
      
    if (error) {
      outputElement.textContent = 'Error: Unable to confirm payment: ' + error.message;
      console.log({error});
    }
  });
}

initializePaymentElement();

// If the URL contains a Payment Intent's client secret, retrieve the Payment Intent and display it
const urlSearchParams = new URLSearchParams(window.location.search);

if (urlSearchParams.has('payment_intent_client_secret')) {
  stripe.retrievePaymentIntent(urlSearchParams.get('payment_intent_client_secret')).then(result => {
    if (result.error) {
      output.textContent = "Unable to retrieve Payment Intent using client secret in URL:\n\n" + JSON.stringify(result.error, null, 2);
      return;
    }
    
    output.textContent = "Payment Intent retrieved using client secret in URL:\n\n" + JSON.stringify(result.paymentIntent, null, 2);
  });
}
