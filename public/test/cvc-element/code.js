const outputElement = document.querySelector('#output');

const stripe = Stripe('pk_test_51O2hxMC4JnNRtz8VToJJbGHrFTPPr6TkP09h7ql3YJaqpNcxoSNxtk38glyzi9VrZKStns858YynOO2ZyGmU7VRi00CIUWuUdk');

const elements = stripe.elements();

const cardCvcElement = elements.create('cardCvc');

cardCvcElement.mount('#card-cvc-element');

const createCvcTokenButton = document.querySelector('#createCvcToken');

createCvcTokenButton.addEventListener('click' , async (event) => {
  outputElement.textContent = 'Processing...';
  
  const {token, error} = await stripe.createToken('cvc_update', cardCvcElement);
  
  if (error) {
    outputElement.textContent = 'Error creating CVC token: ' + error.message;
    return;
  }
  
  outputElement.textContent = "CVC Token created!\n\n" + JSON.stringify(token, null, 2);
});
