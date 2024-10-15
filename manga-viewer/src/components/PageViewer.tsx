import React, { useState, useEffect } from "react";
import { getChapterDetails } from "../api";
import { Page } from "../types";

interface PageViewerProps {
    chapterId: number;
    onNextChapter: () => void;
    onPreviousChapter: () => void;
    isLastChapter: boolean;
    isFirstChapter: boolean;
}

const PageViewer: React.FC<PageViewerProps> = ({
    chapterId,
    onNextChapter,
    onPreviousChapter,
    isLastChapter,
    isFirstChapter
}) => {
    const [pages, setPages] = useState<Page[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(0);

    useEffect(() => {
        const fetchPages = async () => {
            const data = await getChapterDetails(chapterId);
            setPages(data.pages);
            setCurrentPage(0);
        };
        fetchPages();
    }, [chapterId]);

    const goToNextPage = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1);
        }
        else if (!isLastChapter) {
            onNextChapter(); // Move to the next chapter if it's not the last chapter
        }
    };

    const goToPreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
        else if (!isFirstChapter) {
            onPreviousChapter(); // Move to the previous chapter if it's not the first chapter
        }
    };

    const handleImageClick = (event: React.MouseEvent<HTMLImageElement>) => {
        const clickPositionX = event.nativeEvent.offsetX;
        const imageWidth = event.currentTarget.offsetWidth;

        if (clickPositionX < imageWidth / 2) {
            goToPreviousPage();
        } else {
            goToNextPage();
        }
    };

    return (
        <div>
            <div className="flex justify-center mb-4 w-auto">
                <img
                    className="max-w-full cursor-pointer m-auto"
                    src={pages[currentPage]?.image.file}
                    alt={`Page ${currentPage + 1}`}
                    // height={pages[currentPage]?.image.height}
                    // width={pages[currentPage]?.image.width}
                    onClick={handleImageClick}
                />
            </div>
            <div className="flex justify-center items-center space-x-4">
                <div className="text-lg">
                    {currentPage + 1} / {pages.length}
                </div>
            </div>
        </div>
    );
};

export default PageViewer;
