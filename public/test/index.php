<?php

require_once($_SERVER['DOCUMENT_ROOT'] . '/../common.php');
require_once(__DIR__ . '/_includes/core.php');

$title = 'Stripe Reference &amp; Test Integrations';

$referenceIntegrations = [];
$otherIntegrations = [];

function displayIntegrationIndex($integrations) {
  echo '<div class="integrations">' . "\n";
  foreach ($integrations as $integration):
    $classes = [];
    
    if ($integration['reference']) {
      $classes[] = 'reference';
    }
    else {
      $classes[] = 'other';
    }
    
    $classString = implode(' ', $classes);
    
    ?>
    <article class="<?= $classString ?>">
      <h3><a href="<?= $integration['url'] ?>"><?= $integration['title'] ?></a></h3>
      <p class="description"><?= $integration['description'] ?></p>
      <p class="badges">
        <?php if (!empty($integration['beta'])): ?>
        <span class="badge beta">Beta</span>
        <?php endif; ?>
        
        <?php if (!empty($integration['legacy'])): ?>
        <span class="badge legacy">Legacy</span>
        <?php endif; ?>
      </p>
    </article>
  <?php endforeach;
  echo '</div>' . "\n";
}

$directoryIterator = new RecursiveDirectoryIterator('.');

foreach (new RecursiveIteratorIterator($directoryIterator) as $filename => $file) {
  if ($file->getFilename() == 'info.json') {
    $info = infoFromJSON($filename);
    
    if (!$info['index']) {
      continue;
    }
    
    $integration = array_merge($info, [
      'url' => '/test/' . $file->getPathInfo()->getBasename() . '/',
    ]);
    
    if ($info['reference']) {
      $referenceIntegrations[] = $integration;
    }
    else {
      $otherIntegrations[] = $integration;
    }
  }
}

function sortIntegrations($a, $b) {
  return strcasecmp($a['title'], $b['title']);
}

usort($referenceIntegrations, 'sortIntegrations');
usort($otherIntegrations, 'sortIntegrations');

echo htmlStart($title, false);

?>
    <link rel="stylesheet" href="/test/css/style.css">
  </head>
  <body id="home">
    <?php require(PUBLIC_ROOT . '/_includes/nav.php'); ?>
    <header>
      <h1><?= $title ?></h1>
      <p>A collection of <a href="https://stripe.com/">Stripe</a> integrations for reference, testing, and learning.</p>
      
      <p>Unless otherwise specified, everything here uses a US Stripe account in test mode which has all payment methods enabled.</p>
    </header>
    <main>
      <section>
        <h2>⭐️ Reference integrations</h2>
        
        <p>These integrations are designed to be minimal, always-working implementations of various Stripe products and features.  These will rarely be changed.  You can use these as a point of reference to test basic functionality.</p>
        
        <?php displayIntegrationIndex($referenceIntegrations); ?>
      </section>
      <section>
        <h2>🧑‍💻 Other test integrations</h2>
        
        <p>These integrations are more dynamic than the reference integrations above, and are subject to change at any time.  I try to keep them in a functional state, but encountering an error or broken integration in this section is to be expected.</p>
        
        <?php displayIntegrationIndex($otherIntegrations); ?>
      </section>
      <section>
        <h2>🛠️ Other stuff</h2>
        
        <p>Some other miscellaneous things you might find useful.</p>
        
        <div class="stuff">
          <article>
            <h3><a href="https://4242.io/webhook-tester/">Webhook Test URL</a></h3>
            
            <p class="description">A handy URL (<code>https://4242.io/webhook-tester/</code>) you can use to debug webhooks.  This URL returns detailed information about the incoming request.  Visit the link to see it in action and learn more about how it works.</p>
          </article>
        </div>
      </section>
    </main>
    <footer>
      <p>You won't find any bloated or minified code here, so view source like it's 1999!</p>
      
      <?php require_once(PUBLIC_ROOT . '/_includes/footer-signature.php'); ?>
    </footer>
  </body>
</html>
