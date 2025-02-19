<?php

require_once($_SERVER['DOCUMENT_ROOT'] . '/../common.php');

echo htmlStart("4242.io: New Page Template");

?>
  <body>
    <?php require_once(PUBLIC_ROOT . '/_includes/nav.php'); ?>
    <header>
      <h1>New Page Template<h1>
    </header>
    <main>
      <p>This is where the content goes!</p>
    </main>
    <footer>
      <?php require_once(PUBLIC_ROOT . '/_includes/footer-signature.php'); ?>
    </footer>
  </body>
</html>
