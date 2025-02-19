const stripe = Stripe('pk_test_51O2zNKCHlokEYlHRvTSxtf7Xhv6hVRBfnMObfmlxgPhtT5rGvfzSPIT11kQ3KdXQn1bxZASNYZ2RKaYuYLFjeuM400bjPRpvrM');

const output = document.querySelector('#output');

const elements = stripe.elements({
  mode: 'payment',
  amount: 4200,
  currency: 'gbp',
});

const expressCheckoutElement = elements.create('expressCheckout', {
  wallets: {
    applePay: 'always',
    googlePay: 'always',
  },
  layout: {
    maxColumns: 1,
    overflow: 'never',
  }
});

expressCheckoutElement.mount('#express-checkout-element');

const baseLineItems = [
  {
    name: 'First line item',
    amount: 4000,
  },
  {
    name: 'Second line item',
    amount: 200,
  },
];

expressCheckoutElement.on('click', (event) => {
  event.resolve({
    emailRequired: true,
    phoneNumberRequired: true,
    shippingAddressRequired: true,
    allowedShippingCountries: ['US', 'GB'],
    shippingRates: [
      {
        id: 'first',
        displayName: 'First shipping rate display name',
        amount: 0,
        deliveryEstimate: {
          minimum: {
            unit: 'day',
            value: 3,
          },
            maximum: {
            unit: 'day',
            value: 7,
          },
        },
      },
      {
        id: 'second',
        displayName: 'Second shipping rate display name',
        amount: 500,
        deliveryEstimate: {
          minimum: {
            unit: 'day',
            value: 2,
          },
            maximum: {
            unit: 'day',
            value: 4,
          },
        },
      },
    ],
    lineItems: baseLineItems,
    applePay: {
      recurringPaymentRequest: {
        paymentDescription: 'Apple Pay recurring payment description',
        regularBilling: {
          amount: 4200,
          label: 'Regular billing label',
          recurringPaymentStartDate: new Date(),
          recurringPaymentEndDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
          recurringPaymentIntervalUnit: 'month',
          recurringPaymentIntervalCount: 12,
        },
        billingAgreement: 'Billing agreement',
        managementURL: window.location.href,
      },
    },
  });
});

expressCheckoutElement.on('shippingratechange', event => {
  const newLineItems = [
    ...baseLineItems,
    {
      name: event.shippingRate.displayName,
      amount: event.shippingRate.amount,
    },
  ];
  
  let newTotal = 0;
  newLineItems.forEach(lineItem => {
    newTotal += lineItem.amount;
  });
  
  elements.update({
    amount: newTotal,
  });
  
  event.resolve({
    lineItems: newLineItems,
  });
});

expressCheckoutElement.on('confirm', async event => {
  const {error: submitError} = await elements.submit();
  
  if (submitError) {
    output.textContent = JSON.stringify(submitError, null, 2);
    return;
  }
  
  const result = await fetch('?createPaymentIntent');
  
  const response = await result.json();
  
  const {error} = await stripe.confirmPayment({
    elements,
    clientSecret: response.clientSecret,
    confirmParams: {
      return_url: window.location.href,
    },
  });
  
  if (error) {
    output.textContent = error.message;
    return;
  }
});

// If the URL contains a Payment Intent's client secret, retrieve the Payment Intent and display it
const urlSearchParams = new URLSearchParams(window.location.search);

if (urlSearchParams.has('payment_intent_client_secret')) {
  stripe.retrievePaymentIntent(urlSearchParams.get('payment_intent_client_secret')).then(result => {
    if (result.error) {
      output.textContent = 'Unable to retrieve Payment Intent using client secret in URL: ' + JSON.stringify(result.error, null, 2);
      return;
    }
    
    output.textContent = "Payment Intent retrieved using client secret in URL:\n\n" + JSON.stringify(result.paymentIntent, null, 2);
  });
}