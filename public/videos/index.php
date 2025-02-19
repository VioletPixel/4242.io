<?php

require_once($_SERVER['DOCUMENT_ROOT'] . '/../common.php');

$videos = [
  [
    'slug' => 'payment-objects-overview',
    'title' => 'Payment Objects Overview',
    'description' => '<p>Learn about the objects Stripe uses to represent and manage payments, how they relate to each other, and the features they provide.</p><p>This video is also <a href="https://docs.stripe.com/payments-api/tour#payment-objects">available in the official Stripe docs on the API Tour page</a>.</p>',
    'youtube_id' => 'CUAY6IQcVQM',
  ],
  [
    'slug' => 'the-xy-problem',
    'title' => 'The XY Problem',
    'description' => '<p>Learn how to ask and answer questions more effectively by avoiding the <a href="https://en.wikipedia.org/wiki/XY_problem">XY problem</a>.</p>',
    'youtube_id' => 'mKC3QPAT5fI',
  ],
  [
    'slug' => 'clients-and-servers-demystified',
    'title' => 'Clients and Servers Demystified',
    'description' => '<p>Find out how to tell the difference between a server and a client, and why this isn\'t as simple as it seems at first glance.</p>',
    'youtube_id' => '8RjjdFftkkI',
  ],
  [
    'slug' => 'common-http-connection-errors-in-a-nutshell',
    'title' => 'Common HTTP Connection Errors in a Nutshell',
    'description' => '<p>Learn about the five basic stages of an HTTP connection, the most common errors that happen during each stage, and what you can do to resolve those issues.</p>',
    'youtube_id' => '3Nkro5pHdd4',
  ],
  [
    'slug' => 'stripe-api-versions',
    'title' => 'Stripe API Versions',
    'description' => '<p>Keep your Stripe integration running smoothly over time by learning about <a href="https://docs.stripe.com/upgrades">API versions</a>, how they work, and how they can protect you from breaking changes.</p>',
    'youtube_id' => 'kOurEjtx2VI',
  ],
  [
    'slug' => 'stripe-api-expansion',
    'title' => 'Stripe API Expansion',
    'description' => '<p>Learn how to build a simpler, faster, and more efficient Stripe integration by fetching more data at once from the API using <a href="https://docs.stripe.com/expand">expansion</a>.</p>',
    'youtube_id' => 'DdhF1pH5xoo',
  ],
  [
    'slug' => 'what-are-client-secrets',
    'title' => 'What are client secrets?',
    'description' => '<p>Many Stripe objects have <a href="https://docs.stripe.com/api/payment_intents/object#payment_intent_object-client_secret">client secrets</a>, but what the heck are they?  Find out in this video!</p>',
    'youtube_id' => 'hOVJJU0iFxs',
  ],
  [
    'slug' => 'webhooks-in-a-nutshell',
    'title' => 'Webhooks in a Nutshell',
    'description' => '<p>Find out what <a href="https://docs.stripe.com/webhooks">webhooks</a> are, how they work, and why they\'re often vital to building a robust integration with Stripe.</p>',
    'youtube_id' => 'ZKHAnH0eYb8',
  ],
  [
    'slug' => 'webhook-signature-verification',
    'title' => 'Webhook Signature Verification',
    'description' => '<p><a href="https://docs.stripe.com/webhooks#verify-official-libraries">Verify the webhooks you receive are actually from Stripe to keep your integration safe and secure.</p>',
    'youtube_id' => 'sa5fjYxY5Os',
  ],
  [
    'slug' => 'how-to-listen-for-the-events-you-want',
    'title' => 'How to listen for the Events you want (with and without Connect)',
    'description' => '<p>Learn how <a href="https://docs.stripe.com/api/events">Events</a> flow from Stripe to your integration for both individual accounts and multiple accounts using Connect.</p>',
    'youtube_id' => 'UsfjpeQ2PBU',
  ],
  [
    'slug' => 'http-redirects',
    'title' => 'HTTP Redirects',
    'description' => '<p>Learn how HTTP redirects work and why Stripe\'s webhook system treats redirects as failures.</p>',
    'youtube_id' => 'shV6OPnOxbU',
  ],
  [
    'slug' => 'webhooks-that-wait',
    'title' => 'Webhooks that Wait',
    'description' => '<p>Learn about some special cases where Stripe waits for a webhook response from your integration before moving on to the next step.</p>',
    'youtube_id' => 'WMQHBeVjA4I',
  ],
  [
    'slug' => 'robust-checkout-fulfillment',
    'title' => 'Robust Checkout Fulfillment',
    'description' => '<p>Learn how to build a robust <a href="https://docs.stripe.com/checkout/fulfillment">Checkout fulfillment</a> system to provide a great customer experience, even when there are connectivity issues or unexpected downtime.</p>',
    'youtube_id' => 'YKGkF_IUv3E',
  ],
  [
    'slug' => 'custom-domains',
    'title' => 'Custom Domains',
    'description' => '<p>Find out how easy it is to set up a <a href="https://docs.stripe.com/payments/checkout/custom-domains">custom domain for Checkout</a>, test it, and go live with a more seamless customer experience.</p>',
    'youtube_id' => 'xSLOU4KaGmk',
  ],
  [
    'slug' => 'custom-domains-and-dns-propagation',
    'title' => 'Custom Domains &amp; DNS Propagation',
    'description' => '<p>Learn why updates to your DNS records take so long to propagate across the internet.</p>',
    'youtube_id' => 's8G18FC0ni8',
  ],
  [
    'slug' => 'connect-object-relationships',
    'title' => 'Connect Object Relationships',
    'description' => '<p>Learn about Stripe object ownership, their relationships to each other when using <a href="https://docs.stripe.com/connect">Connect</a>, and what it means when someone says an object "lives on" or "belongs to" an account.</p>',
    'youtube_id' => 'cJT9HkI7eKs',
  ],
  [
    'slug' => 'direct-charges-on-multiple-accounts-with-cloning',
    'title' => 'Direct Charges on Multiple Accounts with Cloning',
    'description' => '<p>If you want to collect payment details from a customer once, then make <a href="https://docs.stripe.com/connect/direct-charges-multiple-accounts">several direct charges on multiple connected accounts</a>, this is the video for you!</p>',
    'youtube_id' => 'X-VKDdk052Q',
  ],
  [
    'slug' => 'optimizing-payments-with-financial-connections',
    'title' => 'Optimizing Payments with Financial Connections',
    'description' => '<p>Use <a href="https://docs.stripe.com/financial-connections">Financial Connections</a> to avoid failed payment fees, create a better experience for customers, reduce fraud, and more.</p>',
    'youtube_id' => 'zFbwMYFmArg',
  ],
  [
    'slug' => 'introducing-test-clocks',
    'title' => 'Introducing Test Clocks',
    'description' => '<p>Learn how to <a href="https://docs.stripe.com/billing/testing/test-clocks">travel through time in test mode</a> to simulate and observe long-running Billing and Subscription operations.</p>',
    'youtube_id' => 'Lle_HlC6Lak',
  ],
];

function get_video($slug) {
  global $videos;
  
  foreach ($videos as $video) {
    if ($video['slug'] == $slug) {
      return $video;
    }
  }
}

function toc_video_link($video) {
  return '<a href="#' . $video['slug'] . '">' . $video['title'] . '</a>';
}

function videos_toc() {
  global $videos;
  
  $output = "<ul>\n";
  
  foreach ($videos as $video) {
    $output .= "<li>" . toc_video_link($video) . "</li>\n";
  }
  
  $output .= "</ul>\n";
  
  return $output;
}

function show_video($video) {
  return <<<HEREDOC
<article class="video">
  <h2 id="{$video['slug']}">{$video['title']} <a class="permalink" title="Permalink" href="#{$video['slug']}">🔗</a></h2>
  <section class="embed">
    <iframe class="youtube-embed" src="https://www.youtube-nocookie.com/embed/{$video['youtube_id']}" title="{$video['title']} Video Embed" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    <small><a href="https://youtu.be/{$video['youtube_id']}">View on YouTube</a></small>
  </section>
  <section class="description">
    {$video['description']}
  </section>
  <p class="back"><small><a href="#toc">&uarr; Back to table of contents</a></small></p>
</article>
HEREDOC;
}

function show_all_videos($videos) {
  $output = '';
  
  foreach ($videos as $video) {
    $output .= show_video($video);
  }
  
  return $output;
}

function show_youtube_embed($url, $title = 'YouTube Embed') {
  return '<iframe class="youtube-embed" src="' . $url . '" title="' . $title . '" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>';
}

echo htmlStart("4242.io: Videos", false);

?>
    <style>
      details {
        margin: 1rem 0;
      }
      
      details summary:hover {
        cursor: pointer;
      }
      
      #toc,
      .video h2 {
        scroll-margin-top: 3rem;
      }
      
      a.permalink {
        opacity: 0.25;
        text-decoration: none;
      }
      
      a.permalink:hover {
        opacity: 1;
      }
      
      .video {
        margin: 1em 0;
      }
      
      .video .embed small {
        display: block;
        text-align: center;
        margin: 0 0 1rem;
      }
      
      .video .back small {
        display: block;
        text-align: center;
      }
      
      .video .description *:first-child {
        margin-top: 0;
      }
      
      .youtube-embed {
        width: 100%;
        aspect-ratio: 16/9;
        border: none;
      }
    </style>
  </head>
  <body>
    <?php require(PUBLIC_ROOT . '/_includes/nav.php'); ?>
    <header>
      <h1 id="toc">📺 Videos</h1>
      
      <p>The videos below explain several different technical and logistical concepts, most of them related to Stripe.</p>
      
      <details>
        <summary>Table of Contents</summary>
        <?= videos_toc(); ?>
      </details>      
      
      <details>
        <summary>Wondering what "TSE" or a "Single Slider" is?</summary>
        <p>Many of these videos were originally short internal videos similar to a one-pager, but instead it's a single slide.  I'm on the Technical Solutions Engineering team at Stripe, or TSE for short, so many are called "TSE Single Sliders" and take full advantage of the obvious burger pun.</p>
      </details>
    </header>
    <main>
      <?= show_all_videos($videos); ?>
    </main>
    <footer>
      <?php require_once(PUBLIC_ROOT . '/_includes/footer-signature.php'); ?>
    </footer>
  </body>
</html>
