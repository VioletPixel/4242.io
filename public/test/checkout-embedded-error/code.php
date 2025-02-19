<?php

if (isset($_GET['createCheckoutSession'])) {
  $stripeConfiguration = [
    'api_key' => getSecret('stripe_sk_test_us_account'),
    'stripe_version' => '2023-10-16',
  ];
  
  $stripe = new \Stripe\StripeClient($stripeConfiguration);
  
  $checkoutSession = $stripe->checkout->sessions->create([
    'line_items' => [
      [
        'price_data' => [
          'product_data' => [
            'name' => 'Example Product',
            'description' => 'Example description.',
          ],
          'currency' => 'usd',
          'unit_amount' => 4200,
        ],
        'quantity' => 1,
      ],
    ],
    'mode' => 'payment',
    'ui_mode' => 'embedded',
    'return_url' => 'https://4242.io/test/checkout-embedded/?session={CHECKOUT_SESSION_ID}',
  ]);
  
  // Immediately expire the session so Embedded Checkout will fail
  $stripe->checkout->sessions->expire($checkoutSession->id);
  
  header('Content-Type: application/json');
  echo json_encode([
    'clientSecret' => $checkoutSession->client_secret,
  ]);
  exit;
}
