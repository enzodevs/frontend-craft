# Security policy

## Supported scope

Security fixes target the latest `main` branch. The project consists of agent instructions, reference code, and development tests; it is not a hosted service.

Relevant reports include exposed credentials, unsafe instructions, code execution or exfiltration in bundled examples, dependency vulnerabilities affecting the checks, and guidance that creates a concrete security failure.

## Report privately

Use GitHub's [private vulnerability reporting](https://github.com/enzodevs/frontend-craft/security/advisories/new).

Include the affected file or commit, a minimal reproduction, impact, and suggested mitigation if known. Remove real credentials, personal information, and private source code from examples. Do not open a public issue for an undisclosed vulnerability.

The maintainer will assess reports as availability permits; no response-time or bounty commitment is made.

## Safe use

- Review instructions and code before applying them to a project.
- Installing the skill does not authorize publication, deployment, dependency installation, or uploading private source.
- Browser evidence, traces, screenshots, and issue attachments can contain private data. Redact them before sharing.
- Optional research or indexing tools may contact external services. Confirm their data handling and obtain authorization before sending source.
- If a credential is exposed, revoke or rotate it first. Deleting the file alone does not remove it from Git history.
