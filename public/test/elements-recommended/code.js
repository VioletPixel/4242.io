// Let's start by creating a reference to the output element, which is a regular HTML <pre> element that I'll add content to when different things happen.
const outputElement = document.querySelector('#output');

// Initialize Stripe.js with my publishable key
// Docs: https://docs.stripe.com/js/initializing
const stripe = Stripe('pk_test_51O2hxMC4JnNRtz8VToJJbGHrFTPPr6TkP09h7ql3YJaqpNcxoSNxtk38glyzi9VrZKStns858YynOO2ZyGmU7VRi00CIUWuUdk');

// Create a Stripe Elements instance with details about the transaction.
// Docs: https://docs.stripe.com/js/elements_object/create
const elements = stripe.elements({
  mode: 'payment',
  amount: 4200,
  currency: 'usd',
});

// There are two ways to pay on this page: you can use the Express Checkout Element or you can use the payment form below it.  In both cases a Payment Intent will need to be created on my server, and that Payment Intent will need to be confirmed client-side.  This function handles that process for both flows, and avoids repeating this code in two places.
const processPayment = async () => {
  // Ask the server to create a Payment Intent
  // Note: In a real integration there would be security measures in place (e.g., rate limiting, customer authentication, captcha, etc.) here to prevent abuse (like card testing)
  // Note: In a real integration there would be error handling here so unexpected responses from the server could be handled gracefully
  const response = await fetch('?createPaymentIntent');
  
  // Extract the client secret from the response
  const {clientSecret} = await response.json();
  
  // Attempt to confirm the payment
  const {error} = await stripe.confirmPayment({
    elements, // The Stripe Elements instance, which gives this function access to all the information the customer provided to the Stripe Elements they interacted with
    clientSecret, // The client secret from the Payment Intent, which gives Stripe.js access to confirm it with the payment and other information provided by the customer
    confirmParams: {
      // After the payment process is complete, the customer will be sent to this URL
      // Note: The customer may be initially redirected to a different URL (e.g., a bank's website) before being sent to the URL provided here
      return_url: window.location.origin + window.location.pathname,
    },
  });
  
  // If there's an immediate error, confirmPayment will return an error instead of redirecting to another page, which I display in the output element
  // Normally this code won't run, because confirmPayment will be successful and redirect to another page
  if (error) {
    outputElement.textContent = JSON.stringify(error, null, 2);
  }
};

// Create a reference to the HTML element that will contain the Express Checkout Element
const expressCheckoutElementContainer = document.querySelector('#express-checkout-element');

// Create an Express Checkout Element
const expressCheckoutElement = elements.create('expressCheckout', {
  // Show the "buy" variant of these buttons.
  // Docs: https://docs.stripe.com/js/elements_object/create_express_checkout_element#express_checkout_element_create-options-buttonTheme
  buttonType: {
    applePay: 'buy',
    googlePay: 'buy',
    paypal: 'buynow',
  },
  layout: {
    maxColumns: 1, // Stack the express payment buttons vertically
    overflow: 'never', // Prevents express payment options from being hidden
  },
});
// Mount the Express Checkout Element to the HTML container
expressCheckoutElement.mount(expressCheckoutElementContainer);

// Create a reference to the HTML element containing the express payment instructions
const expressCheckoutInstructions = document.querySelector('#express-payment-instructions');

// Listen for ready events from the Express Checkout Element
expressCheckoutElement.on('ready', event => {
  // Once the Express Checkout Element is ready to go, the ready event will contain an availablePaymentMethods property that will either be undefined (if no express payment options are available) or an object containing details about the express payment options that are available.  I only want to show the Express Checkout Element container and the associated instructions if there's at least one express payment option available
  if (event.availablePaymentMethods) {
    expressCheckoutElementContainer.classList.remove('irrelevant');
    expressCheckoutInstructions.classList.remove('irrelevant');
  }
});

// Listen for click events from the Express Checkout Element
expressCheckoutElement.on('click', async event => {
  // When the Express Checkout Element is clicked, I need to specify the options I want for the payment UI that's about to be displayed.  I do this by calling the resolve function on the event with an object containing the options I want
  // Docs: https://docs.stripe.com/js/element/events/on_click?type=expressCheckoutElement
  event.resolve({
    shippingAddressRequired: true,
    // When requiring a shipping address, you must specify at least one shipping rate
    shippingRates: [
      {
        // This ID must be unique among these shipping rates, and is an ID I need to create.  In a real integration, this would likely be a shipping option ID I would fetch from my server.
        id: 'free_shipping',
        displayName: 'Free shipping',
        amount: 0,
        deliveryEstimate: {
          minimum: {
            unit: 'day',
            value: 3,
          },
          maximum: {
            unit: 'day',
            value: 5,
          },
        },
      },
    ],
  });
});

// Listen for confirm events from the Express Checkout Element
// The Express Checkout Element will emit a confirm event when the customer confirms the payment should happen in the payment UI shown by the Express Checkout Element.  For example, when the Express Checkout Element displays the Apple Pay payment sheet, and the customer uses Touch ID to authenticate the payment and move the process forward, that will trigger the Express Checkout Element's confirm event.
expressCheckoutElement.on('confirm', async event => {
  // This is the custom function I created above to encapsulate the shared processing logic for the Express Checkout Element and payment form flows.
  await processPayment();
});

// Create the Address Element in shipping mode
const addressElementShipping = elements.create('address', {
  mode: 'shipping',
});
// Mount the Address Element to the HTML container.
// Note: In this case a CSS selector is used to identify the HTML container. I previously used a JavaScript variable which contained the HTML element in question; you can use either approach when mounting Stripe Elements.
addressElementShipping.mount('#address-element-shipping');

// Create an Address Element in billing mode
// Note: By default, when using two Address Elements in billing and shipping mode, the Address Element in billing mode will show a "Billing is same as shipping information" checkbox at the top which when checked, will hide the rest of the billing Address Element and use the shipping address for both shipping and billing
const addressElementBilling = elements.create('address', {
  mode: 'billing',
});

// Mount the Address Element to the HTML container.
addressElementBilling.mount('#address-element-billing');

// Create and mount the Payment Element.
const paymentElement = elements.create('payment', {
  layout: {
    type: 'accordion', // Show payment options in a list
    defaultCollapsed: true, // Don't select any payment option by default (this works well with the Express Checkout Element; if a payment option in the Payment Element is selected by default customers might skip down to the form instead of clicking on a faster, higher-converting express option)
    radios: false, // Don't show radio buttons next to payment options
    spacedAccordionItems: true, // Make payment options appear as individual buttons
  },
});
paymentElement.mount('#payment-element');

// Create a reference to the buy button.
const buyButton = document.querySelector('#buy');

// Add a click event listener to the buy button.
buyButton.addEventListener('click', async event => {
  // elements.submit() triggers form validation for the Address Element and Payment Element.  If I wasn't using Express Checkout Element, this would also trigger the payment process for express payment options like Apple Pay and Google Pay.  In this flow, this must me called immediately in a gesture handler (in this case, the click event handler) before any other operations, like the async process below to process the payment, which involves a fetch request to my server.
  // Docs: https://docs.stripe.com/js/elements/submit
  const {error: submitError} = await elements.submit();
  
  // If elements.submit() produces an error, display it and don't continue further.
  if (submitError) {
    output.textContent = JSON.stringify(submitError, null, 2);
    return;
  }
  
  // This is the custom function I created above to encapsulate the shared processing logic for the Express Checkout Element and payment form flows.
  await processPayment();
});

// If the URL contains a Payment Intent's client secret, retrieve the Payment Intent and display it in the output element.
// This is only for the purposes of this demo and wouldn't be part of a real integration, so the code below isn't commented in detail.
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
