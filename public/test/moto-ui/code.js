const outputElement = document.querySelector('#output');

const form = document.querySelector('form');

const createPaymentMethodButton = document.querySelector('#create-payment-method');

const publishableKey = 'pk_test_51O2hxMC4JnNRtz8VToJJbGHrFTPPr6TkP09h7ql3YJaqpNcxoSNxtk38glyzi9VrZKStns858YynOO2ZyGmU7VRi00CIUWuUdk';

createPaymentMethodButton.addEventListener('click', async event => {
  const headers = new Headers({
    'Authorization': 'Bearer ' + publishableKey,
  });
  
  const data = new URLSearchParams(new FormData(form));
  
  const result = await fetch('https://api.stripe.com/v1/payment_methods', {
    method: 'POST',
    headers: headers,
    body: data,
  });
  
  const paymentMethod = await result.json();
  
  outputElement.textContent = JSON.stringify(paymentMethod, null, 2);
});
