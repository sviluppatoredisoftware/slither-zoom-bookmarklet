# Slither Zoom Bookmarklet

A lightweight bookmarklet for **Slither.io** with mouse-wheel zoom and middle-click zoom toggle.

![Platform](https://img.shields.io/badge/platform-browser-blue)
![Type](https://img.shields.io/badge/type-bookmarklet-black)
![Game](https://img.shields.io/badge/game-Slither.io-green)
![Status](https://img.shields.io/badge/status-working-brightgreen)

## Features

- Mouse-wheel zoom
- Middle-click toggle between default zoom and the last custom zoom
- Resets visible zoom to default when leaving a round
- No extension required
- No extra UI
- Prevents duplicate installation in the same tab

## Why

Most Slither.io zoom tools are bigger than they need to be.

This bookmarklet keeps things simple:
- no bloated extension
- no extra menus
- no visual clutter
- just click and play

## How it works

The script stores a desired zoom level and keeps it active while the page is running.

It also uses two internal flags:

- `__slitherZoomInstalled`
- `__slitherWasPlaying`

These prevent duplicate installation in the same tab and allow the script to detect when gameplay ends so the visible zoom can be reset to default in the menu.

## Controls

- **Mouse wheel** → zoom in / out
- **Middle mouse click** → toggle between default zoom and your last selected zoom

## Important

This bookmarklet only runs in the **current tab** and for the **current page session**.

That means:
- reload page → click bookmark again
- open a new tab → activate it there too
- leave the page → run it again when you return

## Installation

1. Create a new bookmark in your browser.
2. Name it `Slither Zoom`.
3. Paste the code below into the bookmark URL/location field.
4. Open Slither.io.
5. Click the bookmark once.

## Bookmarklet

```javascript
javascript:(()=>{window.default_gsc=1.0;window.desired_gsc=window.gsc||window.default_gsc;window.last_user_gsc=window.desired_gsc;window.__slitherWasPlaying=!!window.playing;if(!window.__slitherZoomInstalled){window.__slitherZoomInstalled=true;document.body.addEventListener('wheel',function(e){if(!window.gsc)return;e.preventDefault();window.desired_gsc*=Math.pow(0.9,e.deltaY/120);if(window.desired_gsc<0.1)window.desired_gsc=0.1;if(window.desired_gsc>4)window.desired_gsc=4;window.last_user_gsc=window.desired_gsc;window.gsc=window.desired_gsc;},{passive:false});document.addEventListener('mousedown',function(e){if(e.button===1)e.preventDefault();},{passive:false});document.addEventListener('auxclick',function(e){if(e.button!==1)return;e.preventDefault();const isDefault=Math.abs(window.desired_gsc-window.default_gsc)<0.01;if(isDefault){window.desired_gsc=window.last_user_gsc||0.5;}else{window.last_user_gsc=window.desired_gsc;window.desired_gsc=window.default_gsc;}window.gsc=window.desired_gsc;});(function keepZoom(){const isPlaying=!!window.playing;if(window.__slitherWasPlaying&&!isPlaying){window.desired_gsc=window.default_gsc;window.gsc=window.default_gsc;}window.__slitherWasPlaying=isPlaying;if(window.desired_gsc!==undefined){window.gsc=window.desired_gsc;}requestAnimationFrame(keepZoom);})();}})();
```

## Notes

This bookmarklet only affects the client-side page in your browser.

It does not modify any server-side behavior and does not persist automatically after a reload.