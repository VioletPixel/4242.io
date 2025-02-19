<?php

$stripeConfiguration = [
  'api_key' => getSecret('stripe_sk_test_us_account'),
  'stripe_version' => '2023-10-16',
  // 'stripe_account' => '', // For Connect requests
  // 'client_id' => '', // For OAuth requests
];

$stripe = new \Stripe\StripeClient($stripeConfiguration);

// TODO: Backend code goes here

