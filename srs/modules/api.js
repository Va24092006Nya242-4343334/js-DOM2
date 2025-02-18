export async function fetchImages(page, limit) {
    try {
        const response = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=${limit}`);
        return await response.json();
    } catch (error) {
        console.error("Помилка завантаження зображень", error);
        throw error;
    }
}
