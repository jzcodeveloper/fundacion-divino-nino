import styled from "styled-components";

export const Container = styled.div`
  width: 90%;
  padding: 0 0 160px 0;
  margin: 0 auto;
  height: fit-content;

  @media (min-width: 700px) {
    width: 100%;
    padding: 10px 45px 80px 45px;
  }
`;

export const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ListItems = styled.div`
  position: relative;
  min-height: calc(100vh - 328px);
`;

export const Message = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  background-color: #fbfbfb;
  border: 1px solid #ddd;
  box-shadow: 0px 1px 3px 0 rgba(0, 0, 0, 0.15);
  margin: 20px 0;
  padding: 20px;
  font-size: 0.9em;
  color: #888;
  min-height: 113px;
`;

export const Text = styled.p`
  text-align: justify;
  line-height: 2em;

  @media (min-width: 700px) {
    margin-bottom: 20px;
  }
`;

export const Margin = styled.br``;
