import styled, { css } from 'styled-components';

const Heading = styled.h1`
  ${props =>
    props.$as === 'h1' &&
    css`
      background-color: yellow;
      line-height: 1.4;
      font-size: 20px;
      font-weight: 600;
      background-color: yellow;
    `}
  ${props =>
    props.$as === 'h2' &&
    css`
      line-height: 1.4;
      font-size: 20px;
      font-weight: 600;
    `}
     ${props =>
    props.$as === 'h3' &&
    css`
      font-size: 2rem;
      font-weight: 600;
      text-align: center;
    `}
`;

export default Heading;
