import styled from "styled-components";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Container = styled.div`
  height: ${(props) => (props.user ? "40px" : "60px")};
  border-bottom: 1px solid #e9e9e9;
  background-color: #f5f7fa;
`;

export const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  height: 100%;

  @media (min-width: 750px) {
    width: 80%;
  }
`;

export const Left = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Right = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Icon = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

export const CurrentUser = styled.div`
  padding: 8px 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  :hover {
    background-color: #dfe5ef;
  }
`;

export const Avatar = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
  margin-right: 5px;
  border-radius: 50%;
`;

export const User = styled.span`
  font-size: 0.75em;
  font-weight: bold;
  color: #888888;
  margin-left: 5px;
  transition: color 0.25s;

  ${CurrentUser}:hover & {
    color: #444444;
  }
`;

export const LoginLink = styled(Link)`
  color: #666666;
  letter-spacing: 0.12em;
`;

export const StyledLink = styled(Link)`
  margin-right: 15px;
`;

export const StyledIcon = styled(FontAwesomeIcon)`
  margin-right: 10px;
  font-size: 0.9em;

  path: {
    color: ${(props) => props.color};
  }
`;

export const Span = styled.span`
  font-size: 0.8em;
`;
