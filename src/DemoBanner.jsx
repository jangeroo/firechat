import React from "react";
import styled from "styled-components";

export default function DemoBanner(props) {
  return (
    <DemoBannerWrapper classname="warning">
      <BannerHeading>DEMO MODE</BannerHeading>
      <p>
        <strong>NOTE:</strong> To get a real sense of the chatroom
        functionality, open this app in two browser windows so you can simulate
        being two people.
      </p>
      <CloseButton onClick={props.onClose}>X</CloseButton>
    </DemoBannerWrapper>
  );
}

const DemoBannerWrapper = styled.div`
  position: relative;

  width: fit-content;
  max-width: 50%;

  margin: auto;
  padding: 10px 30px;

  border: 2px solid;
  border-radius: 10px;

  background: pink;

  text-align: left;
  color: red;
`;

const BannerHeading = styled.h3`
  text-align: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  width: revert; // This is because I plan to set a global size for buttons. Might not turn out to be necessary.
  cursor: pointer;
  background: none;
  border: none;
  color: inherit;
`;
