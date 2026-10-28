# Wappcart Sales Hub — self-hosting source project

Complete functional source of published version 4, exported 27 October 2026.
Published site: https://wappcart-sales-hub.alertmug6.chatgpt.site/
Source commit: 7edd0e49c2a28a4e548e0b20b9fc5ae3e5fc3ec7

## What this package contains

- `public/index.html`: the exact published application shell, original views, embedded CSS, text branding and glyph icons.
- `public/workspace.js`: the exact published dashboard expansion: shared leads, team tasks, promotional content, campaigns, reports, backups and partner-specific flows. Both files are required.
- `docs/ARCHITECTURE.md`: application structure, storage schema, functionality and limitations.
- `docs/ASSETS.md`: complete asset inventory.
- `hosting/nginx.conf`: optional Nginx virtual-host example.
- `hosting/apache.conf`: optional Apache virtual-host example.
- `Dockerfile`: optional static-serving container.
- `scripts/verify.mjs`: source checksum and JavaScript syntax validation.
- `package.json`: optional verification command; no npm dependencies.
- `SOURCE.json` and `SHA256SUMS`: provenance and checksums.

There is no build step. The two files in `public/` are the frontend source and deployable application. No framework compilation, npm install, API key, database, PHP, or Node server is required on your hosting account.

## Option A — shared hosting / cPanel / Hostinger-style file manager

1. Download and extract the ZIP on your computer.
2. Open your hosting control panel and select the target domain or subdomain.
3. Locate that domain's document root (often `public_html`; the actual folder depends on your host).
4. Back up the files already there before replacing an existing website.
5. Upload **the contents of `public/`**, `index.html` and `workspace.js`, into that document root. Do not upload the parent project folder as your homepage.
6. If a different default page such as `index.php` already exists, use your hosting panel to configure `index.html` as the homepage or move the old page into your backup. Do not delete unrelated site files.
7. Point your domain's DNS to the address supplied by your host, if not already configured.
8. Enable HTTPS using your hosting provider's SSL controls.
9. Visit `https://your-domain.example/`. If deploying into a folder, visit `https://your-domain.example/sales/` instead.
10. Check the state tabs, Partners category tabs, adding an enquiry, pipeline stage changes, local inbox replies and CSV export. Refresh to confirm local changes persist.

You may also upload the ZIP to a non-public staging folder and extract it with your host's file manager, then copy both files from `public/` to the document root. Keep README/configuration/source-manifest files outside the public document root.

## Option B — VPS with Nginx

These steps assume you already have Nginx installed and permission to administer the server.

1. Copy `public/` to a directory such as `/var/www/wappcart/public/`.
2. Copy `hosting/nginx.conf` into your distribution's Nginx virtual-host configuration directory.
3. Replace `sales.example.com` with your own domain and adjust the root path if needed.
4. Enable the virtual host according to your server's Nginx layout (some distributions use `sites-enabled`, others `conf.d`).
5. Run `sudo nginx -t`. Only reload after the configuration test succeeds.
6. Run `sudo systemctl reload nginx` on a systemd-based server.
7. Configure DNS and HTTPS with your host's supported certificate setup. The included example listens on HTTP port 80 only; it does not include a certificate or redirect to HTTPS.
8. Open your domain and run the verification checklist above.

## Option C — VPS with Apache

1. Copy `public/` to `/var/www/wappcart/public/` or your chosen document root.
2. Adapt `hosting/apache.conf` to your domain and folder.
3. Enable it using your distribution's virtual-host procedure.
4. Run the Apache configuration test (`apachectl configtest` on many installations) before reloading.
5. Configure DNS and HTTPS through your hosting environment.

No rewrite module, `.htaccess`, or special routing fallback is needed. State navigation uses URL fragments such as `#telangana`.

## Option D — Docker (optional)

From the extracted project directory, with Docker installed:

```sh
docker build -t wappcart-sales-hub .
docker run --name wappcart-sales-hub --restart unless-stopped -d -p 8080:80 wappcart-sales-hub
```

Open `http://localhost:8080` (or your server's address). For production HTTPS, put the container behind your existing TLS reverse proxy. The base image is downloaded during build; no application dependencies are installed. Browser records are not stored in this container, so a container volume will not back them up.

## Local preview and optional checks

With Python 3 installed:

```sh
python3 -m http.server 8080 --directory public
```

Open `http://localhost:8080`. This server is for local preview, not a production deployment.

With Node.js installed, optionally run either command:

```sh
node scripts/verify.mjs
npm run verify
```

`npm install` is unnecessary. Verification checks the exported source checksums, embedded and external JavaScript syntax, and local asset references. The checksum deliberately fails after you modify the original application files; update `SOURCE.json` when intentionally maintaining a modified fork.

## Important: data and integrations

The published site is a working **browser-local prototype**. It includes sample partners, enquiries and orders. It supports local edits and CSV exports, but it is not a shared multi-user service.

- Data is stored in the current browser's localStorage, not on the hosting server.
- Moving to a new domain does **not** migrate existing browser data. Each domain, browser and device has separate storage.
- To transfer your records, open the old website in the browser containing your data, go to **Settings → Download backup**, and save the JSON file. Open your new domain, go to **Settings → Restore backup**, select that JSON file, and confirm replacement. This replaces the new browser’s records. Keep a backup of any destination records first. CSV reports are not restorable backups. The separate pre-sample-archive recovery snapshot is not included in the downloaded backup.
- WhatsApp inbox replies are local demos: no messages are sent.
- Chatbot edits are previews: no bot is deployed.
- Content briefs, editable scripts, review statuses, campaign drafts, manual settlement records, reports and print-to-PDF work locally. AI video generation, actual campaign sending, automatic posting, payment processing, shared team login, server APIs and automatic daily PDF generation are not implemented.
- There are no backend files or SQL schema to install because the published application does not use them. The browser data shape is documented in `docs/ARCHITECTURE.md`.
- Hosting this source yourself preserves these existing capabilities; it does not activate external integrations.

The dashboard expansion published in version 4 is included. The original sample records remain, and can be archived through Settings.

## Customization and future development

Edit `public/index.html` and `public/workspace.js`. The `<style>` block contains CSS; body markup contains the shell and dialogs; the `<script>` block contains the original page renderers and state handling; `workspace.js` extends and overrides those views. Keep its script tag after the inline script. See the function map in `docs/ARCHITECTURE.md`.

Do not put API tokens or credentials inside this HTML. Live WhatsApp, shared records and team authentication require a separately implemented secure backend. This package contains no deployment credentials or secret keys.

## Opening the Telangana workspace

Use `https://your-domain.example/#telangana`. The `#telangana` fragment is handled by the frontend and requires no server route. Andhra Pradesh and Karnataka remain available from the state tabs.

## Included dashboard functionality

- Six partner categories and editable partner details; Sai Sreenivasa Decorin, NSquare Architecture and Interiors, and Veneercraft are initialized in Telangana.
- Shared contact directory with independent customer–partner opportunities.
- Executive assignments, sales stages, notes, values and follow-up dates.
- Two-person team labels and task statuses.
- Content briefs, editable script templates, asset URL records and review statuses.
- Campaign planning with consent-check records; no messages sent.
- Partner-specific chatbot greetings; no bot deployed.
- Commission rates, manual settlements and CSV reports.
- Browser print-to-PDF, JSON backup/restore and sample archive/recovery.

Only source defaults are bundled. Records you entered into your own browser are not embedded in this ZIP; transfer them through the backup workflow above.
