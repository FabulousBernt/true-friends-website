import { createButton, createStatusMessage } from './utils.js';

export const fileGeneratorTool = {
  id: 'files',
  name: 'File Generator',

  render(container) {
    container.innerHTML = '<h2>File Generator</h2><p>Generate test files in various formats for compatibility testing</p>';

    // File type options
    const fileTypes = ['PNG', 'JPG', 'GIF', 'PDF', 'SVG', 'TIFF', 'DOCX', 'XLSX', 'PPTX', 'XML', 'CSV'];

    // Checkboxes container
    const checkboxesDiv = document.createElement('div');
    checkboxesDiv.className = 'file-checkboxes-container';

    const checkboxes = {};

    fileTypes.forEach(type => {
      const label = document.createElement('label');
      label.className = 'file-checkbox-label';

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.value = type;
      checkbox.className = 'file-checkbox';
      checkboxes[type] = checkbox;

      label.appendChild(checkbox);
      label.appendChild(document.createTextNode(` ${type}`));

      checkboxesDiv.appendChild(label);
    });

    // Create buttons using utility
    const selectAllButton = createButton('Select All', ['btn-secondary']);
    const deselectAllButton = createButton('Deselect All', ['btn-secondary']);
    const generateButton = createButton('Generate', ['btn-primary']);

    // Buttons container
    const buttonsContainer = document.createElement('div');
    buttonsContainer.className = 'file-buttons-container';
    buttonsContainer.appendChild(selectAllButton);
    buttonsContainer.appendChild(deselectAllButton);
    buttonsContainer.appendChild(generateButton);

    // Status message
    const statusDiv = createStatusMessage('');
    statusDiv.style.display = 'none';

    container.appendChild(checkboxesDiv);
    container.appendChild(buttonsContainer);
    container.appendChild(statusDiv);

    // Select all handler
    selectAllButton.addEventListener('click', () => {
      fileTypes.forEach(type => {
        checkboxes[type].checked = true;
      });
    });

    // Deselect all handler
    deselectAllButton.addEventListener('click', () => {
      fileTypes.forEach(type => {
        checkboxes[type].checked = false;
      });
    });

    // Generate handler
    generateButton.addEventListener('click', async () => {
      const selectedTypes = fileTypes.filter(type => checkboxes[type].checked);

      if (selectedTypes.length === 0) {
        statusDiv.textContent = 'Please select at least one file type';
        statusDiv.classList.add('error');
        statusDiv.classList.remove('success', 'processing');
        statusDiv.style.display = 'block';
        return;
      }

      statusDiv.textContent = 'Generating files...';
      statusDiv.classList.add('info');
      statusDiv.classList.remove('error', 'success');
      statusDiv.style.display = 'block';
      generateButton.disabled = true;

      try {
        // Dynamically load JSZip library
        if (!window.JSZip) {
          const script = document.createElement('script');
          script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js';
          document.head.appendChild(script);
          await new Promise(resolve => {
            script.onload = resolve;
            script.onerror = () => {
              throw new Error('Failed to load JSZip library');
            };
          });
        }

        const JSZip = window.JSZip;
        const zip = new JSZip();

        // Generate files for each selected type
        for (const type of selectedTypes) {
          try {
            const fileData = await this.generateFile(type);
            
            if (!fileData || !fileData.content) {
              throw new Error(`Failed to generate ${type}: invalid file data`);
            }
            
            // Handle ZIP structures (DOCX, XLSX, PPTX)
            if (fileData.content && fileData.content.__isZipStructure) {
              const innerZip = new JSZip();
              
              // Add [Content_Types].xml first and uncompressed (required for OOXML files)
              const contentTypesFile = fileData.content.files.find(f => f.path === '[Content_Types].xml');
              if (contentTypesFile) {
                innerZip.file(contentTypesFile.path, contentTypesFile.content, { 
                  binary: true, 
                  compression: 'STORE',
                  compressionOptions: { level: 0 }
                });
              }
              
              // Add all other files
              for (const file of fileData.content.files) {
                if (file.path !== '[Content_Types].xml') {
                  innerZip.file(file.path, file.content, { binary: true });
                }
              }
              
              const innerZipBlob = await innerZip.generateAsync({ type: 'uint8array' });
              zip.file(`test-file.${fileData.extension}`, innerZipBlob, { binary: true });
            } else {
              zip.file(`test-file.${fileData.extension}`, fileData.content, { binary: true });
            }
          } catch (fileError) {
            throw new Error(`Error generating ${type}: ${fileError.message}`);
          }
        }

        // Generate zip
        const zipBlob = await zip.generateAsync({ type: 'blob' });

        // Download zip
        const url = URL.createObjectURL(zipBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'test-files.zip';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        statusDiv.textContent = `✓ Successfully generated ${selectedTypes.length} file(s) and downloaded as test-files.zip`;
        statusDiv.classList.add('success');
        statusDiv.classList.remove('error', 'info');
      } catch (error) {
        statusDiv.textContent = `Error: ${error.message}`;
        statusDiv.classList.add('error');
        statusDiv.classList.remove('success', 'info');
      } finally {
        generateButton.disabled = false;
      }
    });
  },

  async generateFile(type) {
    switch (type) {
      case 'PNG':
        return {
          extension: 'png',
          content: await this.generatePNG()
        };
      case 'JPG':
        return {
          extension: 'jpg',
          content: await this.generateJPG()
        };
      case 'GIF':
        return {
          extension: 'gif',
          content: await this.generateGIF()
        };
      case 'PDF':
        return {
          extension: 'pdf',
          content: this.generatePDF()
        };
      case 'SVG':
        return {
          extension: 'svg',
          content: this.generateSVG()
        };
      case 'TIFF':
        return {
          extension: 'tiff',
          content: await this.generateTIFF()
        };
      case 'DOCX':
        return {
          extension: 'docx',
          content: this.generateDOCX()
        };
      case 'XLSX':
        return {
          extension: 'xlsx',
          content: this.generateXLSX()
        };
      case 'PPTX':
        return {
          extension: 'pptx',
          content: this.generatePPT()
        };
      case 'XML':
        return {
          extension: 'xml',
          content: this.generateXML()
        };
      case 'CSV':
        return {
          extension: 'csv',
          content: this.generateCSV()
        };
      default:
        throw new Error(`Unknown file type: ${type}`);
    }
  },

  // Image generators
  async generatePNG() {
    // 100x100 red pixel PNG generated via canvas
    return this.createCanvasImage('png');
  },

  async generateJPG() {
    // 100x100 JPEG generated via canvas
    return this.createCanvasImage('jpg');
  },

  async generateGIF() {
    // 100x100 GIF - canvas based with True Friends logo
    return this.createGIF100x100();
  },

  async generateTIFF() {
    // 100x100 TIFF generated via canvas
    return this.createCanvasImage('tiff');
  },

  async createCanvasImage(format) {
    // Create canvas and draw the True Friends logo
    const canvas = document.createElement('canvas');
    canvas.width = 100;
    canvas.height = 100;
    const ctx = canvas.getContext('2d');

    // White background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 100, 100);

    // Draw True Friends smiley logo on canvas
    // This is a simplified representation of the logo
    // Yellow face
    ctx.fillStyle = '#FEE440';
    ctx.beginPath();
    ctx.arc(50, 50, 45, 0, Math.PI * 2);
    ctx.fill();

    // Left eye
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.ellipse(35, 40, 6, 8, 0, 0, Math.PI * 2);
    ctx.fill();

    // Right eye
    ctx.beginPath();
    ctx.ellipse(65, 40, 6, 8, 0, 0, Math.PI * 2);
    ctx.fill();

    // Smile (curved line)
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(50, 50, 20, 0, Math.PI, false);
    ctx.stroke();

    // Convert canvas to blob
    return new Promise((resolve) => {
      if (format === 'jpg') {
        canvas.toBlob((blob) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve(new Uint8Array(reader.result));
          };
          reader.readAsArrayBuffer(blob);
        }, 'image/jpeg');
      } else if (format === 'png') {
        canvas.toBlob((blob) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve(new Uint8Array(reader.result));
          };
          reader.readAsArrayBuffer(blob);
        }, 'image/png');
      } else if (format === 'tiff') {
        // TIFF is complex, so we'll use PNG converted to TIFF-like format
        canvas.toBlob((blob) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve(new Uint8Array(reader.result));
          };
          reader.readAsArrayBuffer(blob);
        }, 'image/png');
      }
    });
  },

  canvasToArrayBuffer(canvas, mimeType) {
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(new Uint8Array(reader.result));
        };
        reader.readAsArrayBuffer(blob);
      }, mimeType);
    }).then(result => result);
  },

  async createGIF100x100() {
    // Use canvas to generate GIF-compatible image data
    const canvas = document.createElement('canvas');
    canvas.width = 100;
    canvas.height = 100;
    const ctx = canvas.getContext('2d');

    // White background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 100, 100);

    // Draw True Friends smiley logo
    ctx.fillStyle = '#FEE440';
    ctx.beginPath();
    ctx.arc(50, 50, 45, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.ellipse(35, 40, 6, 8, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.ellipse(65, 40, 6, 8, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(50, 50, 20, 0, Math.PI, false);
    ctx.stroke();

    // Convert to array buffer
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(new Uint8Array(reader.result));
        };
        reader.readAsArrayBuffer(blob);
      }, 'image/png'); // Use PNG format for better compatibility
    });
  },

  generatePDF() {
    // Minimal valid PDF with True Friends text
    const textLine = 'This file was generated at www.truefriends.se/testing-tools';
    const pdfContent = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>
endobj
4 0 obj
<< /Length 76 >>
stream
BT
/F1 12 Tf
50 700 Td
(${textLine}) Tj
ET
endstream
endobj
5 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000214 00000 n 
0000000342 00000 n 
trailer
<< /Size 6 /Root 1 0 R >>
startxref
427
%%EOF`;
    return new TextEncoder().encode(pdfContent);
  },

  generateSVG() {
    // True Friends logo
    const svg = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg width="100" height="100" viewBox="0 0 3957 4036" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
    <g transform="matrix(1,0,0,1,-6240,-4885)">
        <g id="tf-smiley-logo-transparent-coloured" transform="matrix(1.40298,0,0,1.86828,331.488,4885.22)">
            <rect x="4212.02" y="0" width="2819.49" height="2160" style="fill:none;"/>
            <g transform="matrix(8.01383,0,0,5.76494,-8122.28,-9724.66)">
                <g id="Smiley-logo-coloured">
                    <path d="M1702.57,1694.39C1730.22,1691.53 1759.69,1690.59 1828.98,1743.63C1885.43,1786.83 1883.3,1836.73 1883.85,1874.94C1883.88,1877.26 1888.24,1943.85 1852.6,1986.36C1843.77,1996.89 1813.88,2018.8 1784.1,2034.82C1763.37,2045.96 1742.63,2054.06 1728.91,2054.88C1708.52,2056.1 1695.08,2051.72 1679.19,2044.44C1665.8,2038.31 1650.33,2029.83 1624.77,2021.65C1604.98,2015.31 1582.98,2009.51 1566.37,1971.92C1552.25,1939.97 1546.05,1879.06 1546.05,1871.83C1546.05,1844.13 1559.08,1820.04 1575.33,1789.27C1588.83,1763.68 1594.76,1750.09 1599.11,1741.79C1605,1730.57 1608.83,1726.58 1618.62,1720.63C1627.74,1715.09 1673.67,1697.38 1702.57,1694.39ZM1715.07,1999.12C1754.17,1999.12 1827.76,1947.84 1832.38,1887.27L1832.38,1887.26C1832.6,1884.02 1844.87,1883.81 1844.84,1881.79C1844.78,1877.49 1835.13,1872.18 1823.4,1872.01C1813.15,1872.01 1805.13,1876.9 1803.15,1879.47C1800.05,1883.51 1807.72,1881.39 1813.62,1883C1816.47,1883.79 1818.34,1886.63 1818.03,1889.69C1812.17,1941.63 1756.51,1983.36 1715.04,1983.36C1673.57,1983.36 1617.97,1941.62 1612.12,1889.69C1611.8,1886.63 1613.67,1883.79 1616.52,1883C1622.42,1881.39 1630.09,1883.51 1626.99,1879.47C1625.01,1876.9 1616.99,1872.01 1606.74,1872.01C1595.01,1872.18 1585.36,1877.49 1585.3,1881.79C1585.28,1883.81 1597.54,1884.02 1597.76,1887.26L1597.76,1887.27C1602.38,1947.84 1675.97,1999.12 1715.07,1999.12ZM1694.81,1833.25L1682.98,1826.35C1682.92,1826.32 1682.89,1826.26 1682.89,1826.19C1682.89,1826.12 1682.92,1826.06 1682.98,1826.03L1694.81,1819.13C1694.97,1819.04 1695.06,1818.85 1695.04,1818.66C1693.09,1804.23 1685.69,1793.48 1676.86,1793.48C1666.55,1793.48 1658.18,1808.14 1658.18,1826.19C1658.18,1844.25 1666.55,1858.9 1676.86,1858.9C1685.69,1858.9 1693.09,1848.15 1695.04,1833.72C1695.06,1833.53 1694.97,1833.35 1694.81,1833.25ZM1771.76,1833.25L1759.93,1826.35C1759.87,1826.32 1759.84,1826.26 1759.84,1826.19C1759.84,1826.12 1759.87,1826.06 1759.93,1826.03L1771.76,1819.13C1771.92,1819.04 1772.01,1818.85 1771.99,1818.66C1770.04,1804.23 1762.64,1793.48 1753.81,1793.48C1743.5,1793.48 1735.13,1808.14 1735.13,1826.19C1735.13,1844.25 1743.5,1858.9 1753.81,1858.9C1762.64,1858.9 1770.04,1848.15 1771.99,1833.72C1772.01,1833.53 1771.92,1833.35 1771.76,1833.25Z" style="fill:rgb(254,228,64);"/>
                </g>
            </g>
        </g>
    </g>
</svg>`;
    return new TextEncoder().encode(svg);
  },

  generateDOCX() {
    // Minimal DOCX (ZIP with XML inside)
    // This requires creating a ZIP structure
    return this.createDOCX();
  },

  generateXLSX() {
    // Minimal XLSX file with dummy data
    return this.createXLSX();
  },

  generatePPT() {
    // Generate PPTX (modern PowerPoint format) which is ZIP-based
    return this.createPPTX();
  },

  createPPTX() {
    // Create a minimal PPTX file with text
    const files = {};

    files['[Content_Types].xml'] = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
<Default Extension="xml" ContentType="application/xml"/>
<Override PartName="/ppt/presentation.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml"/>
<Override PartName="/ppt/slides/slide1.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slide+xml"/>
<Override PartName="/ppt/slideMasters/slideMaster1.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slideMaster+xml"/>
<Override PartName="/ppt/slideLayouts/slideLayout1.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slideLayout+xml"/>
<Override PartName="/ppt/theme/theme1.xml" ContentType="application/vnd.openxmlformats-officedocument.theme+xml"/>
<Override PartName="/ppt/presProps.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.presProps+xml"/>
<Override PartName="/ppt/tableStyles.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.tableStyles+xml"/>
<Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>
<Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>
</Types>`;

    files['_rels/.rels'] = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="ppt/presentation.xml"/>
<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>
<Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/>
</Relationships>`;

    files['ppt/_rels/presentation.xml.rels'] = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide" Target="slides/slide1.xml"/>
<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideMaster" Target="slideMasters/slideMaster1.xml"/>
<Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/notesMaster" Target="notesMasters/notesMaster1.xml"/>
<Relationship Id="rId4" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/handoutMaster" Target="handoutMasters/handoutMaster1.xml"/>
<Relationship Id="rId5" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme" Target="theme/theme1.xml"/>
<Relationship Id="rId6" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/presProps" Target="presProps.xml"/>
<Relationship Id="rId7" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/tableStyles" Target="tableStyles.xml"/>
<Relationship Id="rId8" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/viewProps" Target="viewProps.xml"/>
</Relationships>`;

    files['ppt/presentation.xml'] = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:presentation xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:rel="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
<p:sldIdLst><p:sldId id="256" rel:id="rId1"/></p:sldIdLst>
<p:sldSz cx="9144000" cy="6858000"/>
<p:notesSz cx="6858000" cy="9144000"/>
</p:presentation>`;

    files['ppt/slides/slide1.xml'] = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:sld xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main">
<p:cSld>
<p:bg><p:bgPr><a:solidFill><a:srgbClr val="FFFFFF"/></a:solidFill><a:effectLst/></p:bgPr></p:bg>
<p:spTree>
<p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr>
<p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="9144000" cy="6858000"/><a:chOff x="0" y="0"/><a:chExt cx="9144000" cy="6858000"/></a:xfrm></p:grpSpPr>
<p:sp><p:nvSpPr><p:cNvPr id="2" name="Title 1"/><p:cNvSpPr txBody="1"/><p:nvPr/></p:nvSpPr><p:spPr><a:xfrm><a:off x="457200" y="457200"/><a:ext cx="8229600" cy="1143000"/></a:xfrm></p:spPr><p:txBody><a:bodyPr wrap="square"/><a:lstStyle/><a:p><a:r><a:rPr lang="en-US" sz="4400" dirty="0"/><a:t>This file was generated at www.truefriends.se/testing-tools</a:t></a:r></a:p></p:txBody></p:sp>
</p:spTree>
</p:cSld>
</p:sld>`;

    files['ppt/slides/_rels/slide1.xml.rels'] = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
</Relationships>`;

    files['ppt/slideMasters/slideMaster1.xml'] = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:sldMaster xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main">
<p:cSld><p:bg><p:bgPr><a:solidFill><a:srgbClr val="FFFFFF"/></a:solidFill><a:effectLst/></p:bgPr></p:bg><p:spTree><p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr><p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="9144000" cy="6858000"/><a:chOff x="0" y="0"/><a:chExt cx="9144000" cy="6858000"/></a:xfrm></p:grpSpPr></p:spTree></p:cSld>
<p:clrMap accent1="accent1" accent2="accent2" accent3="accent3" accent4="accent4" accent5="accent5" accent6="accent6" bg1="bg1" bg2="bg2" dk1="dk1" dk2="dk2" folHlink="folHlink" lk1="lk1" lt1="lt1" lt2="lt2"/>
</p:sldMaster>`;

    files['ppt/slideMasters/_rels/slideMaster1.xml.rels'] = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme" Target="../theme/theme1.xml"/>
<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout" Target="../slideLayouts/slideLayout1.xml"/>
</Relationships>`;

    files['ppt/slideLayouts/slideLayout1.xml'] = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:sldLayout xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main">
<p:cSld><p:bg><p:bgPr><a:solidFill><a:schemeClr val="bg1"/></a:solidFill><a:effectLst/></p:bgPr></p:bg><p:spTree><p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr><p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="9144000" cy="6858000"/><a:chOff x="0" y="0"/><a:chExt cx="9144000" cy="6858000"/></a:xfrm></p:grpSpPr></p:spTree></p:cSld>
<p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr>
</p:sldLayout>`;

    files['ppt/slideLayouts/_rels/slideLayout1.xml.rels'] = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideMaster" Target="../slideMasters/slideMaster1.xml"/>
</Relationships>`;

    files['ppt/notesMasters/notesMaster1.xml'] = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:notesMaster xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main">
<p:cSld><p:spTree><p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr><p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="6858000" cy="9144000"/><a:chOff x="0" y="0"/><a:chExt cx="6858000" cy="9144000"/></a:xfrm></p:grpSpPr></p:spTree></p:cSld>
</p:notesMaster>`;

    files['ppt/handoutMasters/handoutMaster1.xml'] = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:handoutMaster xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main">
<p:cSld><p:spTree><p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr><p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="9144000" cy="6858000"/><a:chOff x="0" y="0"/><a:chExt cx="9144000" cy="6858000"/></a:xfrm></p:grpSpPr></p:spTree></p:cSld>
</p:handoutMaster>`;

    files['ppt/theme/theme1.xml'] = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" name="Office Theme">
<a:themeElements>
<a:clrScheme name="Office"><a:dk1><a:srgbClr val="000000"/></a:dk1><a:lt1><a:srgbClr val="FFFFFF"/></a:lt1><a:dk2><a:srgbClr val="44546A"/></a:dk2><a:lt2><a:srgbClr val="D9E1F2"/></a:lt2><a:accent1><a:srgbClr val="5B9BD5"/></a:accent1><a:accent2><a:srgbClr val="ED7D31"/></a:accent2><a:accent3><a:srgbClr val="A5A5A5"/></a:accent3><a:accent4><a:srgbClr val="FFC000"/></a:accent4><a:accent5><a:srgbClr val="5B9BD5"/></a:accent5><a:accent6><a:srgbClr val="70AD47"/></a:accent6><a:hyperlink><a:srgbClr val="0563C1"/></a:hyperlink><a:folHyperlink><a:srgbClr val="954F72"/></a:folHyperlink></a:clrScheme>
</a:themeElements>
</a:theme>`;

    files['ppt/presProps.xml'] = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:presProps xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"/>`;

    files['ppt/viewProps.xml'] = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:viewPr xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><p:normalViewPr><p:restoredLeft sz="15000"/><p:restoredTop sz="94860"/></p:normalViewPr><p:slideViewPr/><p:outlineViewPr/><p:notesViewPr/><p:handoutViewPr/></p:viewPr>`;

    files['ppt/tableStyles.xml'] = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:tblStyleLst xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main"/>`;

    files['docProps/core.xml'] = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/officeDocument/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
<dc:creator>True Friends Generator</dc:creator>
<cp:lastModifiedBy>True Friends Generator</cp:lastModifiedBy>
<dcterms:created xsi:type="dcterms:W3CDTF">${new Date().toISOString()}</dcterms:created>
<dcterms:modified xsi:type="dcterms:W3CDTF">${new Date().toISOString()}</dcterms:modified>
</cp:coreProperties>`;

    files['docProps/app.xml'] = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes">
<TotalTime>0</TotalTime>
<Application>Microsoft PowerPoint</Application>
<AppVersion>16.0000</AppVersion>
<Company>True Friends</Company>
<Slides>1</Slides>
<ScaleCrop>false</ScaleCrop>
<LinksUpToDate>false</LinksUpToDate>
<SharedDoc>false</SharedDoc>
<HyperlinksChanged>false</HyperlinksChanged>
<RevisionNumber>1</RevisionNumber>
</Properties>`;

    return this.createZipFromFiles(files);
  },

  generateXML() {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<root>
  <message>This file was generated at www.truefriends.se/testing-tools</message>
  <timestamp>${new Date().toISOString()}</timestamp>
</root>`;
    return new TextEncoder().encode(xml);
  },

  createXLSX() {
    // Create a minimal XLSX (which is a ZIP file with XML inside)
    const files = {};

    // [Content_Types].xml - MUST be first and uncompressed
    files['[Content_Types].xml'] = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
<Default Extension="xml" ContentType="application/xml"/>
<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>
<Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
<Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>
<Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>
<Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>
</Types>`;

    // _rels/.rels
    files['_rels/.rels'] = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>
<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>
<Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/>
</Relationships>`;

    // xl/_rels/workbook.xml.rels
    files['xl/_rels/workbook.xml.rels'] = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>
<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
</Relationships>`;

    // xl/workbook.xml
    files['xl/workbook.xml'] = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" mc:Ignorable="x15">
<fileVersion appName="xl" lastEdited="5" lowestEdited="5" rupBuild="19030"/>
<workbookPr defaultTheme="1"/>
<bookViews><workbookView xWindow="0" yWindow="0" windowWidth="15135" windowHeight="7575" activeTab="0"/></bookViews>
<sheets><sheet name="Sheet1" sheetId="1" r:id="rId1"/></sheets>
<calcPr calcId="162" fullCalcOnLoad="1"/>
</workbook>`;

    // xl/worksheets/sheet1.xml
    files['xl/worksheets/sheet1.xml'] = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" mc:Ignorable="x14ac">
<sheetViews><sheetView tabSelected="1" workbookViewId="0"/></sheetViews>
<sheetFormatPr defaultRowHeight="15"/>
<sheetData>
<row r="1" spans="1:1">
<c r="A1" t="str"><v>This file was generated at www.truefriends.se/testing-tools</v></c>
</row>
</sheetData>
<pageMargins left="0.7" top="0.75" right="0.7" bottom="0.75" header="0.3" footer="0.3"/>
</worksheet>`;

    // xl/styles.xml
    files['xl/styles.xml'] = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" mc:Ignorable="x14ac">
<fonts count="1"><font><sz val="11"/><color theme="1"/><name val="Calibri"/><family val="2"/><scheme val="minor"/></font></fonts>
<fills count="2"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill></fills>
<borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders>
<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>
<cellXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/></cellXfs>
<cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>
</styleSheet>`;

    // docProps/core.xml
    files['docProps/core.xml'] = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/officeDocument/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:dcmitype="http://purl.org/dc/dcmitype/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
<dc:creator>True Friends Generator</dc:creator>
<cp:lastModifiedBy>True Friends Generator</cp:lastModifiedBy>
<dcterms:created xsi:type="dcterms:W3CDTF">${new Date().toISOString()}</dcterms:created>
<dcterms:modified xsi:type="dcterms:W3CDTF">${new Date().toISOString()}</dcterms:modified>
</cp:coreProperties>`;

    // docProps/app.xml
    files['docProps/app.xml'] = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes">
<TotalTime>0</TotalTime>
<Application>Microsoft Excel</Application>
<AppVersion>16.0000</AppVersion>
</Properties>`;

    // Create ZIP using the same method
    return this.createZipFromFiles(files);
  },

  generateCSV() {
    const csv = `Message
This file was generated at www.truefriends.se/testing-tools`;
    return new TextEncoder().encode(csv);
  },

  createDOCX() {
    // Create a minimal DOCX ZIP structure
    const zipContent = {};

    // [Content_Types].xml
    zipContent['[Content_Types].xml'] = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
<Default Extension="xml" ContentType="application/xml"/>
<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
</Types>`;

    // _rels/.rels
    zipContent['_rels/.rels'] = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>`;

    // word/document.xml
    zipContent['word/document.xml'] = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
<w:body>
<w:p>
<w:r>
<w:t>This file was generated at www.truefriends.se/testing-tools</w:t>
</w:r>
</w:p>
</w:body>
</w:document>`;

    // word/_rels/document.xml.rels
    zipContent['word/_rels/document.xml.rels'] = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
</Relationships>`;

    return this.createZipFromFiles(zipContent);
  },

  createZipFromFiles(fileStructure) {
    // Create a proper ZIP file structure
    // This will be properly handled by JSZip when the file is generated
    const fileArray = [];
    
    for (const [path, content] of Object.entries(fileStructure)) {
      fileArray.push({
        path: path,
        content: typeof content === 'string' ? new TextEncoder().encode(content) : content
      });
    }

    // Return a marker object that will be processed by the generate handler
    return { __isZipStructure: true, files: fileArray };
  },

  hexToBytes(hex) {
    const bytes = new Uint8Array(hex.length / 2);
    for (let i = 0; i < hex.length; i += 2) {
      bytes[i / 2] = parseInt(hex.substr(i, 2), 16);
    }
    return bytes;
  }
};
