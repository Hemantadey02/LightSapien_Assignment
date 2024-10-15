import React, { useState } from "react";
import BookList from "./components/BookList";
import ChapterList from "./components/ChapterList";
import PageViewer from "./components/PageViewer";
import { Chapter } from "./types";

const App: React.FC = () => {
  const [selectedBook, setSelectedBook] = useState<number | null>(null);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
  
  const handleNextChapter = () => {
    if (selectedChapter !== null) {
      console.log(chapters);
      const currentChapterIndex = chapters.findIndex(
        (chapter) => chapter.id === selectedChapter
      );
      if (currentChapterIndex < chapters.length - 1) {
        setSelectedChapter(chapters[currentChapterIndex + 1].id);
      }
    }
  };
  
  const handlePreviousChapter = () => {
    if (selectedChapter !== null) {
      console.log(chapters);
      const currentChapterIndex = chapters.findIndex(
        (chapter) => chapter.id === selectedChapter
      );
      if (currentChapterIndex > 0) {
        setSelectedChapter(chapters[currentChapterIndex - 1].id);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-200 via-black to-cyan-200 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl text-center mb-8">Manga Reader</h1>
      <BookList
        selectedBookId={selectedBook}
        onSelectBook={(bookId) => {
          setSelectedBook(bookId);
          setSelectedChapter(null);
        }}
      />
      {selectedBook && (
        <ChapterList
          bookId={selectedBook}
          selectedChapterId={selectedChapter}
          onSelectChapter={setSelectedChapter}
        />
      )}
      {selectedChapter && (<PageViewer
        chapterId={selectedChapter}
        onNextChapter={handleNextChapter}
        onPreviousChapter={handlePreviousChapter}
        isLastChapter={
          selectedChapter === chapters[chapters.length - 1]?.id
        }
        isFirstChapter={selectedChapter === chapters[0]?.id}
      />
      )}
    </div>
  );
};

export default App;
