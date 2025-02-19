<?php

if (isset($_GET['createCheckoutSession'])) {
  $stripeConfiguration = [
    'api_key' => getSecret('stripe_sk_test_us_account'),
    'stripe_version' => '2023-10-16',
  ];
  
  $stripe = new \Stripe\StripeClient($stripeConfiguration);
  
  $checkoutSession = $stripe->checkout->sessions->create([
    'mode' => 'payment',
    'line_items' => [
      [
        'price_data' => [
          'currency' => 'usd',
          'product_data' => [
            'name' => 'Product name',
          ],
          'unit_amount' => 4200,
        ],
        'quantity' => 1,
      ],
    ],
    'success_url' => 'https://4242.io/test/checkout/?session={CHECKOUT_SESSION_ID}',
  ]);

  header('Content-Type: application/json');
  echo json_encode([
    'checkoutSessionID' => $checkoutSession->id,
  ]);
  exit;
}
