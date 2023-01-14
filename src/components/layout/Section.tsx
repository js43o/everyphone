import styled from '@emotion/styled';

const SectionBlock = styled.section`
  display: flex;
  width: 768px;
  padding: 1rem;
  border-radius: 0.5rem;
  background: white;
  box-shadow: 0 0.25rem 1rem rgba(0, 0, 0, 0.1);
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export default function Section(props: { children: React.ReactNode }) {
  return <SectionBlock>{props.children}</SectionBlock>;
}
