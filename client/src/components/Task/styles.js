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

export const Instructions = styled.div`
  width: 100%;
  background-color: #fbfbfb;
  border-radius: 3px;
  padding: 15px;
  margin: 20px 0;
  box-shadow: 0px 1px 3px 0 rgba(0, 0, 0, 0.15);

  transition: padding 0.3s, max-height 0.3s;
  transition-timing-function: cubic-bezier(1, 0, 1, 0);
  overflow: hidden;
  max-height: 500vh;

  &.expand-enter,
  &.expand-exit-active {
    padding: 0 20px;
    max-height: 0;
  }

  @media (min-width: 700px) {
    padding: 20px;
  }
`;

export const Wrapper = styled.div`
  width: 100%;
  background-color: #fbfbfb;
  border-radius: 3px;
  padding: 15px 15px 25px 15px;
  margin: 20px 0;
  box-shadow: 0px 1px 3px 0 rgba(0, 0, 0, 0.15);

  @media (min-width: 700px) {
    padding: 20px 20px 30px 20px;
  }
`;

export const Buttons = styled.div`
  @media (min-width: 700px) {
    padding-top: 20px;
  }
`;

export const Heading = styled.h1`
  position: relative;
  margin: 10px 0 30px 0;

  ::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 100%;
    box-shadow: 1px 1px 0.5px 0.5px rgba(0, 0, 0, 0.15);
  }

  @media (min-width: 700px) {
    margin: 20px 0 30px 0;
  }
`;

export const SubHeading = styled.h2`
  position: relative;
  color: #8e9fb1;
  margin: 0 0 30px 0;

  ::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 100%;
    box-shadow: 1px 1px 0.5px 0.5px rgba(0, 0, 0, 0.15);
  }

  :first-of-type {
    margin-top: 0;
  }

  @media (min-width: 700px) {
    :first-of-type {
      margin-top: 20px;
    }
  }
`;

export const Form = styled.form``;

export const Paragraph = styled.p`
  margin: 10px 0;

  :last-of-type {
    margin-bottom: 0;
  }

  @media (min-width: 700px) {
    margin: 10px 0 20px 0;

    :last-of-type {
      margin-bottom: 20px;
    }
  }
`;

export const Label = styled.label`
  display: block;
  position: relative;
  padding: 5px 5px 5px 35px;
  cursor: pointer;

  @media (min-width: 700px) {
    display: inline-block;
    padding: 5px 5px 5px 40px;
  }
`;

export const RadioInput = styled.input`
  position: absolute;
  opacity: 0;
  height: 0;
  width: 0;
`;

export const CustomRadio = styled.span`
  position: absolute;
  top: calc(50% - 12.5px);
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #eee;
  border-radius: 50%;

  ::after {
    content: "";
    position: absolute;
    display: none;

    top: 9px;
    left: 9px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: white;
  }

  ${RadioInput}:checked ~ & {
    background-color: #2196f3;
  }

  ${RadioInput}:checked ~ &::after {
    display: block;
  }

  @media (min-width: 700px) {
    height: 30px;
    width: 30px;
    top: calc(50% - 15px);

    ::after {
      width: 10px;
      height: 10px;
      top: 10px;
      left: 10px;
    }
  }
`;

export const Message = styled.div`
  margin-top: 30px;
  background-color: #f4f5f8;
  border-radius: 3px;
  padding: 15px;
  border: 1px solid #ddd;
  box-shadow: 0px 1px 3px 0 rgba(0, 0, 0, 0.15);

  @media (min-width: 700px) {
    padding: 40px;
  }
`;

export const Title = styled.h1`
  font-size: 2em;

  @media (min-width: 700px) {
    font-size: 3em;
  }
`;

export const Subtitle = styled.p`
  margin: 10px 0;

  @media (min-width: 700px) {
    margin: 20px 0 10px 0;
  }
`;

export const Loading = styled.div`
  min-height: calc(100vh - 60px);
  position: relative;
  background-color: transparent;
`;
