// QR Code Generation Logic

const NUMERIC_RE = /^\d*$/;
const ALPHANUMERIC_RE = /^[\dA-Z $%*+\-./:]*$/;
const LATIN1_RE = /^[\x00-\xff]*$/;
const KANJI_RE = /^[\p{Script_Extensions=Han}\p{Script_Extensions=Hiragana}\p{Script_Extensions=Katakana}]*$/u;

const LENGTH_BITS = [
  [10, 12, 14],
  [9, 11, 13],
  [8, 16, 16],
  [8, 10, 12]
];

// Galois field lookup tables
const LOG = new Uint8Array(256);
const EXP = new Uint8Array(256);
for (let exponent = 1, value = 1; exponent < 256; exponent++) {
  value = value > 127 ? ((value << 1) ^ 285) : value << 1;
  LOG[value] = exponent % 255;
  EXP[exponent % 255] = value;
}

// Polynomial operations in Galois field
function mul(a, b) {
  return a && b ? EXP[(LOG[a] + LOG[b]) % 255] : 0;
}

function div(a, b) {
  return EXP[(LOG[a] + LOG[b] * 254) % 255];
}

function polyMul(poly1, poly2) {
  const coeffs = new Uint8Array(poly1.length + poly2.length - 1);
  for (let index = 0; index < coeffs.length; index++) {
    let coeff = 0;
    for (let p1index = 0; p1index <= index; p1index++) {
      const p2index = index - p1index;
      coeff ^= mul(poly1[p1index], poly2[p2index]);
    }
    coeffs[index] = coeff;
  }
  return coeffs;
}

function polyRest(dividend, divisor) {
  const quotientLength = dividend.length - divisor.length + 1;
  let rest = new Uint8Array(dividend);
  for (let count = 0; count < quotientLength; count++) {
    if (rest[0]) {
      const factor = div(rest[0], divisor[0]);
      const subtr = new Uint8Array(rest.length);
      subtr.set(polyMul(divisor, [factor]), 0);
      rest = rest.map((value, index) => value ^ subtr[index]).slice(1);
    } else {
      rest = rest.slice(1);
    }
  }
  return rest;
}

// Generator polynomial for EDC
function getGeneratorPoly(degree) {
  let lastPoly = new Uint8Array([1]);
  for (let index = 0; index < degree; index++) {
    lastPoly = polyMul(lastPoly, new Uint8Array([1, EXP[index]]));
  }
  return lastPoly;
}

// Calculating EDC
function getEDC(data, codewords) {
  const degree = codewords - data.length;
  const messagePoly = new Uint8Array(codewords);
  messagePoly.set(data, 0);
  return polyRest(messagePoly, getGeneratorPoly(degree));
}

// Data Encoding
function getByteData(content, lengthBits, dataCodewords) {
  const data = new Uint8Array(dataCodewords);
  const rightShift = (4 + lengthBits) & 7;
  const leftShift = 8 - rightShift;
  const andMask = (1 << rightShift) - 1;
  const dataIndexStart = lengthBits > 12 ? 2 : 1;

  data[0] = 64 + (content.length >> (lengthBits - 4));
  if (lengthBits > 12) {
    data[1] = (content.length >> rightShift) & 255;
  }
  data[dataIndexStart] = (content.length & andMask) << leftShift;

  for (let index = 0; index < content.length; index++) {
    const byte = content.charCodeAt(index);
    data[index + dataIndexStart] |= byte >> rightShift;
    data[index + dataIndexStart + 1] = (byte & andMask) << leftShift;
  }
  const remaining = dataCodewords - content.length - dataIndexStart - 1;
  for (let index = 0; index < remaining; index++) {
    const byte = index & 1 ? 17 : 236;
    data[index + content.length + 2] = byte;
  }
  return data;
}

function getSize(version) {
  return version * 4 + 17;
}

function getNewMatrix(version) {
  const length = getSize(version);
  return Array.from({ length }, () => new Uint8Array(length));
}

function fillArea(matrix, row, column, width, height, fill = 1) {
  const fillRow = new Uint8Array(width).fill(fill);
  for (let index = row; index < row + height; index++) {
    matrix[index].set(fillRow, column);
  }
}

function getModuleSequence(version) {
  const matrix = getNewMatrix(version);
  const size = getSize(version);

  fillArea(matrix, 0, 0, 9, 9);
  fillArea(matrix, 0, size - 8, 8, 9);
  fillArea(matrix, size - 8, 0, 9, 8);
  fillArea(matrix, size - 9, size - 9, 5, 5);
  fillArea(matrix, 6, 9, version * 4, 1);
  fillArea(matrix, 9, 6, 1, version * 4);
  matrix[size - 8][8] = 1;

  let rowStep = -1;
  let row = size - 1;
  let column = size - 1;
  const sequence = [];
  let index = 0;
  while (column >= 0) {
    if (matrix[row][column] === 0) {
      sequence.push([row, column]);
    }
    if (index & 1) {
      row += rowStep;
      if (row === -1 || row === size) {
        rowStep = -rowStep;
        row += rowStep;
        column -= column === 7 ? 2 : 1;
      } else {
        column++;
      }
    } else {
      column--;
    }
    index++;
  }
  return sequence;
}

function placeFixedPatterns(matrix) {
  const size = matrix.length;
  [[0, 0], [size - 7, 0], [0, size - 7]].forEach(([row, col]) => {
    fillArea(matrix, row, col, 7, 7);
    fillArea(matrix, row + 1, col + 1, 5, 5, 0);
    fillArea(matrix, row + 2, col + 2, 3, 3);
  });
  fillArea(matrix, 7, 0, 8, 1, 0);
  fillArea(matrix, 0, 7, 1, 7, 0);
  fillArea(matrix, size - 8, 0, 8, 1, 0);
  fillArea(matrix, 0, size - 8, 1, 7, 0);
  fillArea(matrix, 7, size - 8, 8, 1, 0);
  fillArea(matrix, size - 7, 7, 1, 7, 0);
  fillArea(matrix, size - 9, size - 9, 5, 5);
  fillArea(matrix, size - 8, size - 8, 3, 3, 0);
  matrix[size - 7][size - 7] = 1;
  for (let pos = 8; pos < size - 9; pos += 2) {
    matrix[6][pos] = 1;
    matrix[6][pos + 1] = 0;
    matrix[pos][6] = 1;
    matrix[pos + 1][6] = 0;
  }
  matrix[6][size - 7] = 1;
  matrix[size - 7][6] = 1;
  matrix[size - 8][8] = 1;
}

const MASK_FNS = [
  (row, column) => ((row + column) & 1) === 0,
  (row, column) => (row & 1) === 0,
  (row, column) => column % 3 === 0,
  (row, column) => (row + column) % 3 === 0,
  (row, column) => (((row >> 1) + Math.floor(column / 3)) & 1) === 0,
  (row, column) => ((row * column) & 1) + ((row * column) % 3) === 0,
  (row, column) => ((((row * column) & 1) + ((row * column) % 3)) & 1) === 0,
  (row, column) => ((((row + column) & 1) + ((row * column) % 3)) & 1) === 0,
];

function getMaskedMatrix(version, codewords, maskIndex) {
  const sequence = getModuleSequence(version);
  const matrix = getNewMatrix(version);
  sequence.forEach(([row, column], index) => {
    const codeword = codewords[index >> 3];
    const bitShift = 7 - (index & 7);
    const moduleBit = (codeword >> bitShift) & 1;
    matrix[row][column] = moduleBit ^ MASK_FNS[maskIndex](row, column);
  });
  return matrix;
}

function generateQRMatrix(message) {

  // Fixed parameters for version 2 QR code
  // Should be variable for other versions
  const VERSION = 2;
  const TOTAL_CODEWORDS = 44;
  const LENGTH_BITS = 8;
  const DATA_CODEWORDS = 28;

  const codewords = new Uint8Array(TOTAL_CODEWORDS);
  const byteData = getByteData(message, LENGTH_BITS, DATA_CODEWORDS);
  codewords.set(byteData, 0);
  codewords.set(getEDC(byteData, TOTAL_CODEWORDS), DATA_CODEWORDS);

  const matrix = getMaskedMatrix(VERSION, codewords, 0);
  placeFixedPatterns(matrix);
  return matrix;
}


function renderQRCode(matrix, containerId, moduleSize = 8, paddingModules = 4) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';

  // Calculate canvas size with padding
  const qrSize = matrix.length * moduleSize;
  const pad = paddingModules * moduleSize;
  const size = qrSize + pad * 2;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;

  const ctx = canvas.getContext('2d');

  // Fill background with white (padding)
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, size, size);

  // Draw QR code offset by padding
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      if (matrix[row][col]) {
        ctx.fillStyle = '#000000';
        ctx.fillRect(pad + col * moduleSize, pad + row * moduleSize, moduleSize, moduleSize);
      }
    }
  }

  container.appendChild(canvas);
  return canvas;
}


// UI Part of QR Code Generator
document.getElementById('generate-qr').addEventListener('click', () => {
  const text = document.getElementById('qr-input').value.trim();
  const qrDiv = document.getElementById('qr-code');

  if (!text) {
    qrDiv.innerHTML = '<p style="color: #ff6b6b; text-align: center;">Please enter text to generate QR code</p>';
    return;
  }

  try {
    qrDiv.innerHTML = '<p style="text-align: center;">Generating QR code...</p>';
    
  // Generat QR matrix and render with padding
  const matrix = generateQRMatrix(text);
  const canvas = renderQRCode(matrix, 'qr-code', 8, 4); // 4 modules padding

    // Download button
    const downloadBtn = document.createElement('button');
    downloadBtn.textContent = 'Download QR Code';
    downloadBtn.style.marginTop = '10px';
    downloadBtn.style.width = '50%';
    downloadBtn.style.margin = '0 auto';
    downloadBtn.onclick = () => {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'qr-code.png';
      link.click();
    };
    
    document.getElementById('qr-code').appendChild(downloadBtn);
  } catch (error) {
    console.error('Error generating QR code:', error);
    qrDiv.innerHTML = '<p style="color: #ff6b6b; text-align: center;">Error generating QR code. Try a shorter text.</p>';
}
});

document.getElementById('qr-input').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
	document.getElementById('generate-qr').click();
  }
});




// Helper function to escape HTML
// Prevents XSS attacks
function escapeHtml(text) {
	const div = document.createElement('div');
	div.textContent = text;
	return div.innerHTML;
}


// QR Code Scanner Logic - Dummy output for now
document.getElementById('start-scan').addEventListener('click', () => {
	const fileInput = document.getElementById('qr-image-upload');
	const scanResult = document.getElementById('scan-result');

	if (!fileInput.files || fileInput.files.length === 0) {
		scanResult.innerHTML = 'Scan Result: <span style="color: #ff6b6b;">Please select an image file first</span>';
		return;
	}

	// Dummy output - logic to be implemented
	scanResult.innerHTML = 'Scan Result: <span style="color: #22c55e;">Dummy data for now!</span>';
	fileInput.value = ''; // Reset input for next scan
});

//For theme toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body

// Check saved preference on load
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    body.classList.add(currentTheme);
}

//Event listener for the click button
themeToggle.addEventListener('click', () => {
    body.classList.toggle("light-mode");

    if(body.classList.contains('light-mode')) {
        localStorage.setItem('theme', 'light-mode');
    } else {
        localStorage.setItem('theme', null);
    }
})
