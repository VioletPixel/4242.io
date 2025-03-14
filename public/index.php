<?php

require_once($_SERVER['DOCUMENT_ROOT'] . '/../common.php');

echo htmlStart("4242.io: Justin's Stripe Stuff");

?>
  <body>
    <?php require(PUBLIC_ROOT . '/_includes/nav.php'); ?>
    <header>
      <h1>👨🏻‍💻 Justin's Stripe Stuff</h1>
    </header>
    <main>
      <p>Hello!</p>
      
      <p>I'm Justin Michael, a former staff engineer at <a href="https://stripe.com/">Stripe</a>.  This site is where I keep some of the tools, resources, and other misc. things I used to help developers build awesome Stripe integrations:</p>
      
      <nav>
        <ul>
          <li>🛠️ <a href="/test/">Reference & Test Integrations</a></li>
          <li>📺 <a href="/videos/">Some Useful Videos I've Made</a></li>
          <li>🪝 <a href="/webhook-tester/">Webhook Tester</a></li>
          <li>💬 <a href="https://stripe.com/go/developer-chat">Stripe Developer Chat</a></li>
        </ul>
      </nav>
      
      <p>If you have any questions, or just want to say hello, please <a href="&#x6D;&#x61;&#x69;&#x6C;&#x74;&#x6F;&#x3A;&#x6A;&#x75;&#x73;&#x74;&#x69;&#x6E;&#x40;&#x76;&#x69;&#x6F;&#x6C;&#x65;&#x74;&#x70;&#x69;&#x78;&#x65;&#x6C;&#x2E;&#x63;&#x6F;&#x6D;">get in touch</a>!</p>
    </main>
    <footer>
      <?php require_once(PUBLIC_ROOT . '/_includes/footer-signature.php'); ?>
    </footer>
  </body>
</html>
