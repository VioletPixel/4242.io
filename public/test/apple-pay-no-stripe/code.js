const outputElement = document.querySelector('#output');

if (window.ApplePaySession) {
  ApplePaySession.canMakePaymentsWithActiveCard('merchant.4242.io.stripe').then(canMakePayments => {
    console.log(canMakePayments);
    outputElement.innerHTML = "canMakePaymentsWithActiveCard result: " + JSON.stringify(canMakePayments, null, 2);
  })
  .catch(error => {
    outputElement.textContent = error;
  });
}
else {
  outputElement.innerHTML = 'This page will only work in a browser that supports Apple Pay, like Safari.';
}
