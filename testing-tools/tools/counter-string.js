export const counterstringTool = {
  id: "counter-string",
  name: "Counter string",
  render(container) {
    container.innerHTML = `
      <h2>Counter string generator</h2>
      <label>Length: <input id="length" type="number" value="35" min="1" class="shared-button"/></label>
      <div class="counter-buttons">
        <button id="generate" class="tool-button generate shared-button">Generate</button>
        <button id="copy" class="tool-button copy shared-button">Copy to Clipboard</button>
      </div>
      <pre id="output"></pre>
    `;

    const input = container.querySelector("#length");
    const button = container.querySelector("#generate");
    const copyButton = container.querySelector("#copy");
    const output = container.querySelector("#output");

    // Generate a proper counterstring
    function generateCounterstring(length) {
      let str = "";
      let nextNum = 2; // first number represents 2nd char
      while (str.length < length) {
        let token = nextNum + "*";
        str += token;
        // next number = current length of string + length of next number + 1 (for the *)
        nextNum = str.length + (String(nextNum + 2).length) + 1;
      }
      return str.slice(0, length);
    }

    button.addEventListener("click", () => {
      const len = Number(input.value);
      if (isNaN(len) || len < 1) {
        output.textContent = "Please enter a valid number > 0";
        return;
      }
      output.textContent = generateCounterstring(len);
    });

    copyButton.addEventListener("click", () => {
      if (!output.textContent.trim()) {
        copyButton.style.color = "red";
        copyButton.textContent = "Nothing to copy!";
        setTimeout(() => {
          copyButton.style.color = "";
          copyButton.textContent = "Copy to Clipboard";
        }, 1500);
        return;
      }
      navigator.clipboard.writeText(output.textContent).then(() => {
        copyButton.style.color = "green";
        copyButton.textContent = "Copied to clipboard!";
        setTimeout(() => {
          copyButton.style.color = "";
          copyButton.textContent = "Copy to Clipboard";
        }, 1500);
      }).catch(() => {
        copyButton.style.color = "red";
        copyButton.textContent = "Failed to copy!";
        setTimeout(() => {
          copyButton.style.color = "";
          copyButton.textContent = "Copy to Clipboard";
        }, 1500);
      });
    });
  }
};