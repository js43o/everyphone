import styled from '@emotion/styled';

const StyledLabel = styled.label<{ checked: boolean }>`
  color: ${({ checked }) => checked && 'red'};
  input {
    display: none;
  }
`;

export default function StyledCheckbox(props: {
  children: React.ReactNode;
  checked: boolean;
  onClick: () => void;
}) {
  const { children, checked, onClick } = props;
  return (
    <StyledLabel checked={checked}>
      <input type="checkbox" onClick={onClick} /> {children}
    </StyledLabel>
  );
}
