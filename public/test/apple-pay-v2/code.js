const outputElement = document.querySelector('#output');

Stripe.setPublishableKey('pk_test_51O2hxMC4JnNRtz8VToJJbGHrFTPPr6TkP09h7ql3YJaqpNcxoSNxtk38glyzi9VrZKStns858YynOO2ZyGmU7VRi00CIUWuUdk');

Stripe.applePay.checkAvailability(function (available) {
  if (available) {
    document.getElementById('apple-pay-button').style.display = 'block';
    document.getElementById('apple-pay-button').addEventListener('click', function () {
      const paymentRequest = {
        countryCode: 'US',
        currencyCode: 'USD',
        total: {
          label: 'Total label',
          amount: '42.00'
        }
      };
      
      const session = Stripe.applePay.buildSession(paymentRequest, function (result, completion) {
        outputElement.textContent = "Success!\n\n" + JSON.stringify(result, null, 2);
        // This is where you would use the result to create a Charge
        completion(ApplePaySession.STATUS_SUCCESS);
      }, function (error) {
        outputElement.textContent = "Failure!\n\n" + JSON.stringify(error, null, 2);
        completion(ApplePaySession.STATUS_FAILURE);
      });
      
      session.oncancel = function (event) {
        outputElement.textContent = "User canceled:\n\n" + JSON.stringify(event, null, 2);
      };
      
      session.begin();
    });
  }
});
