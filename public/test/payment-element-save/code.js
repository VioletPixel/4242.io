const paymentMethodSavedSection = document.querySelector('#paymentMethodSaved');
const paymentMethodSavedReuseLink = document.querySelector('#paymentMethodSaved .reuseLink a');

const prepareToSaveSection = document.querySelector('#prepareToSaveSection');
const prepareToSaveButton = document.querySelector('#prepareToSave');

const savePaymentMethodSection = document.querySelector('#savePaymentMethodSection');
const savePaymentMethodLoadingElement = document.querySelector('#savePaymentMethodSection .loading');
const savePaymentMethodButton = document.querySelector('#savePaymentMethod');

const outputElement = document.querySelector('#output');

const stripe = Stripe('pk_test_51O2hxMC4JnNRtz8VToJJbGHrFTPPr6TkP09h7ql3YJaqpNcxoSNxtk38glyzi9VrZKStns858YynOO2ZyGmU7VRi00CIUWuUdk');

prepareToSaveButton.addEventListener('click', (event) => {
  prepareToSaveSection.hidden = true;
  prepareToSave();
});

async function prepareToSave() {
  savePaymentMethodSection.hidden = false;
    
  const result = await fetch('?prepareToSave');
  
  const response = await result.json();
  
  const elements = stripe.elements({
    clientSecret: response.setupIntentClientSecret,
    customerSessionClientSecret: response.customerSessionClientSecret,
  });
  
  const paymentElement = elements.create('payment');
  
  paymentElement.mount('#payment-element');
  
  savePaymentMethodButton.addEventListener('click', async (event) => {
    outputElement.innerHTML = 'Processing...';
    
    const {error} = await stripe.confirmSetup({
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
  
  savePaymentMethodLoadingElement.hidden = true;
}

// If the URL contains a Setup Intent's client secret, retrieve the Setup Intent and display it
const urlSearchParams = new URLSearchParams(window.location.search);

if (urlSearchParams.has('setup_intent_client_secret')) {
  (async () => {
    output.textContent = "Loading...";
    
    const setupIntentID = urlSearchParams.get('setup_intent');
    
    const result = await fetch('?showFullSetupIntent=' + setupIntentID);
    
    const response = await result.json();
    
    paymentMethodSavedReuseLink.href = '/test/payment-element-reuse?customer=' + response.customer.id;
    
    paymentMethodSavedSection.hidden = false;
    
    output.textContent = "The Setup Intent from the URL, retrieved with a secret key on the server with customer and payment_method expanded:\n\n" + JSON.stringify(response, null, 2);
  })();
}
