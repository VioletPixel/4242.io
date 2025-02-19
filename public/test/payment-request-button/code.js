const stripe = Stripe('pk_test_51O2hxMC4JnNRtz8VToJJbGHrFTPPr6TkP09h7ql3YJaqpNcxoSNxtk38glyzi9VrZKStns858YynOO2ZyGmU7VRi00CIUWuUdk');

const output = document.querySelector('#output');

const paymentRequest = stripe.paymentRequest({
  country: 'US',
  currency: 'usd',
  total: {
    label: 'Total label',
    amount: 4200,
  },
});

const elements = stripe.elements();

const paymentRequestButton = elements.create('paymentRequestButton', {
  paymentRequest: paymentRequest,
});

(async () => {
  const result = await paymentRequest.canMakePayment();
  
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
