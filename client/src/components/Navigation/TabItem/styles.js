import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  margin: 15px 0;
  width: 33%;
  text-align: center;

  ::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 100%;
    height: 3px;
    background-color: ${(props) => (props.active ? "#666" : "transparent")};
    border-radius: 20px 20px 0 0;
  }

  a {
    font-weight: ${(props) => (props.active ? "bold" : "normal")};
  }

  @media (min-width: 700px) {
    width: auto;
    margin: 15px;

    :first-child {
      margin-left: 0;
    }

    :last-child {
      margin-right: 0;
    }
  }
`;

export const StyledLink = styled(Link)`
  font-size: 1em;
  color: #666;

  @media (min-width: 700px) {
    font-size: 0.95em;
  }
`;
