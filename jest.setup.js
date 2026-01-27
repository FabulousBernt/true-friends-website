// Minimal DOM implementation for testing canvas-based file generation
// This allows tests to run in Node.js without jsdom

global.document = {
  createElement: (tag) => {
    if (tag === "canvas") {
      const pngData = new Uint8Array([
        0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
        0x00, 0x00, 0x00, 0x0d, 0x49, 0x48, 0x44, 0x52,
        0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01,
        0x08, 0x02, 0x00, 0x00, 0x00, 0x90, 0x77, 0x53,
        0xde, 0x00, 0x00, 0x00, 0x0c, 0x49, 0x44, 0x41,
        0x54, 0x08, 0x99, 0x63, 0xf8, 0x0f, 0x00, 0x00,
        0x01, 0x01, 0x00, 0x01, 0x18, 0xdd, 0x8d, 0xb4,
        0x00, 0x00, 0x00, 0x00, 0x49, 0x45, 0x4e, 0x44,
        0xae, 0x42, 0x60, 0x82,
      ]);
      
      const mockCanvas = {
        width: 0,
        height: 0,
        getContext: () => ({
          fillStyle: "",
          fillRect: () => {},
          beginPath: () => {},
          arc: () => {},
          ellipse: () => {},
          fill: () => {},
          stroke: () => {},
          fillText: () => {},
          strokeText: () => {},
          drawImage: () => {},
          getImageData: () => ({ data: new Uint8Array(400) }),
          moveTo: () => {},
          lineTo: () => {},
          clearRect: () => {},
          restore: () => {},
          save: () => {},
          scale: () => {},
          translate: () => {},
          rotate: () => {},
        }),
        toBlob: function(callback, type, quality) {
          // Call callback asynchronously with a Blob
          Promise.resolve().then(() => {
            callback(new Blob([pngData], { type: type || "image/png" }));
          });
        },
        toDataURL: () => "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
      };
      
      return mockCanvas;
    }
    return {};
  },
};

global.Blob = class Blob {
  constructor(parts, options) {
    this.parts = parts;
    this.type = options?.type || "";
  }
};

global.TextEncoder = class TextEncoder {
  encode(str) {
    const arr = new Uint8Array(str.length);
    for (let i = 0; i < str.length; i++) {
      arr[i] = str.charCodeAt(i);
    }
    return arr;
  }
};

global.TextDecoder = class TextDecoder {
  decode(arr) {
    let str = "";
    for (let i = 0; i < arr.length; i++) {
      str += String.fromCharCode(arr[i]);
    }
    return str;
  }
};

global.FileReader = class FileReader {
  readAsArrayBuffer(blob) {
    setTimeout(() => {
      this.onloadend({ target: { result: new ArrayBuffer(8) } });
    }, 0);
  }
};
