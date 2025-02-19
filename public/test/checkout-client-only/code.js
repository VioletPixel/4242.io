const outputElement = document.querySelector('#output');

const stripe = Stripe('pk_test_51O2hxMC4JnNRtz8VToJJbGHrFTPPr6TkP09h7ql3YJaqpNcxoSNxtk38glyzi9VrZKStns858YynOO2ZyGmU7VRi00CIUWuUdk');

var checkoutButton = document.getElementById('checkout-button');

checkoutButton.addEventListener('click', function () {
  stripe.redirectToCheckout({
    lineItems: [
      {
        price: 'price_1O2iazC4JnNRtz8V0W16eumP',
        quantity: 1
      },
    ],
    mode: 'payment',
    successUrl: window.location.href + '?session={CHECKOUT_SESSION_ID}',
    cancelUrl: window.location.href,
  })
  .then(function (result) {
    if (result.error) {
      outputElement.textContent = 'Error: ' + result.error.message;
    }
  });
});
