# Tilt games

Small browser games, published with GitHub Pages at https://michalcerno.github.io/tilt/

- The root `index.html` is the start page. It lists every version from `versions.js`.
- Each version lives in its own folder with an `index.html` (for example `bouncer/`), and loads `../versions.js`, which adds the ≡ menu for switching versions.
- Every new version must be added to the `VERSIONS` list in `versions.js`, so it shows on the start page and in the ≡ menu.
- Pages are plain single-file HTML with no build step.
