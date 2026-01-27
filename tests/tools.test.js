import { counterstringTool } from "../testing-tools/tools/counter-string.js";
import { paragraphGeneratorTool } from "../testing-tools/tools/paragraph-generator.js";
import { textCounterTool } from "../testing-tools/tools/text-counter.js";
import { fileGeneratorTool } from "../testing-tools/tools/file-generator.js";

// ============================================================
// Counter String Tests
// ============================================================
describe("Counter String Tool", () => {
  it("generateCounterstring creates correct length", () => {
    const result = counterstringTool.generateCounterstring(10);
    expect(result.length).toBe(10);
  });

  it("generateCounterstring creates exact length for various inputs", () => {
    const testLengths = [1, 5, 35, 100, 1000];
    testLengths.forEach(length => {
      const result = counterstringTool.generateCounterstring(length);
      expect(result.length).toBe(length);
    });
  });

  it("generateCounterstring contains asterisks and numbers", () => {
    const result = counterstringTool.generateCounterstring(50);
    expect(result).toContain("*");
    expect(/\d/.test(result)).toBe(true);
  });

  it("generateCounterstring with min length 1", () => {
    const result = counterstringTool.generateCounterstring(1);
    expect(result.length).toBe(1);
    expect(result).toBeTruthy();
  });

  it("generateCounterstring respects max length 50000", () => {
    const result = counterstringTool.generateCounterstring(50000);
    expect(result.length).toBe(50000);
  });
});

// ============================================================
// Paragraph Generator Tests
// ============================================================
describe("Paragraph Generator Tool", () => {
  it("wordPool exists and has content", () => {
    expect(Array.isArray(paragraphGeneratorTool.wordPool)).toBe(true);
    expect(paragraphGeneratorTool.wordPool.length).toBeGreaterThan(0);
  });

  it("generateParagraph creates correct word count", () => {
    const result = paragraphGeneratorTool.generateParagraph(10);
    const wordCount = result.split(/\s+/).filter(word => word.length > 0).length;
    expect(wordCount).toBe(10);
  });

  it("generateParagraph with various word counts", () => {
    const testCounts = [1, 5, 50, 100];
    testCounts.forEach(count => {
      const result = paragraphGeneratorTool.generateParagraph(count);
      const wordCount = result.split(/\s+/).filter(word => word.length > 0).length;
      expect(wordCount).toBe(count);
    });
  });

  it("generateParagraph starts with capital letter", () => {
    const result = paragraphGeneratorTool.generateParagraph(5);
    expect(/^[A-Z]/.test(result)).toBe(true);
  });

  it("generateParagraph ends with period", () => {
    const result = paragraphGeneratorTool.generateParagraph(5);
    expect(result.endsWith(".")).toBe(true);
  });

  it("generateParagraph respects max 10000 words", () => {
    const result = paragraphGeneratorTool.generateParagraph(10000);
    const wordCount = result.split(/\s+/).filter(word => word.length > 0).length;
    expect(wordCount).toBe(10000);
  });
});

// ============================================================
// Text Counter Tests
// ============================================================
describe("Text Counter Tool", () => {
  it("MAX_LENGTH constant exists", () => {
    expect(textCounterTool.MAX_LENGTH).toBeDefined();
    expect(textCounterTool.MAX_LENGTH).toBe(100000);
  });

  it("updateCounts correctly counts characters", () => {
    const mockSpans = {
      char: { textContent: "" },
      word: { textContent: "" },
      letter: { textContent: "" },
      number: { textContent: "" },
      special: { textContent: "" },
      space: { textContent: "" }
    };

    const text = "Hello World 123!";
    textCounterTool.updateCounts(text, mockSpans.char, mockSpans.word, mockSpans.letter, mockSpans.number, mockSpans.special, mockSpans.space);

    expect(mockSpans.char.textContent).toBe(16);
    expect(mockSpans.word.textContent).toBe(3);
    expect(mockSpans.letter.textContent).toBe(10);
    expect(mockSpans.number.textContent).toBe(3);
    expect(mockSpans.space.textContent).toBe(2);
    expect(mockSpans.special.textContent).toBe(1);
  });

  it("updateCounts with empty string", () => {
    const mockSpans = {
      char: { textContent: "" },
      word: { textContent: "" },
      letter: { textContent: "" },
      number: { textContent: "" },
      special: { textContent: "" },
      space: { textContent: "" }
    };

    textCounterTool.updateCounts("", mockSpans.char, mockSpans.word, mockSpans.letter, mockSpans.number, mockSpans.special, mockSpans.space);

    expect(mockSpans.char.textContent).toBe(0);
    expect(mockSpans.word.textContent).toBe(0);
    expect(mockSpans.letter.textContent).toBe(0);
    expect(mockSpans.number.textContent).toBe(0);
  });

  it("updateCounts distinguishes letters and numbers", () => {
    const mockSpans = {
      char: { textContent: "" },
      word: { textContent: "" },
      letter: { textContent: "" },
      number: { textContent: "" },
      special: { textContent: "" },
      space: { textContent: "" }
    };

    textCounterTool.updateCounts("abc123", mockSpans.char, mockSpans.word, mockSpans.letter, mockSpans.number, mockSpans.special, mockSpans.space);

    expect(mockSpans.letter.textContent).toBe(3);
    expect(mockSpans.number.textContent).toBe(3);
  });
});

// ============================================================
// File Generator Tests
// ============================================================
describe("File Generator Tool", () => {
  it("Tool object structure", () => {
    expect(fileGeneratorTool.id).toBe("files");
    expect(fileGeneratorTool.name).toBe("File Generator");
    expect(typeof fileGeneratorTool.render).toBe("function");
    expect(typeof fileGeneratorTool.generateFile).toBe("function");
  });

  it("generateFile supports all file types", async () => {
    const fileTypes = ["PNG", "JPG", "GIF", "PDF", "SVG", "TIFF", "DOCX", "XLSX", "PPTX", "XML", "CSV"];

    for (const type of fileTypes) {
      const result = await fileGeneratorTool.generateFile(type);
      expect(result).toBeDefined();
      expect(result.extension).toBeDefined();
      expect(result.content).toBeDefined();
    }
  });

  it("generateFile returns correct extensions", async () => {
    const expectedExtensions = {
      PNG: "png",
      JPG: "jpg",
      GIF: "gif",
      PDF: "pdf",
      SVG: "svg",
      TIFF: "tiff",
      DOCX: "docx",
      XLSX: "xlsx",
      PPTX: "pptx",
      XML: "xml",
      CSV: "csv"
    };

    for (const [type, expectedExt] of Object.entries(expectedExtensions)) {
      const result = await fileGeneratorTool.generateFile(type);
      expect(result.extension).toBe(expectedExt);
    }
  });

  it("PDF content includes required text", async () => {
    const result = await fileGeneratorTool.generateFile("PDF");
    const pdfText = new TextDecoder().decode(result.content);
    expect(pdfText).toContain("truefriends.se");
  });

  it("SVG content is valid XML", async () => {
    const result = await fileGeneratorTool.generateFile("SVG");
    const svgText = new TextDecoder().decode(result.content);
    expect(svgText).toContain("<?xml");
    expect(svgText).toContain("<svg");
  });

  it("XML content is valid XML", async () => {
    const result = await fileGeneratorTool.generateFile("XML");
    const xmlText = new TextDecoder().decode(result.content);
    expect(xmlText).toContain("<?xml");
    expect(xmlText).toContain("<root>");
    expect(xmlText).toContain("truefriends.se");
  });

  it("CSV content is formatted correctly", async () => {
    const result = await fileGeneratorTool.generateFile("CSV");
    const csvText = new TextDecoder().decode(result.content);
    expect(csvText).toContain("Message");
    expect(csvText).toContain("truefriends.se");
  });
});

// ============================================================
// Integration Tests
// ============================================================
describe("Integration Tests", () => {
  it("All tools are properly exported", () => {
    expect(counterstringTool).toBeDefined();
    expect(paragraphGeneratorTool).toBeDefined();
    expect(textCounterTool).toBeDefined();
    expect(fileGeneratorTool).toBeDefined();
  });

  it("All tools have required properties", () => {
    const tools = [counterstringTool, paragraphGeneratorTool, textCounterTool, fileGeneratorTool];
    tools.forEach(tool => {
      expect(tool.id).toBeDefined();
      expect(tool.name).toBeDefined();
      expect(typeof tool.render).toBe("function");
    });
  });
});
