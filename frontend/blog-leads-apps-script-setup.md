# Blog Lead Popup → Google Sheet setup

One-time setup so the blog popup's name/email submissions land in a Google Sheet, the same way the AI Readiness quiz does.

## 1. Create the sheet

1. Go to [sheets.google.com](https://sheets.google.com) and create a new blank spreadsheet.
2. Name it something like **"ScaleupCFO Blog Leads"**.
3. In row 1, add these headers (optional — the script also adds them automatically if the sheet is empty):
   `Timestamp | Name | Email | Blog Title | Blog Slug | Page URL`

## 2. Add the script

1. In the sheet, go to **Extensions → Apps Script**.
2. Delete any starter code in the editor and paste this in:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["Timestamp", "Name", "Email", "Blog Title", "Blog Slug", "Page URL"]);
  }

  sheet.appendRow([
    data.timestamp || new Date().toISOString(),
    data.name || "",
    data.email || "",
    data.blogTitle || "",
    data.blogSlug || "",
    data.pageUrl || ""
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ status: "success" }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

3. Click the save icon (or Ctrl+S), name the project something like "Blog Leads Webhook".

## 3. Deploy as a Web App

1. Click **Deploy → New deployment**.
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Set:
   - **Execute as**: Me (your Google account)
   - **Who has access**: Anyone
4. Click **Deploy**.
5. Google will ask you to authorize the script — click through and allow it (it's your own script, so this is safe).
6. Copy the **Web app URL** shown (it ends in `/exec`).

## 4. Wire it into the site

Open `frontend/src/components/BlogLeadPopup.jsx` and replace this line:

```javascript
const BLOG_LEAD_SHEET_ENDPOINT = "PASTE_YOUR_BLOG_LEADS_APPS_SCRIPT_URL_HERE";
```

with your copied URL, e.g.:

```javascript
const BLOG_LEAD_SHEET_ENDPOINT = "https://script.google.com/macros/s/AKfycb.../exec";
```

That's it — submissions will start appending rows to your sheet immediately. You can also just paste the URL back in this conversation and it'll be wired in for you.
