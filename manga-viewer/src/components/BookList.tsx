import React, { useEffect, useState } from "react";
import { getBooks } from "../api";
import { Book } from "../types";

interface BookListProps {
    selectedBookId: number | null;
    onSelectBook: (bookId: number) => void;
}

const BookList: React.FC<BookListProps> = ({
    selectedBookId,
    onSelectBook,
}) => {
    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        const fetchBooks = async () => {
            const data = await getBooks();
            setBooks(data);
            onSelectBook(1);
        };
        fetchBooks();
    }, []);

    return (
        <div className="flex justify-center mb-4 space-x-2">
            {books.map((book) => (
                <button
                    type="button"
                    key={book.id}
                    className={`px-4 py-2 rounded ${selectedBookId === book.id
                            ? "bg-teal-600 text-white"
                            : "bg-gray-300 text-gray-800"
                        }`}
                    onClick={() => onSelectBook(book.id)}
                >
                    {book.title}
                </button>
            ))}
        </div>
    );
};

export default BookList;