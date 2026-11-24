const base = "/media/leads/ceres-1893/audio";

const clips13010 = {
  sig: {
    label: "2:35–3:18",
    raw: `${base}/ucsb-13010-sig-raw.mp3`,
    v4: `${base}/ucsb-13010-sig-v4.mp3`,
    slow: `${base}/ucsb-13010-sig-v4-slow.mp3`,
    kicker: "What is being spoken · Formal Cape Dutch (<em>Hoog-Hollands</em>)",
    orig: "“Johan Andrew Stegmann. Vijftien December achttienhonderd drie-en-negentig. Predikant der Nederduitse Gereformeerde Kerk te Ceres.”",
    eng: "<strong>English:</strong> “Johan Andrew Stegmann. Fifteen December eighteen hundred and ninety-three. Minister of the Dutch Reformed Church at Ceres.” <em>(UCSB’s catalogue previously guessed “Johan Andrew Dechman?” and left the date and church undeciphered.)</em>",
  },
  opening: {
    label: "0:00–0:44",
    raw: `${base}/ucsb-13010-opening-raw.mp3`,
    v4: `${base}/ucsb-13010-opening-v4.mp3`,
    slow: null,
    kicker: "Opening · Formal Cape Dutch (<em>Hoog-Hollands</em>)",
    orig: "“Ik heb veel van de zogenaamde fonograaf gehoord. Heden avond heb ik het eerst gehoord, ten huize van den heer Home te Ceres—eene uitvinding, die bepaaldelijk tot een van de nieuwe [wonderen?] dezer eeuw behoort.”",
    eng: "<strong>English:</strong> “I have heard much of the so-called phonograph. This evening I heard it for the first time, at the house of Mr. Home at Ceres—an invention that certainly belongs among the new [wonders] of this century.”",
  },
  prophecy: {
    label: "0:44–2:38",
    raw: `${base}/ucsb-13010-prophecy-raw.mp3`,
    v4: `${base}/ucsb-13010-prophecy-v4.mp3`,
    slow: null,
    kicker: "Main speech · Formal Cape Dutch (<em>Hoog-Hollands</em>)",
    orig: "“Ik twijfel voor geen ogenblik of de telefoon zal eens gebruikt worden tot uitbreiding van het Woord. Het Evangelie zal eens zonder twijfel door de fonograaf verkondigd worden. De tijd nadert spoedig wanneer dit grote wonder aan ons zal worden gebruikt tot eer en verheerlijking van Hem, die den mens alzo heeft geschapen, om zijn rijk uit te breiden door de verkondiging van het Woord op eene kunstmatige wijze.”",
    eng: "<strong>English:</strong> “I do not doubt for a moment that the telephone will one day be used for the spread of the Word. The Gospel will one day without doubt be preached through the phonograph. The time is fast approaching when this great wonder shall be used among us to the honor and glory of Him who created mankind thus, to extend His kingdom through the preaching of the Word in an artificial manner.”",
  },
  coda: {
    label: "3:12–3:48",
    raw: `${base}/ucsb-13010-coda-raw.mp3`,
    v4: `${base}/ucsb-13010-coda-v4.mp3`,
    slow: null,
    kicker: "Second voice on the same cylinder · English (likely Sunday, 17 December 1893)",
    orig: "“Well now, Mr. Phonograph, here’s a [broad?] voice to hear my voice. This is Sunday afternoon, a jolly good way of spending it, isn’t it? Here all the girls come down in their nightgowns—I mean to say in their dressing gowns—and one thing and another, and we’ve just been hearing some music and an Irish speech… Speak now! Goodbye, ta-ta!”",
    eng: "<strong>Context:</strong> 15 December 1893 was a Friday. Two days later, on Sunday afternoon, a second speaker in the household filled the last half-minute of blank wax.",
  },
};

const verNames = {
  raw: "Archive audio (raw UCSB transfer)",
  v4: "Noise reduced (v4 phase-locked scrub, 100.09 RPM)",
  slow: "Noise reduced · 0.70× speed (pitch-preserved)",
};

const root = document.querySelector(".ceres-lead");
if (root) {
  // Pause any other audio element when one starts playing.
  root.addEventListener("play", (event) => {
    if (event.target instanceof HTMLAudioElement) {
      for (const el of root.querySelectorAll("audio")) {
        if (el !== event.target && !el.paused) el.pause();
      }
    }
  }, true);

  // Primary interactive exhibit for Cylinder 13010
  const tabs = root.querySelector('[data-player="c13010"]');
  const stage = root.querySelector('[data-stage="c13010"]');
  if (tabs && stage) {
    const audioEl = stage.querySelector("audio");
    const metaLabel = stage.querySelector("[data-meta-label]");
    const trBox = stage.querySelector("[data-transcript]");
    const verBtns = [...stage.querySelectorAll(".ver-btn")];
    const slowBtn = verBtns.find((b) => b.dataset.ver === "slow");

    let curClip = "sig";
    let curVer = "v4";
    let pendingSeek = null;

    function updatePlayer(nextClip, nextVer, keepPos) {
      const data = clips13010[nextClip];
      if (!data) return;
      if (nextVer === "slow" && !data.slow) nextVer = "v4";

      const wasPlaying = !audioEl.paused && !audioEl.ended;
      const prevTime = keepPos ? audioEl.currentTime : 0;

      curClip = nextClip;
      curVer = nextVer;

      for (const tab of tabs.querySelectorAll(".ceres-tab")) {
        const active = tab.dataset.clip === curClip;
        tab.classList.toggle("is-active", active);
        tab.setAttribute("aria-selected", String(active));
      }
      if (slowBtn) slowBtn.hidden = !data.slow;
      for (const btn of verBtns) {
        const active = btn.dataset.ver === curVer;
        btn.classList.toggle("is-active", active);
        btn.setAttribute("aria-pressed", String(active));
      }

      const nextSrc = new URL(data[curVer], location.href).href;
      metaLabel.textContent = `${data.label} · ${verNames[curVer]}`;
      trBox.innerHTML = `<p class="tr-kicker">${data.kicker}</p><blockquote class="tr-orig">${data.orig}</blockquote><p class="tr-eng">${data.eng}</p>`;

      if (audioEl.currentSrc !== nextSrc) {
        pendingSeek = { time: prevTime, play: wasPlaying };
        audioEl.src = nextSrc;
      }
    }

    audioEl.addEventListener("loadedmetadata", () => {
      if (!pendingSeek) return;
      const { time, play } = pendingSeek;
      pendingSeek = null;
      if (time > 0 && time < audioEl.duration) audioEl.currentTime = time;
      if (play) audioEl.play().catch(() => {});
    });

    tabs.addEventListener("click", (e) => {
      const tab = e.target.closest(".ceres-tab");
      if (tab) updatePlayer(tab.dataset.clip, curVer === "slow" && !clips13010[tab.dataset.clip]?.slow ? "v4" : curVer, false);
    });

    stage.querySelector(".version-bar").addEventListener("click", (e) => {
      const btn = e.target.closest(".ver-btn");
      if (!btn || btn.dataset.ver === curVer) return;
      // Preserve timestamp when toggling between raw and v4 of the same passage
      const keepPos = curVer !== "slow" && btn.dataset.ver !== "slow";
      updatePlayer(curClip, btn.dataset.ver, keepPos);
    });
  }

  // Mini A/B switcher for Cylinder 13009 Afrikaans
  for (const mini of root.querySelectorAll("[data-mini]")) {
    const audioEl = mini.querySelector("audio");
    const btns = [...mini.querySelectorAll(".ver-btn")];
    let pending = null;
    audioEl.addEventListener("loadedmetadata", () => {
      if (!pending) return;
      const { time, play } = pending;
      pending = null;
      if (time > 0 && time < audioEl.duration) audioEl.currentTime = time;
      if (play) audioEl.play().catch(() => {});
    });
    mini.addEventListener("click", (e) => {
      const btn = e.target.closest(".ver-btn");
      if (!btn) return;
      const src = new URL(btn.dataset.miniSrc, location.href).href;
      if (audioEl.currentSrc === src) return;
      pending = { time: audioEl.currentTime, play: !audioEl.paused && !audioEl.ended };
      for (const b of btns) {
        const active = b === btn;
        b.classList.toggle("is-active", active);
        b.setAttribute("aria-pressed", String(active));
      }
      audioEl.src = src;
    });
  }
}
