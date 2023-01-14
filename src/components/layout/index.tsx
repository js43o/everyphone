import Contents from './Contents';
import Footer from './Footer';
import Header from './Header';
import styled from '@emotion/styled';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`;

export default function Index(props: { children: React.ReactNode }) {
  return (
    <Wrapper>
      <Header />
      <Contents>{props.children}</Contents>
      <Footer />
    </Wrapper>
  );
}
