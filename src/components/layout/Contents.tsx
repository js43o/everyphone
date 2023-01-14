import styled from '@emotion/styled';

const ContentsBlock = styled.main`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export default function Contents(props: { children: React.ReactNode }) {
  return <ContentsBlock>{props.children}</ContentsBlock>;
}
