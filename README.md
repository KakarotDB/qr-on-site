# QR On-Site

<a href="https://winter-of-open-source.vercel.app/"><img src="assets/banner.png"></a>

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML) [![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS) [![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript) <a href="https://gdg.community.dev/gdg-on-campus-indian-institute-of-engineering-science-and-technology-shibpur-howrah-india/"><img src="assets/gdsc-logo.png" alt="GDGoC IIEST Shibpur" height="20"></a> <a href="https://www.codeiiest.in/"><img src="assets/codeiiest-logo.png" alt="CodeIIEST" height="20"></a> [![Winter of Open Source](https://img.shields.io/badge/Winter%20of%20Open%20Source-2025-purple)](https://winter-of-open-source.vercel.app/)

## Project Description

**QR On-Site** is a web-based QR Code Scanner and Generator built **from scratch without external QR libraries**.

This project is part of **IIEST, Shibpur's** **[Winter of Open Source](https://winter-of-open-source.vercel.app/)**, where contributors will:
- Implement QR code encoding/decoding algorithms from the ground up
- Understand Reed-Solomon error correction
- Build a fully functional QR code tool without using any prebuilt libraries

### What You'll Build

| Component | Current Status | What Needs To Be Done |
|-----------|---------------|----------------------|
| **QR Generator** | 🟡 Partial (Version 2-M hardcoded) | Support multiple versions, error correction levels, encoding modes |
| **QR Scanner** | 🔴 Placeholder only | Implement finder pattern detection, image processing, data decoding |

## Web Interface

<p align="center">
  <img src="assets/image.png" alt="QR On-Site Interface" width="1000">
</p>

## Demo

Visit the live demo: [QR On-Site](https://qr-on-site.vercel.app)

---

## Contribution Workflow

```
1. Fork the repository
2. Clone your fork: git clone https://github.com/YOUR_NAME/qr-on-site.git
3. Create a new branch: git checkout -b fix/issue-number-description
4. Make changes and test thoroughly
5. Commit with proper message: git commit -m "Fixes #<issue-number>: description"
6. Push & create PR: git push origin fix/issue-number-description
```

> See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed setup instructions and guidelines.


## Communication

- **Discord**: [Winter of Open Source Server](https://discord.gg/your-invite-link)
- **Issues**: Comment on issues to reach maintainers

## Installation

```bash
git clone https://github.com/ConsoleCzar-2/qr-on-site.git
cd qr-on-site

# Open directly in browser
open index.html

# Or use a local server (recommended)
python -m http.server 8000
# Then visit http://localhost:8000
```

## Project Structure

```
qr-on-site/
│
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md
│   │   ├── feature_request.md
│   │   └── documentation.md
│   └── pull_request_template.md
│
├── assets/           # Images, logos, screenshots
├── css/
│   └── style.css     # Styles for the UI
├── js/
│   └── script.js     # QR generation/scanning logic
│
├── index.html        # Main HTML file
├── CONTRIBUTING.md   # Contribution guidelines
├── CODE_OF_CONDUCT.md
├── LICENSE
└── README.md
```

## Code of Conduct

Please follow [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) to ensure a welcoming and productive environment for all contributors.

---

<p align="center">
Made with ❤️ by <a href="https://github.com/ConsoleCzar-2">ConsoleCzar</a>
</p>
