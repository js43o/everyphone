import styled from '@emotion/styled';

const ContentsBlock = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  padding: 1rem;
  width: 100%;
  background: #efefef;
`;

export default function Contents(props: { children: React.ReactNode }) {
  return <ContentsBlock>{props.children}</ContentsBlock>;
}
