<?php

$stripeConfiguration = [
  'api_key' => getSecret('stripe_sk_test_us_account'),
  'stripe_version' => '2023-10-16',
];

$stripe = new \Stripe\StripeClient($stripeConfiguration);

if (isset($_GET['prepareToSave'])) {
  $customer = $stripe->customers->create([
    'description' => 'Save Payment Method Example Customer',
  ]);
  
  $customerSession = $stripe->customerSessions->create([
    'customer' => $customer->id,
    'components' => [
      'payment_element' => [
        'enabled' => true,
        'features' => [
          'payment_method_save' => 'enabled',
          'payment_method_save_usage' => 'off_session',
          // We only want to save a new Payment Method, not display or manage existing ones
          'payment_method_redisplay' => 'disabled',
          'payment_method_remove' => 'disabled',
        ],
      ],
    ],
  ]);
  
  $setupIntent = $stripe->setupIntents->create([
    'customer' => $customer->id,
  ]);
  
  header('Content-Type: application/json');
  echo json_encode([
    'setupIntentClientSecret' => $setupIntent->client_secret,
    'customerSessionClientSecret' => $customerSession->client_secret,
  ]);
  
  exit;
}

if (isset($_GET['showFullSetupIntent'])) {
  $setupIntent = $stripe->setupIntents->retrieve($_GET['showFullSetupIntent'], [
    'expand' => [
      'customer',
      'payment_method',
    ],
  ]);
  
  header('Content-Type: application/json');
  echo $setupIntent->toJSON();
  
  exit;
}