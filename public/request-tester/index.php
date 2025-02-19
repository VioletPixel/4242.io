<?php

header("Content-Type: text/plain");

echo <<<HEREDOC
---------------------------------------------------------------
|                                                             |
|                 4242.io HTTP Request Tester                 |
|               https://4242.io/request-tester/               |
|                                                             |
| The HTTP request this server just received is shown below,  |
| including up to 1,024 characters of the request body.       |
|                                                             |
---------------------------------------------------------------


HEREDOC;

echo "{$_SERVER['REQUEST_METHOD']} {$_SERVER['REQUEST_URI']} {$_SERVER['SERVER_PROTOCOL']}\n";

foreach (getallheaders() as $name => $value) {
	echo "$name: $value\n";
}

// Let's only allow 1 MB of body, to be on the safe side
$body = file_get_contents('php://input', false, null, 0, 1024);

if (!empty($body)) {
  echo "\n" . $body . "\n";
}

exit;
