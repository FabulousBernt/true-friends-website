import { copyToClipboard, createButton, createOutput, validateNumberInput } from "./utils.js";

export const counterstringTool = {
  id: "counter-string",
  name: "Counter string",

  generateCounterstring(length) {
    let str = "";
    let nextNum = 2;
    while (str.length < length) {
      let token = nextNum + "*";
      str += token;
      nextNum = str.length + String(nextNum + 2).length + 1;
    }
    return str.slice(0, length);
  },

  render(container) {
    container.innerHTML = "<h2>Counter string generator</h2>";

    // Input
    const label = document.createElement("label");
    label.classList.add("tool-label");
    label.textContent = "Length: ";
    
    const input = document.createElement("input");
    input.type = "number";
    input.value = "35";
    input.min = "1";
    input.max = "50000";
    input.classList.add("tool-input");
    label.appendChild(input);

    // Buttons
    const generateBtn = createButton("Generate", ["tool-button", "generate"]);
    const copyBtn = createButton("Copy to Clipboard", ["tool-button", "copy"]);

    const buttonsContainer = document.createElement("div");
    buttonsContainer.classList.add("btn-group");
    buttonsContainer.appendChild(generateBtn);
    buttonsContainer.appendChild(copyBtn);

    // Output
    const output = createOutput();

    // Append to container
    container.appendChild(label);
    container.appendChild(buttonsContainer);
    container.appendChild(output);

    // Event handlers
    generateBtn.addEventListener("click", () => {
      const validation = validateNumberInput(input.value, 1, 50000);
      if (!validation.isValid) {
        output.textContent = validation.error;
        return;
      }
      output.textContent = this.generateCounterstring(Number(input.value));
    });

    copyBtn.addEventListener("click", () => {
      copyToClipboard(output.textContent, copyBtn);
    });
  },
};