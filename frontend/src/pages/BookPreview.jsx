import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import { useGetBookByIdQuery } from "../redux/api/authApi";

import { Document, Page, pdfjs } from "react-pdf";
import { useEffect } from "react";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const BookPreview = () => {
  const { bookId } = useParams();
  const { data, isLoading } = useGetBookByIdQuery(bookId);

  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState(null);

  const book = data?.book;

    useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  const onLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const goNext = (e) => {
     e?.preventDefault();
  setPageNumber((p) => {
    const next = Math.min(p + 1, numPages);


    return next;
  });
};

const goPrev = (e) => {
     e?.preventDefault();
  setPageNumber((p) => {
    const prev = Math.max(p - 1, 1);


    return prev;
  });
};

  if (isLoading) return <p>Loading...</p>;



  return (
    <div>
    <Navbar />

    <div className="mt-10 flex flex-col items-center px-3 sm:px-4">

      {/* TOP BAR */}
      <div className="w-full max-w-5xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">

        {/* TITLE */}
        <h2 className="text-lg font-bold truncate w-full sm:max-w-[50%]">
          {book?.title}
        </h2>

        {/* CONTROLS */}
        <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">

          <button
            type="button"
            onClick={goPrev}
            className="px-3 py-1 bg-gray-200 rounded text-sm"
          >
            Prev
          </button>

          <p className="text-sm font-medium whitespace-nowrap">
            {pageNumber} / {numPages}
          </p>

          <button
            type="button"
            onClick={goNext}
            className="px-3 py-1 bg-indigo-600 text-white rounded text-sm"
          >
            Next
          </button>

        </div>
      </div>

      {/* PDF CONTAINER */}
      <div className="w-full flex justify-center">
        <div className="border shadow-md rounded overflow-hidden">

          <Document
            file={book?.fileUrl}
            onLoadSuccess={onLoadSuccess}
            loading={<p className="p-4">Loading PDF...</p>}
          >
            <Page
              pageNumber={pageNumber}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              width={Math.min(600, window.innerWidth - 40)}
            />
          </Document>

        </div>
      </div>

    </div>

    <Footer />
  </div>
  );
};

export default BookPreview;