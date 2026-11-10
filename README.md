# Personal portfolio

A GitHub-inspired dark portfolio for **https://muadsteeb.github.io/**, with one
centered 16:9 featured video and six 16:9 video slots in three rows of two.
The two-column video layout is retained on mobile. Résumé and
contact sections follow the videos. Plain HTML,
CSS, and a small video enhancement script; no build step, packages, trackers,
third-party fonts, or stock portfolio work.

**Content status:** names, biography, experience, project credits,
videos, and contact information are explicit placeholders. Nothing in brackets
is a real personal claim. Empty video slots are artwork, not playable samples.

## Edit your content

Edit `index.html` directly, including through GitHub's file editor.

1. Replace `Your Name`, `[Your Name]`, and the `YN` monogram. Update the page
   `<title>`, description, and home link's accessible label too.
2. Replace bracketed text with your introduction, project titles, roles,
   experience, skills, and education. Remove entries you do not need.
3. Add your videos using the examples below.
4. Replace the email placeholder with your actual email link. Add only profile
   links you want to make public.
5. Once personalized, remove the placeholder notice in the footer and
   "Contact details coming soon." Update the media captions and
   "Videos to be added" section note.

`styles.css` contains colors, layout, mobile styles, and a print layout.
The **Print / save résumé** button opens the browser's print dialog; choose
"Save as PDF" to export the introduction, résumé, and contact sections. It does
not download a prewritten résumé. The text layout works without JavaScript.

## Add videos

Each `.video-slot` in `index.html` has `data-video-url=""`. Put your real video
link between those quotes and replace `data-video-title` with an accurate title:

```html
<div class="video-slot"
     data-video-url="https://www.youtube.com/watch?v=YOUR_VIDEO_ID"
     data-video-title="Your project title">
  <span class="placeholder-content">Your project title</span>
</div>
```

Replace `YOUR_VIDEO_ID` with your own 11-character YouTube ID. Supported sources:

- YouTube watch, short, live, embed, and `youtu.be` links.
- Vimeo `https://vimeo.com/VIDEO_ID` or
  `https://player.vimeo.com/video/VIDEO_ID` links. Unlisted links preserve their
  privacy hash, including `https://vimeo.com/VIDEO_ID/HASH` or `?h=HASH`.
- Direct `.mp4`, `.webm`, or `.ogv` files, including relative paths such as
  `assets/showreel.mp4`. For large videos, prefer a video hosting provider instead
  of committing large files to Git.

Players load **only when a visitor clicks**. YouTube uses its privacy-enhanced
domain, and Vimeo is requested with `dnt=1`; loading still connects to that
provider. Videos never autoplay. Enable embedding for your videos in the provider
settings; provider restrictions, deleted videos, and private videos can prevent
playback. Do not put secret links in this public repository.

For self-hosted videos, add WebVTT captions:

```html
<div class="video-slot"
     data-video-url="assets/showreel.mp4"
     data-video-title="Your showreel"
     data-captions-url="assets/showreel.en.vtt"
     data-captions-lang="en"
     data-captions-label="English">
  <span class="placeholder-content">Your showreel</span>
</div>
```

For YouTube and Vimeo, manage captions at the provider. Include descriptive
project text and transcripts where appropriate. Leave `data-video-url` empty to
retain a placeholder. Unsupported URLs produce a visible setup error instead of
silently failing. Update each project's text and credits separately from its URL.

## Add contact details

Replace the `.contact-placeholder` paragraph with a real link:

```html
<a class="contact-email" href="mailto:YOUR_EMAIL">YOUR_EMAIL</a>
```

Replace both `YOUR_EMAIL` values. A static Pages site cannot deliver contact-form
submissions by itself, so this template intentionally has no nonfunctional form.
For professional profiles, add ordinary links with descriptive text.

## Preview locally

From the repository folder, if Python 3 is installed:

```sh
python3 -m http.server 8000
```

Open `http://localhost:8000`. Stop the server with Ctrl+C. There is no dependency
installation or build required. You can also open `index.html` directly for the
layout; use HTTP for testing embedded media and caption files.

## Publish with GitHub Pages

This repository is public so GitHub Pages can be hosted on the Free plan.
All committed content is public. Do not commit credentials, private information,
unpublished client assets, or media you do not have permission to share.

In the repository's **Settings → Pages**, choose:

- **Source:** Deploy from a branch
- **Branch:** `main`
- **Folder:** `/ (root)`

Save. The `.nojekyll` file keeps this a plain static site. Commits pushed to
`main` publish automatically; feature branches do not publish. No custom domain
is required. The site URL is **https://muadsteeb.github.io/**.

With an authenticated GitHub CLI account that can administer this repository,
initial Pages setup can also be performed with:

```sh
gh api --method POST repos/MuadSteeb/MuadSteeb.github.io/pages \
  -f 'source[branch]=main' -f 'source[path]=/'
```

If Pages is already configured, inspect it with
`gh api repos/MuadSteeb/MuadSteeb.github.io/pages`; use `--method PUT` instead of
POST only if its source needs changing. GitHub may take a few minutes to deploy.
Check the repository's Actions tab for the Pages build and deployment result.

## Before sharing your personalized portfolio

- Replace all bracketed text and template notes; verify titles and credits.
- Try every configured video, including captions.
- Check navigation and media controls using only the keyboard.
- Check a narrow mobile viewport and the print preview.
- Confirm your email and professional links go to the right destinations.
- Visit the live HTTPS URL after the latest deployment finishes.
