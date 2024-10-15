import axios from "axios";

const BASE_URL = "http://52.195.171.228:8080";

// Get all books
export const getBooks = async () => {
    const response = await axios.get(`${BASE_URL}/books/`);
    return response.data;
};

// Get book details by bookId
export const getBookDetails = async (bookId: number) => {
    const response = await axios.get(`${BASE_URL}/books/${bookId}/`);
    return response.data;
};

// Get chapter details by chapterId
export const getChapterDetails = async (chapterId: number) => {
    const response = await axios.get(`${BASE_URL}/chapters/${chapterId}/`);
    return response.data;
};