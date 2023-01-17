import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { getArrayOfSize } from 'lib/methods';

const PageWrapper = styled.ul`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 1rem 0;
`;

const PageBlock = styled.li<{ selected: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.75rem;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 0.5rem;
  background: white;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
  ${({ selected }) =>
    selected &&
    css`
      color: white;
      background: black;
      font-weight: 500;
    `}
`;

const ArrowButton = styled.button`
  padding: 0.5rem;
`;

export default function Paginator(props: {
  lastPage: number;
  currentPage: number;
}) {
  const { lastPage, currentPage } = props;
  const beginPage = Math.max(1, currentPage - 5);
  const pages = getArrayOfSize(beginPage, 10);

  return (
    <PageWrapper>
      {beginPage > 1 && (
        <li>
          <ArrowButton>◀</ArrowButton>
        </li>
      )}
      {pages.map(
        (page) =>
          page <= lastPage && (
            <PageBlock key={page} selected={page === currentPage}>
              {page}
            </PageBlock>
          )
      )}
      {beginPage + 10 <= lastPage && (
        <li>
          <ArrowButton>▶</ArrowButton>
        </li>
      )}
    </PageWrapper>
  );
}
