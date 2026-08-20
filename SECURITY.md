# Security Policy

## Supported Versions

The repository is a collection of static HTML, CSS and JavaScript learning projects. The table below shows which branches are currently supported with security updates:

| Version | Supported          |
| ------- | ------------------ |
| main    | ✅ Yes             |
| other branches | ❌ No      |

## Reporting a Vulnerability

Since this is a static, client-side collection with no backend, servers, or user accounts, the attack surface is minimal. However, if you discover a security issue, please do **not** open a public issue.

Instead, report it privately by emailing the repository owner through the contact link on their [GitHub profile](https://github.com/jamamjadalone).

### What to include

- A description of the vulnerability and its potential impact
- Steps to reproduce the issue
- Affected files or pages
- Your suggested fix, if you have one

### What to expect

- You will receive an acknowledgement within **7 days**.
- The issue will be investigated and a fix will be planned.
- Once resolved, the fix will be released and you will be credited (if you wish).

## Security Best Practices for Contributors

- Do not hardcode API keys, tokens, or secrets in any file.
- Do not introduce scripts that load remote code without review.
- Always use `https://` for external resources.
- Sanitize user input in any JavaScript you write (e.g., use `textContent` over `innerHTML` where possible).

Thank you for helping keep this project safe. 🔒