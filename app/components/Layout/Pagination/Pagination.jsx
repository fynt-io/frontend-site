import { useState } from "react";
import React from "react";
import BrenIcon from "../Icons/BrenIcon";

const Pagination = ({
  items,
  itemsPerPage = 15,
  onPageChange,
  row = true,
  goToTheFirstPage = () => {},
  className = "",
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(items?.length / itemsPerPage);

  React.useEffect(() => {
    if (goToTheFirstPage) {
      goToTheFirstPageMethod();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, goToTheFirstPage]);

  const goToTheFirstPageMethod = () => {
    if (currentPage > totalPages) {
      goToTheFirstPage();
      setCurrentPage(1);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    onPageChange(page);
  };

  const renderItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items?.slice(startIndex, endIndex);
  };

  const renderPageButton = (pageNumber) => {
    const isActive = pageNumber === currentPage;
    return (
      <button
        key={pageNumber}
        className={`p-2 rounded-lg w-7 h-7 inline-flex justify-center items-center text-center mx-1 ${isActive ? `bg-cloudy-blue/25 text-grey dark:text-white` : "  text-grey dark:text-white"}`}
        onClick={() => handlePageChange(pageNumber)}
        disabled={pageNumber < 1 || pageNumber > totalPages}
      >
        {pageNumber}
      </button>
    );
  };

  const renderPreviousButton = () => (
    <button
      className={`p-2 rounded-lg w-7 h-7 inline-flex justify-center items-center text-center mx-1  text-grey dark:text-white  disabled:text-cloudy-blue disabled:opacity-25 `}
      onClick={() => handlePageChange(currentPage - 1)}
      disabled={currentPage === 1}
    >
      <BrenIcon icon="chevron-left" color="inherit" />
    </button>
  );

  const renderNextButton = () => (
    <button
      className={`p-2 rounded-lg w-7 h-7 inline-flex justify-center items-center text-center mx-1   text-grey disabled:text-grey dark:text-white disabled:opacity-25`}
      onClick={() => handlePageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
    >
      <BrenIcon icon="chevron-right" color="inherit" />
    </button>
  );

  const renderPaginationButtons = () => {
    const visiblePages = [currentPage - 1, currentPage, currentPage + 1].filter(
      (pageNumber) => pageNumber > 0 && pageNumber <= totalPages,
    );
    return (
      <div className={`p-2 flex justify-center`}>
        {renderPreviousButton()}
        {visiblePages.map(renderPageButton)}
        {renderNextButton()}
      </div>
    );
  };

  return (
    <>
      <div className={``} style={{ flexDirection: row ? "column" : "row" }}>
        {renderItems()}
      </div>
      <div className={`w-full text-center mt-10 ${className}`}>
        {renderPaginationButtons()}
      </div>
    </>
  );
};

export default Pagination;
