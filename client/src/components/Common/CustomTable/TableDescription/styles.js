import styled from "styled-components";

export const createBeforeElements = (headers) => `
  ${headers.map(
    (header, i) => `:nth-of-type(${i + 1})::before {
    content: attr(data-label);
  }`
  )}

  :first-of-type::before{
    border-top: 1px solid #fbfbfb;
    border-radius: 5px 0 0 0;
  }
  :last-of-type::before{
    border-radius: 0 0 0 5px;
  }
`;

export const Description = styled.span`
  font-size: 0.9em;
  padding: 5px 5px 5px 55%;
  position: relative;
  word-break: break-all;

  ::before {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: #3a3a3a;
    border-bottom: 1px solid #fbfbfb;
    color: #fbfbfb;
    width: calc(55% - 10px);
    padding: 5px;
    box-sizing: border-box;
    word-wrap: none;
  }

  ${(props) => createBeforeElements(props.headers)}

  @media (min-width: 700px) {
    padding: 0;

    ::before {
      display: none;
    }
  }
`;
