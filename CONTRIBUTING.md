# Contributing to QR On-Site

<a href="https://winter-of-open-source.vercel.app/"><img src="assets/banner.png"></a>

Welcome to Winter of Open Source! 🎉    
We're excited to have you contribute to this QR Code Scanner and Generator project.

---

## Table of Contents

- [Setting Up Local Environment](#setting-up-local-environment)
- [Folder Structure](#folder-structure)
- [How to Contribute](#how-to-contribute)
- [How to Write a Clean PR](#how-to-write-a-clean-pr)
- [Scoring Rules](#scoring-rules)
- [Learning Resources](#learning-resources)
- [Code Style](#code-style)
- [Getting Help](#getting-help)

---

## Setting Up Local Environment

### Prerequisites
1. Basic knowledge of HTML, CSS, and JavaScript
2. Understanding of binary data and bitwise operations
3. Git installed on your system
4. A GitHub account

### Installation

1. **Fork the repository**
   
   Click the "Fork" button at the top right of this repository.

2. **Clone your fork**

```bash
git clone https://github.com/YOUR_NAME/qr-on-site.git
cd qr-on-site
```

3. **Open in your browser**

   Simply open `index.html` in your browser to test the application.

4. **Use a local server** (recommended for development)

```bash
# Using Python
python -m http.server 8000

# Using Node.js (npx)
npx serve .

# Using VS Code Live Server extension
# Right-click on index.html -> "Open with Live Server"
```

5. **Visit** `http://localhost:8000` in your browser

### Dependencies

This project has **no npm/yarn dependencies**. It's pure HTML, CSS, and JavaScript!

---

## How to Contribute

### Step 1: Choose an Issue

* Browse [open issues](../../issues)
* Look for labels:
  * `good first issue` / `beginner-friendly` – great for newcomers
  * `easy`, `medium`, `hard` – based on difficulty
  * `scanner`, `generator` – based on component
  * `documentation`, `bug`, `feature`, `enhancement`

### Step 2: Comment `/assign`

* Comment `/assign` on the issue you want to work on
* Wait for maintainer approval
* **Only 1 person per issue at a time**
* **Complete within 48 hours** or it gets unassigned

### Step 3: Create a Branch

```bash
git checkout -b fix/issue-number-short-description
```

Example branch names:
* `fix/23-add-error-correction`
* `feature/45-implement-finder-pattern`
* `docs/12-improve-readme`

### Step 4: Make Changes

* Follow existing code style
* Add meaningful comments explaining **why**, not just what
* Test your changes thoroughly in multiple browsers
* Keep commits atomic

### Step 5: Commit Changes

```bash
git add .
git commit -m "Fixes #23: Add Reed-Solomon error correction

- Implemented polynomial division
- Added GF(256) arithmetic
- Updated generator to use error correction"
```

### Step 6: Push & Create PR

```bash
git push origin fix/issue-number-short-description
```

* Go to your fork on GitHub → "Compare & pull request"
* Fill out the PR template completely
* Link the issue using `Fixes #<issue-number>`

---

## How to Write a Clean PR

### Must Include:
- Link to the issue: `Fixes #<issue-number>`
- Clear description of what you changed
- Screenshots (if UI changes)
- Tested in multiple browsers

### Code Requirements:
- Proper indentation (2 spaces for HTML/CSS/JS)
- Meaningful comments
- Use formatters (Prettier recommended)
- No console errors
- **NO external QR libraries** – build from scratch!

### PR Template :
- Open `.github/pull_request_template.md` for guidance
- Moreover, for other templates refer to the `.github/ISSUE_TEMPLATE/` folder
  
## Scoring Rules

## Issue Labels

| Label | Description |
|-------|-------------|
| `easy` | Beginner-friendly, small fixes |
| `medium` | Moderate complexity, features |
| `hard` | Complex tasks, major features |
| `documentation` | Documentation improvements |
| `bug` | Something isn't working |
| `feature` | New feature request |
| `good-first-issue` | Great for newcomers |
| `beginner-friendly` | Suitable for beginners |

### Points Per PR

| PR Type | Points |
|---------|--------|
| **Easy** | 10 |
| **Medium** | 20 |
| **Hard** | 40 |
| **Documentation Fix** | 5 |
| **Bug Fix** | 20 |
| **Feature Addition** | 30 |

### Bonuses

| Bonus | Points |
|-------|--------|
|**First 10 PRs** | +10 |
| **First PR of the Week** (resets Monday 12 AM) | +10 |
| **Most Impactful PR **(decided at end) | +50 |

### Rules

- **Only merged PRs count**
- Work on **only 1 issue at a time**
- Complete within **48 hours** or issue gets unassigned

---

## Learning Resources

Before you start contributing, we **strongly recommend** learning the fundamentals of QR code encoding and decoding. The goal is to build everything **from scratch without using any prebuilt libraries**.

### QR Code Generator - Essential Reading

Follow this comprehensive 10-part tutorial series:

| Part | Title | Topics Covered |
|------|-------|----------------|
| 1 | [Basic Concepts](https://dev.to/maxart2501/let-s-develop-a-qr-code-generator-part-i-basic-concepts-510a) | Data types, sizes, error correction, fixed patterns |
| 2 | [Sequencing Data](https://dev.to/maxart2501/let-s-develop-a-qr-code-generator-part-ii-sequencing-data-4ae) | Data encoding, byte mode, character count |
| 3 | [Error Correction](https://dev.to/maxart2501/let-s-develop-a-qr-code-generator-part-iii-error-correction-1kbm) | Reed-Solomon, polynomial division |
| 4 | [Placing the Bits](https://dev.to/maxart2501/let-s-develop-a-qr-code-generator-part-iv-placing-the-bits-4cg6) | Module placement, data regions |
| 5 | [Masking](https://dev.to/maxart2501/let-s-develop-a-qr-code-generator-part-v-masking-3cjl) | Mask patterns, penalty scoring |
| 6 | [Format Information](https://dev.to/maxart2501/let-s-develop-a-qr-code-generator-part-vi-format-information-1k1g) | Format bits, error correction encoding |
| 7 | [Painting the Canvas](https://dev.to/maxart2501/let-s-develop-a-qr-code-generator-part-vii-painting-the-canvas-27i6) | Rendering QR codes |
| 8 | [Bigger Sizes](https://dev.to/maxart2501/let-s-develop-a-qr-code-generator-part-viii-bigger-sizes-2hj5) | Handling larger versions |
| 9 | [Structuring Larger Versions](https://dev.to/maxart2501/let-s-develop-a-qr-code-generator-part-ix-structuring-larger-versions-2n5d) | Multiple data blocks, interleaving |
| 10 | [Creating Larger Codes](https://dev.to/maxart2501/let-s-develop-a-qr-code-generator-part-x-creating-larger-codes-31f4) | Complete implementation |

### QR Code Scanner - Suggested Readings

| Resource | Description |
|----------|-------------|
| [Thonky QR Code Tutorial](https://www.thonky.com/qr-code-tutorial/) | Comprehensive QR code structure reference |
| [ZXing Library Algorithms](https://github.com/zxing/zxing/wiki/How-it-works) | Detection and decoding algorithms |
| [QR Code Finder Pattern Detection](https://www.codeproject.com/Articles/1089319/QR-Code-Detection-and-Decoding) | Image processing techniques |

### Additional Resources

- [Reed-Solomon Error Correction](https://www.nayuki.io/page/reed-solomon-error-correcting-code-decoder) – for error correction
- [Galois Field Arithmetic](https://research.swtch.com/field) – math behind Reed-Solomon
- [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) – for rendering QR codes

> [!IMPORTANT]
> **Do NOT use libraries like `qrcode.js`, `jsQR`, or similar.** The goal is to understand and implement the algorithms yourself!

---

## Code Style

- Use proper **indentation** for HTML/CSS/JS
- Use **descriptive variable names**
- Explain **why**, not just what in comments
- **Logic** for the functions, algorithms used should be clear

### Example:

```javascript
// Good: Explains WHY
// Apply mask pattern 0: (row + col) % 2 === 0
// This creates a checkerboard pattern to improve readability
function applyMask0(row, col, bit) {
  return (row + col) % 2 === 0 ? !bit : bit;
}

// Bad: Explains WHAT (obvious from code)
// XOR the bit if condition is met
function applyMask0(row, col, bit) {
  return (row + col) % 2 === 0 ? !bit : bit;
}
```

---

## Getting Help

- **Discord**: [Winter of Open Source Server](https://discord.gg/EzvckznUDG) (everyone is requested to join this server)
- **GitHub Discussions**: Ask questions, share ideas
- **Issues**: Comment to reach maintainers

---

## Important Rules

- Work on **one issue at a time**
- Complete within **48 hours** (can be extended based on difficulty)
- Respect the code of conduct
- Always link your PR to an issue
- **No plagiarism**
- Keeep **AI** use **minimal** and **relevant**, i.e. only for assistance, not for entire code
- **NO external QR libraries** – implement from scratch
---

<p align="center">
<b>Happy Contributing! ❤️</b>
</p>
