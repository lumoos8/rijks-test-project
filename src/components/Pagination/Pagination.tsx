import "./Pagination.css";

type PaginationProps = {
  chosenPage: number;
  onChosenPage: (page: number) => void;
  totalPages: number;
};

export const Pagination = ({
  chosenPage,
  onChosenPage,
  totalPages,
}: PaginationProps) => {
  const isFirstPage = chosenPage === 1;

  const isLastPage = chosenPage === totalPages;

  const handlePreviousPageClick = () => {
    if (!isFirstPage) {
      onChosenPage(chosenPage - 1);
    }
  };

  const handleNextPageClick = () => {
    if (!isLastPage) {
      onChosenPage(chosenPage + 1);
    }
  };

  return (
    <div className="pagination">
      <button
        className="pagination-button"
        onClick={handlePreviousPageClick}
        disabled={isFirstPage}
      >
        Previous
      </button>
      <div className="pagination-numbers">
        {chosenPage} of {totalPages}
      </div>
      <button
        onClick={handleNextPageClick}
        disabled={isLastPage}
        className="pagination-button"
      >
        Next
      </button>
    </div>
  );
};
