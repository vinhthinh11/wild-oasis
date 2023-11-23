import styled from 'styled-components';

const StyleHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 2.3rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
`;
function Header() {
  return <StyleHeader>Header</StyleHeader>;
}

export default Header;
