import styled, { css } from 'styled-components';
const test = css`
  text-align: center;
`;
const Heading = styled.h1`
  ${props =>
    props.type === 'h1' &&
    css`
      background-color: yellow;
      line-height: 1.4;
      font-size: 20px;
      font-weight: 600;
      background-color: yellow;
    `}
  ${props =>
    props.type === 'h2' &&
    css`
      background-color: yellow;
      line-height: 1.4;
      font-size: 20px;
      font-weight: 600;
      background-color: bisque;
    `}
`;

export default Heading;
