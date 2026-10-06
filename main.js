// Keep the navigation usable on mobile without hiding it when JavaScript is off.
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.getElementById("primary-navigation");
const mobileView = window.matchMedia("(max-width: 800px)");

function closeMenu() {
  menuButton.setAttribute("aria-expanded", "false");
  navigation.classList.remove("is-open");
}

function updateMenuLayout() {
  closeMenu();
  navigation.classList.toggle("is-collapsible", mobileView.matches);
  menuButton.hidden = !mobileView.matches;
}

if (menuButton && navigation) {
  updateMenuLayout();
  mobileView.addEventListener("change", updateMenuLayout);

  menuButton.addEventListener("click", function () {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    navigation.classList.toggle("is-open", !isOpen);
  });

  navigation.addEventListener("click", function (event) {
    if (event.target.closest("a")) closeMenu();
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
      closeMenu();
      menuButton.focus();
    }
  });
}

// Show the text fallback if an image has not been added to the images folder.
document.querySelectorAll(".media-frame img, .brand-image").forEach(function (image) {
  function showFallback() {
    image.hidden = true;
  }

  image.addEventListener("error", showFallback);
  if (image.complete && image.naturalWidth === 0) showFallback();
});

// Avoid needing to edit the footer each year.
const year = document.getElementById("copyright-year");
if (year) year.textContent = new Date().getFullYear();
