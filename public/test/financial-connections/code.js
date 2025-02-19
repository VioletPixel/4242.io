const stripe = Stripe('pk_test_51O2hxMC4JnNRtz8VToJJbGHrFTPPr6TkP09h7ql3YJaqpNcxoSNxtk38glyzi9VrZKStns858YynOO2ZyGmU7VRi00CIUWuUdk');

const connectFinancialAccountButton = document.querySelector('#connect-financial-account');

const outputElement = document.querySelector('#output');

connectFinancialAccountButton.addEventListener('click', async event => {
  const result = await fetch('?connect');
  
  const { customer, clientSecret } = await result.json();
  
  const financialConnectionsSessionResult = await stripe.collectFinancialConnectionsAccounts({
    clientSecret
  });
  
  outputElement.textContent = 'Customer created: ' + customer + "\n\n" + 'Financial Connections Session Result:' + "\n\n" + JSON.stringify(financialConnectionsSessionResult, null, 2);
});
