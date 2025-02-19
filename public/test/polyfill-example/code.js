const outputElement = document.querySelector('#output');

// Let's keep a reference to the native JSON.stringify we're going to replace/override
const nativeStringify = JSON.stringify;

// This function is our polyfill
const stringifyPolyfill = function (value) {
  const outputElement = document.querySelector('#output');
  
  outputElement.textContent += "👋 JSON.stringify just ran!\n";
  
  console.log('The polyfilled version of JSON.stringify just ran!');
  
  // Normally polyfills/overrides will have their own implementation of the functionality they're overriding, but to keep things simple we're going to use the native JSON.stringify we saved a reference to, but we're intentionally only going to pass in the single argument this polyfill supports:
  return nativeStringify(value);
}

// Now we replace the native JSON.stringify function with our polyfill
JSON.stringify = stringifyPolyfill;

// This code, which would normally call the native JSON.stringify, is now calling our polyfill code instead
const json = JSON.stringify({foo: "bar"}, null, 2);

outputElement.textContent += json + "\n";
