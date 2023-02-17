import React from "react";
import styled, { keyframes } from "styled-components";
import { BsFillQuestionDiamondFill } from "react-icons/bs";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

const popover = (Notes) => (
  <Popover id="popover-basic">
    <Popover.Header as="h3">Notes</Popover.Header>
    <Popover.Body>
        {Notes}
    </Popover.Body>
  </Popover>
);

const DURATION = "3s";

const bounce = keyframes`
    0% {-webkit-transform: scale(1.1,.9);
        transform: scale(1.1,.9);}
    50% { -webkit-transform: scale(.9,1.1) translateY(-.2rem)}
    70% { -webkit-transform: scale(1);
        transform: scale(1);}
`;

const DiamondWrapper = styled(BsFillQuestionDiamondFill)`
  color: #FF0000;
  cursor: pointer;
  animation-name: ${bounce};
  animation-duration: ${DURATION};
  animation-direction: alternate;
  animation-timing-function: cubic-bezier(0.95, 0.05, 0.795, 0.035);
  animation-iteration-count: infinite;
  &:hover {
    color: #555555;
`;

export const Bounce = (Notes) => {
    if (Notes === "" || Notes === null) {
        return (
            null
        )
    } else {
        return (
            <OverlayTrigger trigger="click" placement="right" overlay={popover(Notes)}>
                <a><DiamondWrapper/></a>
            </OverlayTrigger>
        )
    }
};
