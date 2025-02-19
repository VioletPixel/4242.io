<?php

// Set a PUBLIC_ROOT constant to make it easier to require and include other files
// For example, on the server this will be set to /var/www/4242.io/public
define('PUBLIC_ROOT', __DIR__ . '/public');

require_once(__DIR__ . '/vendor/autoload.php');

function getSecret($secretName) {
  $secrets = parse_ini_file(__DIR__ . '/secrets.ini');
  
  if (!$secrets) {
    throw new Exception('Unable to open/parse secrets.ini file.');
  }
  
  return $secrets[$secretName];
}

function htmlStart($title, $closeHead = true) {
  $html = <<<HEREDOC
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <meta name="color-scheme" content="light dark">
    <meta name="apple-mobile-web-app-title" content="4242.io" />
    <title>$title</title>
    <link rel="stylesheet" href="/css/common.css">
    <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
    <link rel="shortcut icon" href="/favicon.ico" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="manifest" href="/site.webmanifest" />
HEREDOC;
  
  if ($closeHead) {
    $html .= "\n  </head>";
  }
  
  $html .= "\n";
  
  return $html;
}
