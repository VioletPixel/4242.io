<?php

if (isset($_GET['createPaymentIntent'])) {
  $stripeConfiguration = [
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
