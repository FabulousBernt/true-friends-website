import { counterstringTool } from "./tools/counter-string.js";
import { textCounterTool } from "./tools/text-counter.js";
import { paragraphGeneratorTool } from "./tools/paragraph-generator.js";
import { fileGeneratorTool } from "./tools/file-generator.js";

const tools = {
  "counter-string": counterstringTool,
  "text-counter": textCounterTool,
  "paragraph-generator": paragraphGeneratorTool,
  "files": fileGeneratorTool,
};

const container = document.getElementById("tool-container");
const buttons = document.querySelectorAll("[data-tool]");

function loadTool(id) {
  const tool = tools[id];
  if (!tool) return;

  // highlight active button
  buttons.forEach(btn => btn.classList.toggle("active", btn.dataset.tool === id));

  // render tool
  container.innerHTML = "";
  tool.render(container);
}

// attach listeners
buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const id = btn.dataset.tool;
    if (id) loadTool(id);
  });
});

// default tool
loadTool("counter-string");