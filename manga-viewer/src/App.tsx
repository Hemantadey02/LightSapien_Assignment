import React, { useState } from "react";
import BookList from "./components/BookList";
import ChapterList from "./components/ChapterList";
import PageViewer from "./components/PageViewer";

const App: React.FC = () => {
  const [selectedBook, setSelectedBook] = useState<number | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      {/* <h1 className="text-4xl text-center mb-8">Manga Reader</h1> */}
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
      {selectedChapter && <PageViewer chapterId={selectedChapter} />}
    </div>
  );
};

export default App;