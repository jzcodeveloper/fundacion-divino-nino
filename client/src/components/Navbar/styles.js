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

export const User = styled.div`
  position: relative;
  padding: 8px 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  :hover,
  :focus {
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

export const Name = styled.span`
  font-size: 0.75em;
  font-weight: bold;
  color: #888888;
  margin-left: 5px;
  transition: color 0.25s;

  ${User}:hover &,
  ${User}:focus & {
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

export const Options = styled.div`
  position: absolute;
  top: 40px;
  right: 0;
  width: 200px;
  border: 1px solid #d1d8dd;
  border-radius: 0 0 4px 4px;
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.176);
  max-height: 300px;
  overflow-y: auto;
  z-index: 10;
  background-color: #fbfbfb;
  transform-origin: top right;
`;

export const Option = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  padding: 8px 12px;
  font-size: 0.75em;
  min-height: 50px;
  cursor: pointer;
  transition: color 0.2s;

  :hover {
    color: #36414c;
    background-color: #f0f4f7;
  }
`;
