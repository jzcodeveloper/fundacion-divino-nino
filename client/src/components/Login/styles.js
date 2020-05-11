import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  padding: 10px 20px 70px 20px;
  margin: 0 auto;
  height: fit-content;

  @media (min-width: 700px) {
    width: 85%;
    padding: 10px 0 70px 0;
  }
`;

export const Top = styled.div`
  position: relative;
  display: flex;
  flex-flow: column;
  align-items: center;

  @media (min-width: 700px) {
    padding: 30px 0;
  }
`;

export const Title = styled.h1`
  position: relative;
  display: block;
  margin-top: 10px;
  text-align: center;

  @media (min-width: 700px) {
    margin-top: 20px;
  }
`;

export const Middle = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 20px;

  @media (min-width: 700px) {
    flex-flow: row;
  }
`;

export const Card = styled.div`
  background-color: #fbfbfb;
  border-radius: 3px;
  border: 1px solid #ddd;
  box-shadow: 0px 1px 3px 0 rgba(0, 0, 0, 0.15);
  padding: 25px;
  cursor: pointer;
  transition: transform 0.3s;
  margin-bottom: 30px;

  :last-child {
    margin-bottom: 10px;
  }

  :hover {
    transform: scale(1.025);
    border: 1px solid #008ca0;
  }

  @media (min-width: 700px) {
    margin-bottom: 0;

    :first-child {
      margin-right: 45px;
    }

    :last-child {
      margin-left: 45px;
    }
  }
`;

export const Image = styled.img`
  width: 200px;
  height: 200px;
  transition: transform 0.5s;

  transform: scale(1);
`;

export const Text = styled.p`
  margin-top: 20px;
  text-align: center;
  font-size: 1.2em;

  @media (min-width: 700px) {
    font-size: 1em;
  }
`;
