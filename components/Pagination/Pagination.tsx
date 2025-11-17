import ReactPaginate from "react-paginate";
import css from "@/components/Pagination/Pagination.module.css";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (selectedItem: { selected: number }) => void;
}

export const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  if (!totalPages || totalPages <= 1) return null;

  return (
    <ReactPaginate
      containerClassName={css.pagination}
      activeClassName={css.active}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={onPageChange}
      pageRangeDisplayed={3}
      pageCount={totalPages}
      renderOnZeroPageCount={null}
      forcePage={currentPage - 1}
    />
  );
};
