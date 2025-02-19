<?php

if (isset($_GET['create-payment-intent'])) {
  $stripeConfiguration = [
    'api_key' => getSecret('stripe_sk_test_us_account'),
    'stripe_version' => '2023-10-16',
  ];
  
  $stripe = new \Stripe\StripeClient($stripeConfiguration);
  
  $paymentIntent = $stripe->paymentIntents->create([
    'amount' => 4200,
    'currency' => 'usd',
  ]);
  
  echo json_encode([
    'client_secret' => $paymentIntent->client_secret,
  ]);
  
  exit;
}
