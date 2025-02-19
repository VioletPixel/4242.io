<?php

if (isset($_GET['goToCheckout'])) {
  try {
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
      'shipping_address_collection' => [
        'allowed_countries' => [
          'US',
          'CA',
          'GB',
        ],
      ],
      'success_url' => 'https://4242.io/test/checkout/?session={CHECKOUT_SESSION_ID}',
    ]);
  
    header('HTTP/1.1 303 See Other');
    header('Location: ' . $checkoutSession->url);
    exit;
  }
  catch (Exception $e) {
    $exceptionMessage = 'Exception: ' . $e->getMessage();
    
    if (method_exists($e, 'getHttpBody')) {
      $exceptionMessage .= "\n\nResponse Body:\n\n";
      
      $exceptionMessage .= $e->getHttpBody();
    }
    
    header('Content-Type: text/plain');
    echo $exceptionMessage;
    exit;
  }
}
