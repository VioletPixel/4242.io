<?php
$cspHeader = "Content-Security-Policy: connect-src 'self' https://api.stripe.com https://maps.googleapis.com; frame-src 'self' https://js.stripe.com https://hooks.stripe.com; script-src 'self' 'unsafe-inline' https://js.stripe.com https://maps.googleapis.com";

header($cspHeader);

require_once('../_includes/core.php');
displayIntegration(__FILE__);
