import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  border-radius: 3px;
  background-color: #fbfbfb;
  border: 1px solid #ddd;
  box-shadow: 0px 1px 3px 0 rgba(0, 0, 0, 0.15);
  margin: 20px 0;
  padding: 15px 50px 15px 15px;
  position: relative;

  :first-child {
    margin-top: 15px;
  }

  @media (min-width: 700px) {
    flex-flow: row;
    padding: 20px 100px 20px 20px;

    :first-child {
      margin-top: 20px;
    }
  }
`;

export const Item = styled.div`
  display: flex;
  width: 100%;
  flex-flow: column;
  font-size: 1em;
  color: #888;
  margin-bottom: 5px;

  :nth-child(3) {
    display: none;
  }

  @media (min-width: 700px) {
    font-size: 0.9em;
    margin-bottom: 0;

    :nth-child(1) {
      width: 50%;
    }
    :nth-child(2),
    :nth-child(3) {
      display: flex;
      width: 25%;
      text-align: center;
    }
  }
`;

export const ID = styled.span`
  display: none;
  font-size: 0.8em;
  margin-bottom: 5px;
  color: #999;

  @media (min-width: 700px) {
    display: inline-block;
    margin-bottom: 10px;
  }
`;

export const Title = styled.span`
  margin-bottom: 5px;
  color: #666;

  @media (min-width: 700px) {
    margin-bottom: 10px;
  }
`;

export const Details = styled.span`
  color: #999;

  @media (min-width: 700px) {
    font-size: 0.85em;
  }
`;
