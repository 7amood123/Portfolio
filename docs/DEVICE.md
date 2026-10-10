# Device screens

The portfolio uses one phone, drawn with CSS 3D transforms. Scroll position changes the screen. There is no Three.js scene and no GLB model.

The phone is decorative. The same information is in the page text, so the device is hidden from assistive technology.

## Portrait

Add a photograph here:

```text
public/images/profile.jpg
```

Use a clear, front-facing photo. A square or 4:5 crop works best. Keep the file under about 400 KB.

Until that file exists, the screen shows the initials MA. The site does not request a missing image.

Restart the dev server after adding the file so the build can pick it up.

## Project screenshots

Optional replacements for the built-in mockups:

```text
public/images/projects/finance-tracker.png
public/images/projects/soulspace.png
public/images/projects/teknofest.png
```

PNG, JPG, or WebP. A phone-sized portrait crop (about 390×844) fits the screen. If a file is absent, the page keeps the HTML mockup and does not request the image.

These mockups use fictional numbers. A real screenshot should not include anyone else's private financial or health data.

## Motion

The phone rotation, scale, and screen changes are tied to scroll with GSAP ScrollTrigger. Scrolling back up reverses them.

On a narrow screen the phone stays above the project text while Selected Work is on screen, then leaves before About.

When the visitor prefers reduced motion, the scroll movement is turned off. The portrait stays in the hero and each project shows its own static screen.
