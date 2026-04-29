# Convert HTML/Inline JavaScript Subscribe Form to React

## Job Title

Convert a HTML/Inline javascript subscribe form to a React Functional Component with Hooks

## Upwork Task ID

29665016

## Job Description

Hello there,

I have a subscription form which lets users enter their email address, choose a subscription list and agree to the terms and conditions checking the checkboxes and then click the Subscribe button which sends the data to an external api.

Its an embed form written in HTML which inside has some inline javascript in script tags.

I need this form converted into a React Functional Component (no class components please) using hooks.

I already converted the inline css styles to jsx inline styles so you don't have any errors and start working on converting it to React directly.

The code is in the attachment as a text document.

It should be an easy and straight forward job for an experienced developer.

Please start your application with "1214" so I know you have read all the description.

## Acceptance Criteria

- critical - Deliverable is a React functional component using only hooks (no class components).
- critical - Component is created by converting the exact attached HTML + inline JavaScript code.
- critical - Component preserves the original form structure including email input, subscription list checkboxes, consent checkbox, hidden fields and submission logic.
- critical - Form action remains POST to the URL `https://app.feedblitz.com/f/f.fbz?Join`.
- critical - All original inline styles are kept as JSX style objects.

## Implementation

The converted React functional component is implemented in `src/components/SubscribeForm.jsx` and loaded by `src/App.jsx`.

The original attached form source is stored in `attachments/Form.rtf`.

Run the project with:

```bash
npm install
npm run dev
```

Build and lint checks:

```bash
npm run build
npm run lint
```
