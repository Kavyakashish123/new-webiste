# Architecture and data setup

## Source layout

`public/index.html` supplies the original shell, embedded CSS, state/category tabs, local data initialization and original view functions. `public/workspace.js` loads afterward and extends the app. Both files exactly match published version 4. There is no framework build or package installation.

The expanded script supplies overview, partner editing, directory contacts and multiple partner assignments, sales pipeline, task tracking, content briefs, campaign planning, commission settlement, partner chatbot greetings, reports and settings. These are JavaScript-rendered views, not separate HTML pages. Their original design and responsive rules are preserved.

## Runtime and API

No backend, API endpoint, SQL database, credentials, environment variables, server scheduler or authentication service exists in this version. Static hosting is sufficient. Team members are assignment labels, not authenticated users. Messages, campaign planning, video scripts and chatbot previews are local records; external messaging and generation are not connected. No SQL setup is required.

## Browser storage schema

### wappcart-states-v2

Object keyed by Andhra Pradesh, Telangana and Karnataka. Each state contains:

- `partners`: objects with name, category, city, state, rate; expanded records may also have phone, meta, rateConfirmed and greeting.
- `leads`: objects with id, name, need, partner, value, stage, source, owner; optional contactId, phone, due, notes and consent. Stages are New enquiry, Quotation, Follow-up, Won and Lost.
- `messages`: object mapping lead array indices to arrays of locally saved reply strings.
- `settled`: array of lead indices with recorded settlements.
- `flow`: legacy shared greeting string.

Rates are commission percentages and values are rupees. Partner names link opportunities and operational records. Contact IDs link independent partner opportunities to one directory contact.

### wappcart-operations-v1

- `contacts`: id, name, phone, city, need, state.
- `tasks`: id, title, partner, owner, due, priority, status, state.
- `content`: id, partner, topic, language, format, date, brief, state, status, script; optional asset URL.
- `campaigns`: id, name, partner, date, audience, message, consent, state, status.
- `team`: two display-name strings.
- `activity`: up to 60 entries with text and ISO date.
- `initialized`: boolean preventing repeated insertion of the three starter partners.

### Other storage

`wappcart-v1` may supply legacy records during migration. `wappcart-before-sample-archive` stores a local recovery copy created by the sample archive action. That recovery snapshot is not included in JSON exports.

### Backup file

Settings exports `{ "version": 1, "states": <state object>, "operations": <operations object> }`. Restore validates the basic shape and replaces both current objects after confirmation. Export backups from the original browser before switching domains. The app does not synchronize records between devices. The ZIP contains application source and seed data, not private browser records.

## Hosting

Serve only public/. The URL hash selects the state; server-side routing or rewrite rules are not required. Nginx, Apache and Docker examples are included. The original Sites deployment manifest is not needed on your own host. Git credentials and provider secrets are excluded.

## Verification

Run `node scripts/verify.mjs` to compare both frontend files against the exported commit checksums, parse both JavaScript sources and verify linked local assets. Original browser QA covered dashboard navigation, shared contact assignment into two partner opportunities and content-brief creation. This export does not alter application behavior.
