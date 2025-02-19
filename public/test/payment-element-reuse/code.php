<?php

$stripeConfiguration = [
  'api_key' => getSecret('stripe_sk_test_us_account'),
  'stripe_version' => '2023-10-16',
];

$stripe = new \Stripe\StripeClient($stripeConfiguration);

if (isset($_GET['createDemoCustomer'])) {
  $customer = $stripe->customers->create([
    'description' => 'Reuse Payment Method Demo Customer',
  ]);
  
  // This would normally be confirmed client-side so the customer could handle any potential next actions
  $setupIntent = $stripe->setupIntents->create([
    'customer' => $customer->id,
    'payment_method' => 'pm_card_visa',
    'confirm' => true,
    'automatic_payment_methods' => [
      'enabled' => true,
      'allow_redirects' => 'never',
    ],
  ]);
  
  // This would normally be set automatically when the customer checks the save box in the Payment Element
  $paymentMethod = $stripe->paymentMethods->update($setupIntent->payment_method, [
    'allow_redisplay' => 'always',
  ]);
  
  header('Content-Type: application/json');
  echo json_encode([
    'customerID' => $customer->id,
  ]);
  
  exit;
}
else if (isset($_GET['prepareToPay'])) {
  $customerID = $_GET['prepareToPay'];
  
  $customerSession = $stripe->customerSessions->create([
    'customer' => $customerID,
    'components' => [
      'payment_element' => [
        'enabled' => true,
        'features' => [
          'payment_method_save' => 'enabled',
          'payment_method_save_usage' => 'off_session',
          'payment_method_redisplay' => 'enabled',
          'payment_method_remove' => 'enabled',
        ],
      ],
    ],
  ]);
  
  $paymentIntent = $stripe->paymentIntents->create([
    'customer' => $customerID,
    'amount' => 4200,
    'currency' => 'usd',
  ]);
  
  header('Content-Type: application/json');
  echo json_encode([
    'paymentIntentClientSecret' => $paymentIntent->client_secret,
    'customerSessionClientSecret' => $customerSession->client_secret,
  ]);
  
  exit;
}
