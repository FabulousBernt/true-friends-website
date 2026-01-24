export const textCounterTool = {
  id: 'text-counter',
  name: 'Text Counter',
  render(container) {
    container.innerHTML = `
      <h2>Text counter</h2>
      <div class="text-counter-wrapper">
        <div>
          <label for="char-input">Enter text</label><br/>
          <textarea id="char-input" class="tool-textarea" rows="10" cols="50" style="font-family: monospace;"></textarea>
        </div>
        <div class="text-counter-results">
          <div class="text-counter-row">
            <span class="text-counter-label">Word count:</span>
            <span class="text-counter-value"><span id="word-count">0</span></span>
          </div>
          <div class="text-counter-row">
            <span class="text-counter-label">Character count:</span>
            <span class="text-counter-value"><span id="char-count">0</span></span>
          </div>
          <div class="text-counter-row">
            <span class="text-counter-label">Letters (a-z, A-Z):</span>
            <span class="text-counter-value"><span id="letter-count">0</span></span>
          </div>
          <div class="text-counter-row">
            <span class="text-counter-label">Numbers (0-9):</span>
            <span class="text-counter-value"><span id="number-count">0</span></span>
          </div>
          <div class="text-counter-row">
            <span class="text-counter-label">Special characters:</span>
            <span class="text-counter-value"><span id="special-count">0</span></span>
          </div>
          <div class="text-counter-row">
            <span class="text-counter-label">Spaces/blanks:</span>
            <span class="text-counter-value"><span id="space-count">0</span></span>
          </div>
        </div>
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
