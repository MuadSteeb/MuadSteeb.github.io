/* Only configured videos load a player, and only after a visitor clicks. */
(() => {
  "use strict";

  function videoSource(value) {
    const url = new URL(value, document.baseURI);
    if (!["https:", "http:"].includes(url.protocol)) {
      throw new Error("Use an HTTPS video URL or a local video file.");
    }
    if (url.protocol !== "https:" && url.origin !== window.location.origin) {
      throw new Error("External video URLs must use HTTPS.");
    }
    const host = url.hostname.toLowerCase();
    const parts = url.pathname.split("/").filter(Boolean);
    if (["youtube.com", "www.youtube.com", "m.youtube.com", "youtu.be", "www.youtube-nocookie.com"].includes(host)) {
      const id = host === "youtu.be" ? parts[0]
        : ["embed", "shorts", "live"].includes(parts[0]) ? parts[1] : url.searchParams.get("v");
      if (!/^[\w-]{11}$/.test(id || "")) {
        throw new Error("Add a complete YouTube video link.");
      }
      return { type: "iframe", url: `https://www.youtube-nocookie.com/embed/${id}`, provider: "YouTube" };
    }
    if (["vimeo.com", "www.vimeo.com", "player.vimeo.com"].includes(host)) {
      const playerPath = host === "player.vimeo.com";
      const id = parts[playerPath ? 1 : 0];
      if (!/^\d+$/.test(id || "") || (playerPath && parts[0] !== "video")) {
        throw new Error("Use a Vimeo video link or player.vimeo.com/video link.");
      }
      const embed = new URL(`https://player.vimeo.com/video/${id}`);
      const hash = url.searchParams.get("h") || (!playerPath ? parts[1] : "");
      if (hash) embed.searchParams.set("h", hash);
      embed.searchParams.set("dnt", "1");
      return { type: "iframe", url: embed.href, provider: "Vimeo" };
    }
    if (/\.(mp4|webm|ogv)$/i.test(url.pathname)) {
      return { type: "video", url: url.href, provider: "video" };
    }
    throw new Error("Use a YouTube or Vimeo link, or an MP4, WebM, or OGV file.");
  }

  document.querySelectorAll("[data-video-url]").forEach((slot) => {
    const value = slot.dataset.videoUrl.trim();
    if (!value) return;
    try {
      const source = videoSource(value);
      const title = slot.dataset.videoTitle || "Portfolio video";
      const status = slot.closest(".reel")?.querySelector(".reel-status");
      const button = document.createElement("button");
      button.type = "button";
      button.className = "video-load";
      button.textContent = `Load ${title}`;
      if (source.type === "iframe") {
        button.textContent += ` (${source.provider})`;
        button.title = `Loading this video connects to ${source.provider}.`;
      }
      slot.replaceChildren(button);
      slot.classList.add("is-configured");
      if (status) status.textContent = "Click to load";
      button.addEventListener("click", () => {
        const player = document.createElement(source.type);
        player.src = source.url;
        if (source.type === "iframe") {
          player.title = title;
          player.allow = "fullscreen; picture-in-picture; encrypted-media";
          player.allowFullscreen = true;
          player.referrerPolicy = "strict-origin-when-cross-origin";
        } else {
          player.controls = true;
          player.preload = "metadata";
          player.playsInline = true;
          player.setAttribute("aria-label", title);
          const captions = slot.dataset.captionsUrl;
          if (captions) {
            const track = document.createElement("track");
            track.kind = "captions";
            track.src = new URL(captions, document.baseURI).href;
            track.srclang = slot.dataset.captionsLang || "en";
            track.label = slot.dataset.captionsLabel || "English";
            track.default = true;
            player.append(track);
          }
          player.addEventListener("error", () => {
            const error = document.createElement("p");
            error.className = "media-error";
            error.setAttribute("role", "alert");
            error.textContent = "This video could not load. Check the file URL and video format.";
            slot.replaceChildren(error);
          });
        }
        slot.replaceChildren(player);
        player.focus();
        if (status) status.textContent = title;
      }, { once: true });
    } catch (error) {
      const message = document.createElement("p");
      message.className = "media-error";
      message.setAttribute("role", "alert");
      message.textContent = `Video setup error: ${error.message}`;
      slot.replaceChildren(message);
      console.error("Portfolio video configuration error:", error);
    }
  });

  const printButton = document.querySelector(".print-button");
  if (printButton) {
    printButton.hidden = false;
    printButton.addEventListener("click", () => window.print());
  }
})();
