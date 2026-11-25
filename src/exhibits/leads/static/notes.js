for (const reference of document.querySelectorAll(".lead-noteref a")) {
  const note = document.getElementById(reference.hash.slice(1));
  if (!note) continue;
  const highlight = () => note.classList.toggle("reference-active", reference.matches(":hover, :focus-visible"));
  for (const event of ["pointerenter", "pointerleave", "focus", "blur"]) {
    reference.addEventListener(event, highlight);
  }
}
