// Note: No JavaScript is required for this integration
// This code is only here to show the GET parameters from the URL

const outputElement = document.querySelector('#output');

const urlSearchParams = new URLSearchParams(window.location.search);

let paramsPresent = false;

let paramsString = '';

for (const [key, value] of urlSearchParams.entries()) {
  paramsPresent = true;
  
  paramsString += "\n\n" + 'key: ' + key + "\n" + 'value: ' + value;
}

if (paramsPresent) {
  paramsString = 'GET parameters from URL:' + paramsString;
  
  outputElement.textContent = paramsString;
}
