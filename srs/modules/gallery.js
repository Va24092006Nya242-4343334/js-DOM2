
const gallery = document.getElementById('gallery');

export function displayImages(images) {
    images.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image.download_url;
        imgElement.alt = 'Random image';
        gallery.appendChild(imgElement);
    });
}

export function clearGallery() {
    gallery.innerHTML = '';
}


