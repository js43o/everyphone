import styled from '@emotion/styled';
import { Phone } from 'lib/types';
import RatioImage from 'components/common/RatioImage';

const CardBlock = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  background: white;
  border-radius: 0.5rem;
  text-align: center;
  overflow: hidden;
  .phone_name {
    font-weight: 500;
  }
`;

export default function PhoneCard(props: { data: Phone }) {
  const data = props.data;

  return (
    <CardBlock>
      <RatioImage
        src={`/images/phones/${data.url}.png`}
        alt={data.url}
        height={120}
      />
      <hr />
      <span className="phone_name">{data.name}</span>
    </CardBlock>
  );
}
