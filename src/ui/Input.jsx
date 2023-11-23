import styled from 'styled-components';

const Input = styled.input`
  border-radius: 7px;
  border: 1px solid var(--color-grey-300);
  height: 30px;
  padding: 0 7px;
  & :focus {
    border: 1px solid var(--color-grey-300);
    outline: none;
  }
`;
export default Input;
