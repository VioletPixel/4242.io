<?php

require_once($_SERVER['DOCUMENT_ROOT'] . '/../common.php');

function requireIfExists($filename) {
  if (file_exists($filename)) {
    require($filename);
  }
}

function infoFromJSON($filename) {
  $infoJSON = file_get_contents($filename);
  $info = json_decode($infoJSON, true, 512, JSON_THROW_ON_ERROR);
  return $info;
}

function displayCodeHTML($filename) {
  if (!file_exists($filename)) {
    return;
  }
  
  $code = file_get_contents($filename);
  
  if ($code === false) {
    return;
  }
  
  $extension = pathinfo($filename, PATHINFO_EXTENSION);
  
  $iframeClass = str_contains($filename, 'iframe.html') ? ' iframe' : '';
  
  // Replace calls to getSecret() for Stripe secret and restricted keys with redacted key strings
  $code = preg_replace("/getSecret\('stripe_(sk|rk)_([a-z]+)_\w+'\)/", "'$1_$2_•••'", $code);
  
  // Redact raw secret and restricted keys in the code, just in case
  $code = preg_replace('/(sk|rk)_(test|live)_\w+/', '$1_$2_•••', $code);
  
  // If this is an .html file, redact PHP
  if (str_ends_with($filename, '.html')) {
    $code = preg_replace('/<\?php.+?\?>/ms', '•••', $code);
  }
  
  // Encode for HTML
  $code = htmlspecialchars($code);
  
  echo '<pre class="source-code ' . $extension . $iframeClass . '"><code>' . $code . '</code></pre>';
}

function displayIntegration($filename, $tidyOptions = []) {
  $directory = dirname($filename);
  
  $infoFile = $directory . '/info.json';
  $htmlFile = $directory . '/code.html';
  $cssFile = $directory . '/code.css';
  $jsFile = $directory . '/code.js';
  $phpFile = $directory . '/code.php';
  
  // Run the PHP first, in case we return/exit early
  requireIfExists($phpFile);
  
  // Start an output buffer so we can tidy the HTML before we send it to the browser
  ob_start();
  
  $info = infoFromJSON($infoFile);
  
  echo htmlStart($info['title'], false);
  
  ?>
  <link rel="stylesheet" href="/test/css/style.css">
  <link rel="stylesheet" href="/test/css/highlight/ir-black.css">
  <script src="/test/js/highlight.min.js"></script>
  <script src="/test/js/core.js"></script>
  <?php
  
  if (file_exists($cssFile)) {
    echo "<style>\n";
    require($cssFile);
    echo "</style>\n";
  }
  
  ?>
  </head>
  <body class="test-integration">
    <?php require(PUBLIC_ROOT . '/_includes/nav.php'); ?>
    <header>
      <h1><?= htmlspecialchars($info['title']) ?></h1>
      
      <p class="badges">
        <?php if (!empty($info['reference'])): ?>
        <span class="badge reference">⭐️ Reference</span>
        <?php endif; ?>
  
        <?php if (!empty($info['beta'])): ?>
        <span class="badge beta">🧪 Beta</span>
        <?php endif; ?>
        
        <?php if (!empty($info['legacy'])): ?>
        <span class="badge legacy">🏚️ Legacy</span>
        <?php endif; ?>
        
        <?php if (empty($info['index'])): ?>
        <span class="badge hidden">🙈 Hidden</span>
        <?php endif; ?>
      </p>
      
      <p class="description"><?= htmlspecialchars($info['description']); ?></p>
      
      <details class="badge-info">
        <summary>Badge info</summary>
        <p>The <span class="badge reference">⭐️ Reference</span> badge is applied to test integrations which are especially useful as a reference when building your own integration.</p>
        
        <p>The <span class="badge beta">🧪 Beta</span> badge indicates the test integration itself is still in beta and may not be in a working state.</p>
        
        <p>The <span class="badge legacy">🏚️ Legacy</span> badge indicates an integration approach that is no longer recommended and should no longer be used, especially for new projects.</p>
        
        <p>The <span class="badge hidden">🙈 Hidden</span> badge indicates an integration which is not included in <a href="/test/">the list of integrations</a>.</p>
        
        <hr>
      </details>
      
      <p class="disclaimer">&#x26A0;&#xFE0F; <strong>Note:</strong> This integration is <strong>not production ready</strong> and should only be used as a reference.</p>
      
      <?php require('test-nav.php'); ?>
    </header>
    <main class="integration">
    <h2>⚙️ Integration</h2>
    
    <div class="integration">
      <?php requireIfExists($htmlFile); ?>
    </div>
    
    <?php
    
    if (file_exists($jsFile)) {
      echo "<script>\n";
      require($jsFile);
      echo "</script>\n";
    }
    
    ?>
    
    <h2>🧑‍💻 Code</h2>
    
    <?php
    
    displayCodeHTML($directory . '/code.php');
      
    displayCodeHTML($directory . '/code.html');
    
    displayCodeHTML($directory . '/code.css');
    
    displayCodeHTML($directory . '/code.js');
    
    displayCodeHTML($directory . '/iframe.html');
    
    ?>
    
    </main>
    
    <footer>
      <?php require('test-nav.php'); ?>
      <?php require(PUBLIC_ROOT . '/_includes/footer-signature.php'); ?>
    </footer>
  </body>
</html>
    
  <?php
  
  $html = ob_get_clean();
  
  $tidy = new tidy;
  
  $tidyOptions = array_merge($tidyOptions, [
    'indent' => true,
    'indent-spaces' => 2,
    'output-html' => true,
    'wrap' => 0,
    'drop-empty-elements' => false,
    'drop-empty-paras' => false,
    'merge-divs' => false,
    'merge-spans' => false,
    'custom-tags' => 'inline',
    'strict-tags-attributes' => false,
    'drop-proprietary-attributes' => false,
    'warn-proprietary-attributes' => false,
  ]);
  
  $tidy->parseString($html, $tidyOptions, 'utf8');
  
  $tidy->cleanRepair();
  
  if ($tidy->errorBuffer) {
    error_log('Tidy version ' . tidy_get_release() . ' error buffer is not empty!');
    
    $errorLines = explode("\n", $tidy->errorBuffer);
    
    foreach ($errorLines as $line) {
      error_log($line);
    }
    
    error_log($html);
    
    echo $html;
  }
  else {
    echo $tidy;
  }
}
