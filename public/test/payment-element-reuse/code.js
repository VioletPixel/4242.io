const thisPath = '/test/payment-element-reuse';

const loadingElement = document.querySelector('#loading');

const demoCustomerSection = document.querySelector('#demoCustomer');
const createDemoCustomerButton = document.querySelector('#createDemoCustomer');
createDemoCustomerButton.addEventListener('click', createDemoCustomer);

const paymentFormSection = document.querySelector('#paymentForm');
const paymentFormCustomerInfoElement = document.querySelector('#paymentForm .customerInfo');
const payButton = document.querySelector('#pay');

const outputElement = document.querySelector('#output');

const urlSearchParams = new URLSearchParams(window.location.search);

const stripe = Stripe('pk_test_51O2hxMC4JnNRtz8VToJJbGHrFTPPr6TkP09h7ql3YJaqpNcxoSNxtk38glyzi9VrZKStns858YynOO2ZyGmU7VRi00CIUWuUdk');

async function createDemoCustomer() {
  const result = await fetch('?createDemoCustomer');
  
  const response = await result.json();
  
  window.location.href = thisPath + '?customer=' + response.customerID;
}

async function prepareToPay() {
  const customerID = urlSearchParams.get('customer');
  
  const result = await fetch('?prepareToPay=' + customerID);
  
  const response = await result.json();
  
  paymentFormCustomerInfoElement.innerHTML = 'Customer Session created for <code>' + customerID + '</code><br><small><a href="/test/payment-element-reuse/">Stop using this Customer</a></small>';
  
  const elements = stripe.elements({
    clientSecret: response.paymentIntentClientSecret,
    customerSessionClientSecret: response.customerSessionClientSecret,
  });
  
  const paymentElement = elements.create('payment');
  
  paymentElement.mount('#payment-element');
  
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
  
  loadingElement.hidden = true;
}

// If there's no Customer ID, display the form to create a demo Customer
if (!urlSearchParams.has('customer')) {
  demoCustomerSection.hidden = false;
  loadingElement.hidden = true;
}
// If there is a Customer ID, initialize and display the Payment Element
else {
  paymentFormSection.hidden = false;
  prepareToPay();
}

// If the URL contains a Payment Intent's client secret, retrieve the Setup Intent and display it
if (urlSearchParams.has('payment_intent_client_secret')) {
  stripe.retrievePaymentIntent(urlSearchParams.get('payment_intent_client_secret')).then(result => {
    if (result.error) {
      output.textContent = "Unable to retrieve Payment Intent using client secret in URL:\n\n" + JSON.stringify(result.error, null, 2);
      return;
    }
    
    output.textContent = "Payment Intent retrieved using client secret in URL:\n\n" + JSON.stringify(result.paymentIntent, null, 2);
  });
}
