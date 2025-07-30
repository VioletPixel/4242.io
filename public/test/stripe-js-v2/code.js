const outputElement = document.querySelector('#output');

Stripe.setPublishableKey('pk_test_51O2hxMC4JnNRtz8VToJJbGHrFTPPr6TkP09h7ql3YJaqpNcxoSNxtk38glyzi9VrZKStns858YynOO2ZyGmU7VRi00CIUWuUdk');


document.getElementById('custom-button').addEventListener('click', function () {
  Stripe.card.createToken({
    number: document.getElementById('card-number').value,
    exp_month: document.getElementById('exp-month').value,
    exp_year: document.getElementById('exp-year').value,
    cvc: document.getElementById('cvc').value
  }, function(status, response) {
    // Handle the response from Stripe directly here
    outputElement.textContent =
        "Status: " + status + "\nresponse: \n" + JSON.stringify(response, undefined, 2);
  });
});
