<?php

// US

if (isset($_GET['createPaymentIntent'])) {
  $stripeConfiguration = [
    'api_key' => getSecret('stripe_sk_test_us_account'),
    'stripe_version' => '2023-10-16',
  ];
  
  $stripe = new \Stripe\StripeClient($stripeConfiguration);
  
  $paymentIntent = $stripe->paymentIntents->create([
    'amount' => 4200,
    'currency' => 'usd',
  ]);
  
  header('Content-Type: application/json');
  echo json_encode([
    'clientSecret' => $paymentIntent->client_secret,
  ]);
  exit;
}

// GB

if (isset($_GET['createPaymentIntentGB'])) {
  $stripeConfiguration = [
    // Note: This is a different secret key, for my GB test account
    'api_key' => getSecret('stripe_sk_test_gb_account'),
    'stripe_version' => '2023-10-16',
  ];
  
  $stripe = new \Stripe\StripeClient($stripeConfiguration);
  
  $paymentIntent = $stripe->paymentIntents->create([
    'amount' => 4200,
    'currency' => 'gbp',
  ]);
  
  header('Content-Type: application/json');
  echo json_encode([
    'clientSecret' => $paymentIntent->client_secret,
  ]);
  exit;
}
