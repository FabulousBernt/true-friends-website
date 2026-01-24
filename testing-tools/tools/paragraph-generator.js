export const paragraphGeneratorTool = {
  id: 'paragraph-generator',
  name: 'Paragraph Generator',

  render(container) {
    container.innerHTML = '<h2>Paragraph generator</h2>';

    // Input label and field
    const label = document.createElement('label');
    label.textContent = 'Number of words: ';
    label.classList.add('tool-label');

    const input = document.createElement('input');
    input.type = 'number';
    input.min = '1';
    input.value = '50';
    input.classList.add('tool-input');

    label.appendChild(input);

    // Generate button
    const button = document.createElement('button');
    button.textContent = 'Generate';
    button.className = 'tool-button generate shared-button';

    // Copy button
    const copyButton = document.createElement('button');
    copyButton.textContent = 'Copy to Clipboard';
    copyButton.className = 'tool-button copy shared-button';

    // Buttons container
    const buttonsContainer = document.createElement('div');
    buttonsContainer.className = 'counter-buttons';
    buttonsContainer.appendChild(button);
    buttonsContainer.appendChild(copyButton);

    // Output area
    const output = document.createElement('pre');
    output.classList.add('tool-output');

    container.appendChild(label);
    container.appendChild(buttonsContainer);
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
    });

    // Copy button click event
    copyButton.addEventListener('click', () => {
      if (!output.textContent) {
        const originalText = copyButton.textContent;
        copyButton.textContent = 'Nothing to copy';
        copyButton.style.color = '#F05BB5';
        setTimeout(() => {
          copyButton.textContent = originalText;
        }, 1500);
        return;
      }
      navigator.clipboard.writeText(output.textContent).then(() => {
        const originalText = copyButton.textContent;
        const originalColor = copyButton.style.color;
        copyButton.textContent = 'Copied to clipboard!';
        copyButton.style.color = '#02F5D4';
        setTimeout(() => {
          copyButton.textContent = originalText;
          copyButton.style.color = originalColor;
        }, 1500);
      }).catch(() => {
        const originalText = copyButton.textContent;
        copyButton.textContent = 'Failed';
        setTimeout(() => {
          copyButton.textContent = originalText;
        }, 1500);
      });
    });

    // Generate initial paragraph
    output.textContent = generateParagraph(parseInt(input.value, 10));
  }
};