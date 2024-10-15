import React, { useEffect, useState } from "react";
import { getBookDetails } from "../api";
import { Book } from "../types";

interface ChapterListProps {
    bookId: number;
    selectedChapterId: number | null;
    onSelectChapter: (chapterId: number | null) => void;
}

const ChapterList: React.FC<ChapterListProps> = ({
    bookId,
    selectedChapterId,
    onSelectChapter,
}) => {
    const [chapters, setChapters] = useState<number[]>([]);

    useEffect(() => {
        const fetchChapters = async () => {
            const data: Book = await getBookDetails(bookId);
            setChapters(data.chapter_ids);
            onSelectChapter(data.chapter_ids[0]);
        };
        fetchChapters();
    }, [bookId]);

    return (
        <div className="flex justify-center mb-6 space-x-2">
            {chapters.map((chapter, index) => (
                <button
                    type="button"
                    key={chapter}
                    className={`px-4 py-2 rounded ${selectedChapterId === chapter
                            ? "bg-teal-600 text-white"
                            : "bg-gray-300 text-gray-800"
                        }`}
                    onClick={() => onSelectChapter(chapter)}
                >
                    {index + 1}
                </button>
            ))}
        </div>
    );
};

export default ChapterList;