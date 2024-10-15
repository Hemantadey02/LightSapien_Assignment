export interface Book {
    id: number;
    title: string;
    chapter_ids: number[];
}

interface Image {
    id: number;
    file: string;
    width: number;
    height: number;
}

export interface Page {
    id: number;
    page_index: number;
    image: Image;
}

export interface Chapter {
    id: number;
    title: string;
    book: Book;
    chapter_index: number;
    pages: Page[];
}
