// Without scripting, each map label links to its account in the text below.
const map = document.querySelector(".dodo-map");
const accounts = [...map.querySelectorAll(".dodo-place")];
const buttons = [...map.querySelectorAll(".dodo-pin")].map(link => {
  const button = document.createElement("button");
  button.type = "button";
  button.className = link.className;
  button.style.cssText = link.style.cssText;
  button.textContent = link.textContent;
  button.setAttribute("aria-controls", link.hash.slice(1));
  link.replaceWith(button);
  return button;
});

function selectPlace(id) {
  accounts.forEach(account => { account.hidden = account.id !== id; });
  buttons.forEach(button => {
    button.setAttribute("aria-pressed", String(button.getAttribute("aria-controls") === id));
  });
}

buttons.forEach(button => button.addEventListener("click", () => selectPlace(button.getAttribute("aria-controls"))));
const showLinkedPlace = () => selectPlace(accounts.find(account => "#" + account.id === location.hash)?.id ?? accounts[0].id);
showLinkedPlace();
window.addEventListener("hashchange", () => {
  if (accounts.some(account => "#" + account.id === location.hash)) showLinkedPlace();
});
