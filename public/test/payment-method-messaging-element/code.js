const stripe = Stripe('pk_test_51O2hxMC4JnNRtz8VToJJbGHrFTPPr6TkP09h7ql3YJaqpNcxoSNxtk38glyzi9VrZKStns858YynOO2ZyGmU7VRi00CIUWuUdk');

const elements = stripe.elements();

const paymentMethodMessagingElement = elements.create('paymentMethodMessaging', {
  amount: 14200,
  currency: 'USD',
  countryCode: 'US',
});

paymentMethodMessagingElement.mount('#payment-method-messaging-element');
