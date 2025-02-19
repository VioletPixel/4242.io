<?php

// If this is a ?createPaymentIntent request
if (isset($_GET['createPaymentIntent'])) {
  // Configure the Stripe PHP library.
  $stripeConfiguration = [
    'api_key' => getSecret('stripe_sk_test_us_account'),
    'stripe_version' => '2023-10-16',
  ];
  
  // Create an instance of the Stripe Client with the configuration above.
  $stripe = new \Stripe\StripeClient($stripeConfiguration);
  
  // Create a Payment Intent.
  // Note: In a real integration the amount and other parameters would likely be dynamic based on customer selections in your UI.
  $paymentIntent = $stripe->paymentIntents->create([
    'amount' => 4200,
    'currency' => 'usd',
  ]);
  
  // We're going to return JSON, so let's set the right header.
  header('Content-Type: application/json');
  
  // Return a JSON object containing the client secret
  echo json_encode([
    'clientSecret' => $paymentIntent->client_secret,
  ]);
  
  // We're done, so exit here and don't do anything else.
  exit;
}
