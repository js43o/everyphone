import styled from '@emotion/styled';

const TitleBlock = styled.span<{ fontSize?: number }>`
  font-family: 'Bakbak One', cursive;
  font-size: ${({ fontSize }) => (fontSize ? fontSize : 2)}rem;
  font-weight: normal;
`;

export default function Title(props: {
  children: React.ReactNode;
  fontSize: number;
}) {
  return <TitleBlock fontSize={props.fontSize}>{props.children}</TitleBlock>;
}
