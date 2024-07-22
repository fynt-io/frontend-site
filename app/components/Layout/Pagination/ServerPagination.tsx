import { useState } from "react";
import React from "react";
import BrenIcon from "./../Icons/BrenIcon";

const ServerPagination = ({
  currentPage,
  itemsPerPage,
  totalItems,
  goNextPage = () => {},
  goPreviousPage = () => {},
  goToThePage = () => {},
  className = "",
}: {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  goNextPage: any;
  goPreviousPage: any;
  goToThePage?: any;
  className?: string;
}) => {
  const [totalPages, setTotalPages] = useState<number>(0);

  React.useEffect(() => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    setTotalPages(totalPages);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalItems]);

  const RenderPageButton = (pageNumber: number) => {
    const isActive = pageNumber === currentPage;
    return (
      <button
        key={pageNumber}
        className={`p-2 rounded-lg w-7 h-7 inline-flex justify-center items-center text-center mx-1 ${isActive ? `bg-cloudy-blue/25 text-grey dark:text-white` : "  text-grey dark:text-white"}`}
        onClick={() => goToThePage(pageNumber)}
        disabled={pageNumber < 1 || pageNumber > totalPages}
      >
        {pageNumber}
      </button>
    );
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="flex items-center justify-center">
        <div className="flex items-center justify-center">
          <button
            className={`p-2 rounded-lg w-7 h-7 inline-flex justify-center items-center text-center mx-1 text-grey dark:text-white  disabled:text-cloudy-blue disabled:opacity-25 `}
            onClick={() => goPreviousPage()}
            disabled={currentPage === 1}
          >
            <BrenIcon icon="chevron-left" color="inherit" />
          </button>



          

          {totalPages > 0 && (
            <>

          {/* add the first page  and three dots  if the current page is greater than 3 */}
              {currentPage > 3 && (
                <>
                  {RenderPageButton(1)}
                  <button
                    className={`p-2 rounded-lg w-7 h-7 inline-flex justify-center items-center text-center mx-1 text-grey dark:text-white`}
                    disabled
                  >
                    ...
                  </button>
                </>
              )}
            
              {currentPage > 1 && (
                <>
                  {currentPage - 2 > 0 &&  RenderPageButton(currentPage - 2)}
                  {currentPage - 1 > 0 &&  RenderPageButton(currentPage - 1)}
                </>
              )}
              {RenderPageButton(currentPage)}
              {currentPage < totalPages && (
                <>
                  {currentPage + 1 < totalPages && RenderPageButton(currentPage + 1)}
                  {currentPage + 2 < totalPages && RenderPageButton(currentPage + 2)}
                </>
              )}

              {currentPage < totalPages && (
                <>

              {currentPage + 4 < totalPages && (
                    <button
                      className={`p-2 rounded-lg w-7 h-7 inline-flex justify-center items-center text-center mx-1 text-grey dark:text-white`}
                      disabled
                    >
                      ...
                    </button>
                  )}
                  {RenderPageButton(totalPages)}
                </>
              )}
            </>
          )}
          
          <button
            className={`p-2 rounded-lg w-7 h-7 inline-flex justify-center items-center text-center mx-1 text-grey disabled:text-grey dark:text-white disabled:opacity-25`}
            onClick={() => goNextPage()}
            disabled={currentPage === totalPages}
          >
            <BrenIcon icon="chevron-right" color="inherit" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServerPagination;
