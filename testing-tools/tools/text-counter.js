export const textCounterTool = {
  id: 'text-counter',
  name: 'Text Counter',
  render(container) {
    container.innerHTML = `
      <div>
        <label for="char-input">Enter text:</label><br/>
        <textarea id="char-input" class="tool-textarea" rows="10" cols="50" style="font-family: monospace;"></textarea>
      </div>
      <div>
        Word count: <span id="word-count">0</span>
      </div>
      <div>
        Character count: <span id="char-count">0</span>
      </div>
      <div>
        Letters (a-z, A-Z): <span id="letter-count">0</span>
      </div>
      <div>
        Numbers (0-9): <span id="number-count">0</span>
      </div>
      <div>
        Special characters: <span id="special-count">0</span>
      </div>
      <div>
        Spaces/blanks: <span id="space-count">0</span>
      </div>
    `;

    const textarea = container.querySelector('#char-input');
    const countSpan = container.querySelector('#char-count');
    const wordCountSpan = container.querySelector('#word-count');
    const letterCountSpan = container.querySelector('#letter-count');
    const numberCountSpan = container.querySelector('#number-count');
    const specialCountSpan = container.querySelector('#special-count');
    const spaceCountSpan = container.querySelector('#space-count');

    textarea.addEventListener('input', () => {
      const text = textarea.value;
      countSpan.textContent = text.length;

      const words = text.trim().split(/\s+/).filter(word => word.length > 0);
      wordCountSpan.textContent = words.length;

      let letters = 0;
      let numbers = 0;
      let specials = 0;
      let spaces = 0;

      for (let i = 0; i < text.length; i++) {
        const char = text[i];
        if (/[a-zA-Z]/.test(char)) {
          letters++;
        } else if (/[0-9]/.test(char)) {
          numbers++;
        } else if (char === ' ') {
          spaces++;
        } else if (/\S/.test(char)) {
          specials++;
        }
      }

      letterCountSpan.textContent = letters;
      numberCountSpan.textContent = numbers;
      specialCountSpan.textContent = specials;
      spaceCountSpan.textContent = spaces;
    });
  }
};
