<?php

require_once($_SERVER['DOCUMENT_ROOT'] . '/../common.php');

\Stripe\Stripe::setApiKey(getSecret('stripe_sk_test_us_account'));

$paymentIntent = \Stripe\PaymentIntent::create([
	'amount' => 4200,
	'currency' => 'usd',
]);

echo json_encode([
	'client_secret' => $paymentIntent->client_secret,
]);
