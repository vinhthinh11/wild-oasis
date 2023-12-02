import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { PAGE_SIZE } from '../utils/constants';

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;
  width: 25rem;

  & span {
    font-weight: 600;
  }
`;

const PaginationButton = styled.button`
  background-color: ${props =>
    props.active ? ' var(--color-brand-600)' : 'var(--color-grey-50)'};
  color: ${props => (props.active ? ' var(--color-brand-50)' : 'inherit')};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  border: 1px solid var(--color-grey-300);

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;
  &:disabled {
    background-color: transparent;
    color: transparent;
    border: 1px solid transparent;
  }

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;
function Pagination({ count }) {
  // current page will store on the url
  const [searchParams, setSearchParams] = useSearchParams();
  if (count <= PAGE_SIZE) return null;
  const pageCount = Math.ceil(count / PAGE_SIZE);
  const currentPage = +searchParams.get('page') || 1;

  // function to handle when clicked on the previous button and next button
  function nextPage() {
    const next = currentPage < pageCount ? currentPage + 1 : currentPage;
    searchParams.set('page', next);
    setSearchParams(searchParams);
  }
  function prevPage() {
    const prev = currentPage > 1 ? currentPage - 1 : currentPage;
    searchParams.set('page', prev);
    setSearchParams(searchParams);
  }
  return (
    <StyledPagination>
      <P>
        Showing <span>{(currentPage - 1) * PAGE_SIZE + 1}</span> to{' '}
        <span>
          {currentPage * PAGE_SIZE > count ? count : currentPage * PAGE_SIZE}{' '}
        </span>
        of <span>{count}</span> results
      </P>
      <PaginationButton onClick={prevPage} disabled={currentPage === 1}>
        <HiChevronLeft />
        <span>Previous</span>
      </PaginationButton>

      <PaginationButton onClick={nextPage} disabled={currentPage === pageCount}>
        <span>Next</span>
        <HiChevronRight />
      </PaginationButton>
    </StyledPagination>
  );
}

export default Pagination;
