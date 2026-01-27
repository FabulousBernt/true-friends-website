import { copyToClipboard, createButton, createOutput, validateNumberInput } from "./utils.js";

export const paragraphGeneratorTool = {
  id: "paragraph-generator",
  name: "Paragraph Generator",

  wordPool: [
    "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
    "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
    "magna", "aliqua", "ut", "enim", "ad", "minim", "veniam", "quis", "nostrud",
    "exercitation", "ullamco", "laboris", "nisi", "ut", "aliquip", "ex", "ea",
    "commodo", "consequat", "duis", "aute", "irure", "dolor", "in", "reprehenderit",
    "in", "voluptate", "velit", "esse", "cillum", "dolore", "eu", "fugiat", "nulla",
    "pariatur", "excepteur", "sint", "occaecat", "cupidatat", "non", "proident",
    "sunt", "in", "culpa", "qui", "officia", "deserunt", "mollit", "anim", "id",
    "est", "laborum"
  ],

  generateParagraph(wordCount) {
    const words = Array.from({ length: wordCount }, () =>
      this.wordPool[Math.floor(Math.random() * this.wordPool.length)]
    );
    let paragraph = words.join(" ");
    return paragraph.charAt(0).toUpperCase() + paragraph.slice(1) + ".";
  },

  render(container) {
    container.innerHTML = "<h2>Paragraph generator</h2>";

    // Input
    const label = document.createElement("label");
    label.classList.add("tool-label");
    label.textContent = "Number of words: ";
    
    const input = document.createElement("input");
    input.type = "number";
    input.value = "50";
    input.min = "1";
    input.max = "10000";
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
      const validation = validateNumberInput(input.value, 1, 10000);
      if (!validation.isValid) {
        output.textContent = validation.error;
        return;
      }
      output.textContent = this.generateParagraph(Number(input.value));
    });

    copyBtn.addEventListener("click", () => {
      copyToClipboard(output.textContent, copyBtn);
    });

    // Generate initial paragraph
    output.textContent = this.generateParagraph(parseInt(input.value, 10));
  }
};