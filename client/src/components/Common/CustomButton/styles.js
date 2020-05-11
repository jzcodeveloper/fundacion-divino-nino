import styled from "styled-components";
import { lighten } from "../../../utils/utils";

export const Button = styled.button`
  display: block;
  width: auto;
  padding: 10px;
  font-size: 1em;
  font-weight: bold;
  outline: 0;
  border-radius: 3px;
  cursor: ${(props) => (props.grayed ? "not-allowed" : "pointer")};
  border: 1px solid;
  border-top-color: rgb(204, 204, 204);
  border-right-color: rgb(204, 204, 204);
  border-bottom-color: #b3b3b3;
  border-left-color: rgb(204, 204, 204);
  background-image: linear-gradient(
    to bottom,
    ${({
      inverted,
      mainColor = "#fbfbfb",
      subColor = "#555555",
      lightenAmount = -40,
    }) =>
      inverted
        ? `${subColor}, ${lighten(subColor, lightenAmount)}`
        : `${mainColor}, ${lighten(mainColor, lightenAmount)}`}
  );
  color: ${(props) => (props.inverted ? "#fbfbfb" : "#666")};
  ${(props) => (props.right ? "margin-left: auto;" : "margin-left: unset;")}
  ${(props) =>
    props.left ? "margin-right: auto;" : "margin-right: unset;"}


  :hover {
    filter: brightness(95%);
  }

  @media (min-width: 700px) {
    min-width: 200px;
  }
`;
