import styled from '@emotion/styled';
import { Phone } from 'lib/types';
import PhoneCard from 'components/phones/PhoneCard';
import SearchController from 'components/phones/SearchController';
import { Pagination } from '@mui/material';

const PhonesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
  max-width: 1024px;
  .phones-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    gap: 0.5rem;
    label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-weight: 500;
    }
  }
  .phones-contents {
    display: grid;
    grid-template-columns: 1fr 3fr;
    gap: 1rem;
    width: 100%;
  }
`;

const PhoneCardList = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.75rem;
  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 375px) {
    grid-template-columns: 1fr;
  }
`;

export default function Index(props: { data: string }) {
  const phones: Phone[] = JSON.parse(props.data).phones;

  return (
    <PhonesWrapper>
      <div className="phones-header">
        <h1>기기 목록</h1>
        <label>
          <select defaultValue="latest">
            <option value="latest">최근 출시 순</option>
            <option value="oldest">오래된 순</option>
            <option value="expensive">가격 높은 순</option>
            <option value="cheapest">가격 낮은 순</option>
          </select>
        </label>
      </div>
      <div className="phones-contents">
        <SearchController />
        <PhoneCardList>
          {phones.map((phone) => (
            <PhoneCard key={phone.url} data={phone} />
          ))}
        </PhoneCardList>
      </div>
      <Pagination count={1} />
    </PhonesWrapper>
  );
}

export async function getServerSideProps() {
  const data = await import('lib/phones.json');
  return {
    props: { data: JSON.stringify(data) },
  };
}
