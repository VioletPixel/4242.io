<?php

if (isset($_GET['timeout'])) {
  sleep(60);
}

if (!empty($_GET['status'])) {
  if (is_numeric($_GET['status'])) {
    $status = intval($_GET['status']);
    
    // Validate the status code
    if (
      // Outer bounds
      $status >= 200 &&
      $status < 600
    ) {
      http_response_code($status);
    }
  }
}

header('Content-Type: text/plain; charset=utf-8');

$body = file_get_contents('php://input');

?># Webhook Test URL

You can use this URL to debug webhooks.  Detailed information about the
incoming HTTP request is shown below, formatted with Markdown.

## Features

### Custom HTTP Status

Add `?status=<HTTP status code>` (e.g., `?status=418`) to the URL to get the HTTP
status code of your choice in the response.  Invalid status codes will be
ignored.

### Timeout

Add `?timeout` to the URL to delay the response from this server for 60 seconds.
  
## Incoming HTTP Request Info

Request URI: `<?= $_SERVER['REQUEST_URI'] ?>`

Actual body content length (in bytes, not derived from headers): `<?= mb_strlen($body, '8bit') ?>`

### Headers

```
<?php

foreach (getallheaders() as $name => $value) {
  echo "$name: $value\n";
}

?>
```

<?php

if (!empty($body)) {
  echo "###Body\n\n```\n$body\n```";
}

echo "\n";
