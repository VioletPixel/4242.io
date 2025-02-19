// TODO: Review and rework how code blocks are displayed
// TODO: Move all whitespace removal logic to the server
// TODO: This should really only be for syntax highlighting

function removeUnwantedWhitespace(code) {
  // Remove leading and trailing empty lines
  let newCode = code.replace(/^\n*|\s*$/g, '');
  
  // Get the indentation whitespace from the first line
  const indentationWhitespace = newCode.match(/^\s*/)[0];
  
  // Remove indentation whitespace from every line
  const indentationWhitespaceRegex = new RegExp('^' + indentationWhitespace, 'gm');
  
  newCode = newCode.replace(indentationWhitespaceRegex, '');
  
  return newCode;
}

function getClientCode(elementsName) {
  const clientCodeElements = document.querySelectorAll(elementsName + '.show');
  
  let codeArray = [];
  
  for (const element of clientCodeElements) {
    codeArray.push(removeUnwantedWhitespace(element.innerHTML));
  }
  
  const code = codeArray.join("\n\n");
  
  return code;
}

function displayCode() {
  // Formatting and syntax highlighting for server code elements
  const serverCodeElements = document.querySelectorAll('.server-code');
  
  for (const element of serverCodeElements) {
    element.textContent = removeUnwantedWhitespace(element.textContent);
    hljs.highlightElement(element);
  }
  
  // Populate and syntax highlight client code elements
  const clientCodeElements = document.querySelectorAll('.client-code');
  
  for (const element of clientCodeElements) {
    let code = '';
    
    if (element.classList.contains('html')) {
      code = getClientCode('div');
    }        
    if (element.classList.contains('css')) {
      code = getClientCode('style');
    }        
    if (element.classList.contains('js')) {
      code = getClientCode('script');
    }
    
    if (!code) {
      element.remove();
      continue;
    }
    
    element.textContent = code;
    
    hljs.highlightElement(element);
  }
}

// TODO: After all of the existing integrations are converted removed the unused functions above

document.addEventListener('DOMContentLoaded', event => {
  displayCode();
  
  const showCodeElements = document.querySelectorAll('.source-code');
  
  for (const element of showCodeElements) {
    element.textContent = removeUnwantedWhitespace(element.textContent);
    hljs.highlightElement(element);
  }
});
