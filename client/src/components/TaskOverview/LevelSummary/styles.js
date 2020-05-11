import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
`;

export const Flex = styled.div`
  position: relative;
  display: flex;
  flex-flow: column;
  align-items: center;

  @media (min-width: 700px) {
    flex-flow: row;
  }
`;

export const Element = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;
  background-color: #fbfbfb;
  border-radius: 3px;
  border: 1px solid #ddd;
  padding: 20px 15px;
  margin: 5px 0;
  box-shadow: 0px 1px 3px 0 rgba(0, 0, 0, 0.15);

  @media (min-width: 700px) {
    margin: 0 5px;

    :first-child {
      margin-left: 0;
    }

    :last-child {
      margin-right: 0;
    }
  }
`;

export const Medal = styled.img`
  width: 150px;
  filter: grayscale(
    ${({ data, requirement }) =>
      data.totalTasks >= requirement.totalTasks.min &&
      data.totalQuestions >= requirement.totalQuestions.min &&
      data.totalTime >= requirement.totalTime.min
        ? "0"
        : "1"}
  );

  @media (min-width: 700px) {
    width: 200px;
  }
`;

export const Button = styled.button`
  width: 200px;
  padding: 10px;
  margin-top: 18px;
  font-size: 1em;
  outline: 0;
  border-radius: 3px;
  cursor: pointer;
  border: 2px solid #fff;
  color: #ffffff;

  filter: grayscale(
    ${({ data, requirement }) =>
      data.totalTasks >= requirement.totalTasks.min &&
      data.totalQuestions >= requirement.totalQuestions.min &&
      data.totalTime >= requirement.totalTime.min
        ? "0"
        : "1"}
  );
`;

export const BronzeButton = styled(Button)`
  background-color: #ed9d5e;
  box-shadow: 0 0 0 2px #ed9d5e;

  :hover {
    background-color: #d38e57;
    box-shadow: 0 0 0 2px #d38e57;
  }
`;

export const SilverButton = styled(Button)`
  background-color: #cccecd;
  box-shadow: 0 0 0 2px #cccecd;

  :hover {
    background-color: #c1c4c3;
    box-shadow: 0 0 0 2px #c1c4c3;
  }
`;

export const GoldButton = styled(Button)`
  background-color: #f0c75e;
  box-shadow: 0 0 0 2px #f0c75e;

  :hover {
    background-color: #d9b555;
    box-shadow: 0 0 0 2px #d9b555;
  }
`;
