import styled from 'styled-components';

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: center;
    gap: 1.2rem 5rem;
    transform: translateX(-2.5rem);
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  text-align: center;
  background-color: var(--color-red-100);
  border-radius: 5px;
  padding: 3px 10px;
  color: var(--color-red-700);
`;
function FormRow({ children, lable, error }) {
  return (
    <StyledFormRow>
      {lable && <Label htmlFor={children?.props?.id}>{lable}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

export default FormRow;