const player = document.querySelector(".lead-player");
const audio = player.querySelector("audio");
const controls = player.querySelector(".lead-controls");
const passage = player.querySelector("[data-passage]");
const error = player.querySelector(".lead-error");
const firstSecond = 20.8;
const finalSecond = 31;
const tracks = {
  excerpt: {
    original: "EDIS-93953-name-original.mp3",
    restored: "EDIS-93953-name-periodic.mp3",
  },
  full: {
    original: "EDIS-93953-original.mp3",
    restored: "EDIS-93953-periodic.mp3",
  },
};

let scope = "excerpt";
let version = "original";
let pending = null;

function offset(selection) {
  return selection === "excerpt" ? firstSecond : 0;
}

function switchTrack(nextScope, nextVersion) {
  if (scope === nextScope && version === nextVersion) return;
  const position = pending?.position ?? audio.currentTime + offset(scope);
  const resume = pending?.resume ?? (!audio.paused && !audio.ended);
  scope = nextScope;
  version = nextVersion;
  const nextPosition = scope === "excerpt" && (position < firstSecond || position > finalSecond)
    ? firstSecond : position;
  const source = new URL(`/media/leads/grant/${tracks[scope][version]}`, location.href).href;
  pending = { source, position: nextPosition, resume };
  error.hidden = true;
  for (const button of controls.querySelectorAll("button")) {
    const selected = button.dataset.scope === scope || button.dataset.version === version;
    button.setAttribute("aria-pressed", selected);
  }
  passage.textContent = scope === "excerpt" ? "0:20.8–0:31.0 of the full recording" : "Complete recording";
  audio.src = source;
}

controls.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (button) switchTrack(button.dataset.scope ?? scope, button.dataset.version ?? version);
});

audio.addEventListener("loadedmetadata", () => {
  if (!pending || audio.currentSrc !== pending.source) return;
  const { position, resume } = pending;
  pending = null;
  audio.currentTime = Math.min(position - offset(scope), audio.duration);
  if (resume) audio.play().catch(() => {});
});

audio.addEventListener("error", () => {
  pending = null;
  error.hidden = false;
});

controls.hidden = false;
