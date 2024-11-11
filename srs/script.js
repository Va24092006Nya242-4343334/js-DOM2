const gallery = document.getElementById("gallery");
const loadMoreBtn = document.getElementById("loadMore");
const clearBtn = document.getElementById("clear");
const removeLastBtn = document.getElementById("removeLast");
const reverseBtn = document.getElementById("reverse");
const fullscreenView = document.getElementById("fullscreenView");
const fullscreenImage = document.getElementById("fullscreenImage");
const closeFullscreenBtn = document.getElementById("closeFullscreen");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

let currentIndex = 0;

async function loadImages(count = 4) {
  const response = await fetch(`https://picsum.photos/v2/list?page=1&limit=${count}`);
  const images = await response.json();
  images.forEach((imgData) => {
    const img = document.createElement("img");
    img.src = imgData.download_url;
    img.alt = imgData.author;
    img.dataset.index = gallery.children.length;
    gallery.appendChild(img);
  });
}

gallery.addEventListener("click", (e) => {
  if (e.target.tagName === "IMG") {
    const imgIndex = parseInt(e.target.dataset.index);
    openFullscreen(imgIndex);
  }
});

function openFullscreen(index) {
  currentIndex = index;
  fullscreenImage.src = gallery.children[index].src;
  fullscreenView.style.display = "flex";
}

closeFullscreenBtn.addEventListener("click", () => {
  fullscreenView.style.display = "none";
});

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % gallery.children.length;
  fullscreenImage.src = gallery.children[currentIndex].src;
});

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + gallery.children.length) % gallery.children.length;
  fullscreenImage.src = gallery.children[currentIndex].src;
});

clearBtn.addEventListener("click", () => {
  gallery.innerHTML = "";
  currentIndex = 0;
});

loadMoreBtn.addEventListener("click", () => {
  loadImages(4);
});

removeLastBtn.addEventListener("click", () => {
  if (gallery.children.length > 0) {
    gallery.removeChild(gallery.lastElementChild);
  }
});

reverseBtn.addEventListener("click", () => {
  const images = Array.from(gallery
