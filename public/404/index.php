<?php

require_once($_SERVER['DOCUMENT_ROOT'] . '/../common.php');

$basename = basename($_SERVER['REQUEST_URI']);

// When I first started 4242.io most of my test integrations were at the root of the domain (e.g., 4242.io/payment-element), but I later redesigned and moved them all under 4242.io/test, so the bit below permanently redirects the old URLs to the new ones:
if (file_exists('../test/' . $basename)) {
  header('Location: /test/' . $basename, true, 301);
  exit;
}

echo htmlStart("4242.io: 404 Not Found", false);

?>
    <style>
      
      img {
        width: 100%;
        border-radius: .25em;
      }

    </style>
  </head>
  <body>
    <?php require(PUBLIC_ROOT . '/_includes/nav.php'); ?>
    <header>
      <h1>❓ 404: Not Found</h1>
    </header>
    <main>
      <p>Looks like whatever you're looking for doesn't exist.  Sorry about that!</p>
      
      <p>Give the navigation options at the top of the page a try.  Or, if you think I broke something, reach out using the link in the footer!</p>
      
      <p><img src="/404/404.gif" alt="On November 17th, 2012, Imgur user karmafrappuccino posted a reaction GIF of the Pulp Fiction character Vincent Vega (played by John Travolta) looking around a room while being spoken to over an intercom by the character Mia Wallace (shown below).  This is that GIF."></p>
    </main>
    <footer>
      <?php require_once(PUBLIC_ROOT . '/_includes/footer-signature.php'); ?>
    </footer>
  </body>
</html>
