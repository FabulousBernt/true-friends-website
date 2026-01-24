export const paragraphGeneratorTool = {
  id: 'paragraph-generator',
  name: 'Paragraph Generator',

  render(container) {
    container.innerHTML = '';

    // Input label and field
    const label = document.createElement('label');
    label.textContent = 'Number of words: ';
    label.style.display = 'block';
    label.style.marginBottom = '0.5rem';

    const input = document.createElement('input');
    input.type = 'number';
    input.min = '1';
    input.value = '50';
    input.style.width = '100px';
    input.style.marginRight = '1rem';

    label.appendChild(input);

    // Generate button
    const button = document.createElement('button');
    button.textContent = 'Generate';
    button.className = 'tool-button generate';

    // Copy button
    const copyButton = document.createElement('button');
    copyButton.textContent = 'Copy to Clipboard';
    copyButton.className = 'tool-button copy';

    // Confirmation message container
    const confirmation = document.createElement('div');
    confirmation.style.color = '#4caf50';
    confirmation.style.minHeight = '1.2em';
    confirmation.style.display = 'inline-block';
    confirmation.style.marginLeft = '10px';

    // Output area
    const output = document.createElement('pre');
    output.style.marginTop = '1rem';
    output.style.whiteSpace = 'pre-wrap';
    output.style.color = '#f5f5f5';
    output.style.backgroundColor = '#2a2a2a';
    output.style.padding = '1rem';
    output.style.borderRadius = '4px';
    output.style.minHeight = '100px';
    output.style.maxWidth = '800px';

    container.appendChild(label);
    container.appendChild(button);
    container.appendChild(copyButton);
    container.appendChild(confirmation);
    container.appendChild(output);

    // Sample word pool
    const sampleWords = [
      'lorem','ipsum','dolor','sit','amet','consectetur','adipiscing','elit',
      'sed','do','eiusmod','tempor','incididunt','ut','labore','et','dolore',
      'magna','aliqua','ut','enim','ad','minim','veniam','quis','nostrud',
      'exercitation','ullamco','laboris','nisi','ut','aliquip','ex','ea',
      'commodo','consequat','duis','aute','irure','dolor','in','reprehenderit',
      'in','voluptate','velit','esse','cillum','dolore','eu','fugiat','nulla',
      'pariatur','excepteur','sint','occaecat','cupidatat','non','proident',
      'sunt','in','culpa','qui','officia','deserunt','mollit','anim','id',
      'est','laborum'
    ];

    // Paragraph generator function
    function generateParagraph(wordCount) {
      let words = [];
      for (let i = 0; i < wordCount; i++) {
        const word = sampleWords[Math.floor(Math.random() * sampleWords.length)];
        words.push(word);
      }
      let paragraph = words.join(' ');
      paragraph = paragraph.charAt(0).toUpperCase() + paragraph.slice(1) + '.';
      return paragraph;
    }

    // Button click event
    button.addEventListener('click', () => {
      const count = parseInt(input.value, 10);
      if (isNaN(count) || count < 1) {
        output.textContent = 'Please enter a valid number greater than 0.';
        return;
      }
      output.textContent = generateParagraph(count);
      confirmation.textContent = '';
    });

    // Copy button click event
    copyButton.addEventListener('click', () => {
      if (!output.textContent) {
        return;
      }
      navigator.clipboard.writeText(output.textContent).then(() => {
        confirmation.textContent = 'Copied to clipboard!';
        setTimeout(() => {
          confirmation.textContent = '';
        }, 2000);
      }).catch(() => {
        confirmation.textContent = 'Failed to copy.';
        setTimeout(() => {
          confirmation.textContent = '';
        }, 2000);
      });
    });

    // Generate initial paragraph
    output.textContent = generateParagraph(parseInt(input.value, 10));
  }
};