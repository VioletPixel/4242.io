<?php

if (isset($_GET['createPaymentIntent'])) {
  $stripeConfiguration = [
    'api_key' => getSecret('stripe_sk_test_us_account'),
    'stripe_version' => '2023-10-16',
  ];
  
  $stripe = new \Stripe\StripeClient($stripeConfiguration);
  
  $paymentIntent = $stripe->paymentIntents->create([
    'amount' => 4200,
    'currency' => 'usd',
    'payment_method_types' => [
      'amazon_pay',
    ],
  ]);
  
  header('Content-Type: application/json');
  echo json_encode([
    'clientSecret' => $paymentIntent->client_secret,
  ]);
  exit;
}
