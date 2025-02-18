const gallery = document.getElementById("gallery");
let currentPage = 1;
const imagesPerRow = 4;

async function fetchImages(page) {
    try {
        const response = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=${imagesPerRow}`);
        const images = await response.json();
        displayImages(images);
    } catch (error) {
        console.error("Помилка завантаження зображень", error);
    }
}

function displayImages(images) {
    images.forEach((image) => {
        const imgElement = document.createElement("img");
        imgElement.src = image.download_url;
        imgElement.alt = "Random image";
        gallery.appendChild(imgElement);
    });
}

fetchImages(currentPage);

document.getElementById("loadMore").addEventListener("click", async () => {
    currentPage++;
    await fetchImages(currentPage);
});

document.getElementById("clearGallery").addEventListener("click", () => {
    gallery.innerHTML = "";
    currentPage = 1;
});

document.getElementById("removeLast").addEventListener("click", () => {
    const images = gallery.getElementsByTagName("img");
    if (images.length > 0) {
        gallery.removeChild(images[images.length - 1]);
    }
});

document.getElementById("reverseGallery").addEventListener("click", () => {
    const images = Array.from(gallery.children);
    gallery.innerHTML = "";
    images.reverse().forEach((img) => gallery.appendChild(img));
});

document.getElementById("shuffleGallery").addEventListener("click", () => {
    const images = Array.from(gallery.children);
    gallery.innerHTML = "";
    images.sort(() => Math.random() - 0.5);
    images.forEach((img) => gallery.appendChild(img));
});
