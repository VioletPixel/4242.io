<?php

// A push to the main branch triggers a GitHub webhook which, in turn, hits
// this URL.

// GitHub's webhooks docs for reference: https://docs.github.com/en/webhooks

header('Content-Type: text/plain; charset=UTF-8');

$valid = false;

// Webhook signing secret
$secrets = parse_ini_file('../secrets.ini');
$secret = $secrets['github_webhook_secret'];

if (empty($secret)) {
  http_response_code(500);
  echo "Error: No webhook secret set on server.";
  exit;
}

// Get request signature
$headers = getallheaders();
$signature = array_key_exists('X-Hub-Signature-256', $headers) ? $headers['X-Hub-Signature-256'] : '';

// Get request body
$body = file_get_contents('php://input');

// Validate the signature
$computedSignature = 'sha256=' . hash_hmac('sha256', $body, $secret);

if (is_string($signature) && is_string($computedSignature)) {
  $valid = hash_equals($signature, $computedSignature);
}

if (!$valid) {
  http_response_code(403);
  echo 'Access denied: signature verification failed.';
  exit;
}

// These commands will be run in order and their output will be sent in the response to this request, which can be viewed in GitHub's UI to aid in debugging
$commands = [
  'echo $PWD', // Display the current working directory
  'whoami', // Display the current user
  'git status', // Show git status before we make any changes
  'git reset --hard HEAD', // Reset to last commit before pulling to avoid deployment failures
  'git pull origin main --rebase', // Pull the main branch from origin and rebase because this is the deployment target
  'git submodule sync', // Sync submodules
  'git submodule update', // Update submodules
  'git status', // Show git status again now that we're done
  'git log -1', // Display git logs
  'cd .. && composer install', // Go up outside the public directory and update dependencies based on composer.lock
];

$output = '';

// Run the commands
foreach($commands as $command) {
  $result = shell_exec($command . ' 2>&1');
  $output .= '$ ' . $command . PHP_EOL . htmlentities(trim($result)) . PHP_EOL;
}

echo $output;
