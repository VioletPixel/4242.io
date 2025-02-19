<nav>
  <ul>
    <?php if (!empty($info['docsURL'])): ?><li><a href="<?= htmlspecialchars($info['docsURL']) ?>" target="_blank">📚 View the docs &rarr;</a></li><?php endif; ?>
    <li><a href="/test/">&larr; Other integrations</a></li>
  </ul>
</nav>
