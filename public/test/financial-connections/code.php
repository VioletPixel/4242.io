<?php

if (isset($_GET['connect'])) {
  $stripeConfiguration = [
    'api_key' => getSecret('stripe_sk_test_us_account'),
    'stripe_version' => '2023-10-16',
  ];
  
  $stripe = new \Stripe\StripeClient($stripeConfiguration);

  $customer = $stripe->customers->create([
    'name' => 'Finanical Connections Test (' . time() . ')',
  ]);
  
  $financialConnectionsSession = $stripe->financialConnections->sessions->create([
    'account_holder' => [
      'type' => 'customer',
      'customer' => $customer->id,
    ],
    'permissions' => [
      'balances',
      'ownership',
      'payment_method',
      'transactions',
    ],
  ]);
  
  header('Content-Type: application/json');
  
  echo json_encode([
    'customer' => $customer->id,
    'clientSecret' => $financialConnectionsSession->client_secret,
  ]);
  
  exit;
}
  