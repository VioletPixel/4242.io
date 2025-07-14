const outputElement = document.querySelector('#output');

const stripe = Stripe('pk_test_51O2hxMC4JnNRtz8VToJJbGHrFTPPr6TkP09h7ql3YJaqpNcxoSNxtk38glyzi9VrZKStns858YynOO2ZyGmU7VRi00CIUWuUdk');

async function initCheckout() {
  const result = await fetch('?createCheckoutSession');

  const response = await result.json();

  const fetchClientSecret = async () => {
    return response.clientSecret;
  }

  let checkout = await stripe.initCheckout({
    fetchClientSecret,
    elementsOptions: {
      appearance: {
        theme: 'stripe',
      },
    },
  });

  const validateEmail = async (email) => {
    const updateResult = await checkout.updateEmail(email);
    const isValid = updateResult.type !== "error";

    return { isValid, message: !isValid ? updateResult.error.message : null };
  };

  const emailInput = document.getElementById("email");
  const emailErrors = document.getElementById("email-errors");
  emailInput.addEventListener("input", () => {
    // Clear any validation errors
    emailErrors.textContent = "";
    emailInput.classList.remove("error");
  });

  emailInput.addEventListener("blur", async () => {
    const newEmail = emailInput.value;
    if (!newEmail) {
      return;
    }

    const { isValid, message } = await validateEmail(newEmail);
    if (!isValid) {
      emailInput.classList.add("error");
      emailErrors.textContent = message;
    }
  });

  var eceElement = checkout.createExpressCheckoutElement();
  eceElement.mount("#checkout-express-checkout-element");

  const paymentElement = checkout.createPaymentElement();
  paymentElement.mount('#checkout-payment-element');

  const billingAddressElement = checkout.createBillingAddressElement();
  billingAddressElement.mount("#checkout-billing-address-element");

  const payButton = document.querySelector('#payButton');

  payButton.addEventListener('click', async (event) => {
    outputElement.innerHTML = 'Processing...';

    const email = document.getElementById("email").value;
    const { isValid, message } = await validateEmail(email);
    if (!isValid) {
      emailInput.classList.add("error");
      emailErrors.textContent = message;
      showMessage(message);
      setLoading(false);
      return;
    }

    const {error} = await checkout.confirm();

    if (error) {
      outputElement.textContent = 'Error: Unable to confirm payment: ' + error.message;
      console.log({error});
    }
  });
}

initCheckout();


// If the URL contains a Checkout Session ID display it in the output element
const urlSearchParams = new URLSearchParams(window.location.search);

const checkoutSessionIdFromURL = urlSearchParams.get('session');

if (urlSearchParams.has('session')) {
  output.textContent = 'Checkout Session ID from URL: ' + urlSearchParams.get('session');
}

