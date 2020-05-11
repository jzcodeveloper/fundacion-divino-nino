import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  position: relative;
  width: ${(props) => (props.value ? "180px" : "0")};
  height: 40px;
  transition: width 0.8s;

  border: 3px solid #555555;
  border-radius: 30px;
  padding: 10px 24px 10px 10px;

  :hover {
    width: 180px;
  }

  :focus-within {
    width: 180px;
  }

  @media (min-width: 700px) {
    padding: 10px 34px 10px 10px;
    width: ${(props) => (props.value ? "220px" : "0")};
    height: 50px;

    :hover {
      width: 220px;
    }

    :focus-within {
      width: 220px;
    }
  }
`;

export const Input = styled.input`
  background-color: transparent;
  font-size: 1em;
  font-weight: bold;
  outline: 0;
  width: 100%;
  padding-right: 10px;
`;

export const IconContainer = styled.div`
  font-size: 1.2em;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: calc(50% - 12px);
  right: 5px;
  width: 24px;
  height: 24px;
  background-color: #666;
  border-radius: 50%;
  cursor: pointer;

  @media (min-width: 700px) {
    top: calc(50% - 15px);
    right: 7px;
    width: 30px;
    height: 30px;
  }
`;

export const Icon = styled(FontAwesomeIcon)`
  font-size: 0.8em;

  & path {
    color: #fbfbfb;
  }
`;
