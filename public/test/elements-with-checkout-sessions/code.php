<?php

if (isset($_GET['createCheckoutSession'])) {
  $stripeConfiguration = [
    'api_key' => getSecret('stripe_sk_test_us_account'),
    'stripe_version' => '2025-06-30.basil',
  ];

  $stripe = new \Stripe\StripeClient($stripeConfiguration);

  $checkoutSession = $stripe->checkout->sessions->create([
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
    'mode' => 'payment',
    'ui_mode' => 'custom',
    'return_url' => 'https://4242.io/test/elements-with-checkout-sessions/?session={CHECKOUT_SESSION_ID}',
    'billing_address_collection' => 'required',
  ]);

  header('Content-Type: application/json');
  echo json_encode([
    'clientSecret' => $checkoutSession->client_secret,
  ]);
  exit;
}
