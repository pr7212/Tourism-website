# TOURISM WEBSITE

This is a static site for a Maasai Mara tourism project. It contains an index page with a booking form that stores bookings in localStorage, and an admin `bookings.html` page for reviewing/deleting bookings.

Quick publish to GitHub Pages (PowerShell)

1. Create a new repository on GitHub (name it `tourism-website` or similar).
2. In this folder run:

```powershell
# initialize git repo and push to GitHub
git init
git add .
git commit -m "Initial site"
# replace <YOUR-REMOTE-URL> with the HTTPS or SSH repo URL from GitHub
git remote add origin <YOUR-REMOTE-URL>
git branch -M main
git push -u origin main
```

3. After pushing, GitHub Actions will run the workflow in `.github/workflows/pages.yml` and publish the site to GitHub Pages.
4. Visit the repository's Pages settings or Actions tab to see deployment status. The site will be available at https://<your-username>.github.io/<repo-name>/

Notes
- The site uses client-side localStorage to save bookings; admin is a client-side mock (no server-side auth).
- If you prefer a manual publish, you can also use the repo Settings → Pages to publish the `main` branch root.
