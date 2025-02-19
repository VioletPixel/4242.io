const stripe = Stripe('pk_test_51O2hxMC4JnNRtz8VToJJbGHrFTPPr6TkP09h7ql3YJaqpNcxoSNxtk38glyzi9VrZKStns858YynOO2ZyGmU7VRi00CIUWuUdk');

const output = document.querySelector('#output');

const paymentRequest = stripe.paymentRequest({
  country: 'US',
  currency: 'usd',
  displayItems: [
    {
      label: '30 Day Trial',
      amount: 0,
    },
    {
      label: 'Future Monthly Payments',
      amount: 4200,
    },
  ],
  total: {
    label: 'Example Merchant', // Will be prefixed with "Pay"
    amount: 0,
  },
  requestPayerName: true,
  requestPayerEmail: true,
  requestPayerPhone: true,
  requestShipping: true,
  shippingOptions: [
    {
      id: 'first',
      label: 'First shipping option label',
      detail: 'First shipping option detail',
      amount: 0,
    },
    {
      id: 'second',
      label: 'Second shipping option label',
      detail: 'Second shipping option detail',
      amount: 500,
    },
    {
      id: 'third',
      label: 'Second shipping option label',
      detail: 'Second shipping option detail',
      amount: 1000,
    },
  ],
});

const elements = stripe.elements();

const paymentRequestButton = elements.create('paymentRequestButton', {
  paymentRequest: paymentRequest,
});

(async () => {
  const result = await paymentRequest.canMakePayment();
  
  console.log('canMakePayment result:', result);
  output.textContent += "canMakePayment result:\n\n" + JSON.stringify(result, null, 2);
  
  if (result) {
    paymentRequestButton.mount('#payment-request-button');
  } else {
    document.getElementById('payment-request-button').style.display = 'none';
  }
})();

paymentRequest.on('paymentmethod', function(event) {
  output.textContent = "paymentmethod event:\n\n" + JSON.stringify(event, null, 2);
  event.complete('success');
});
