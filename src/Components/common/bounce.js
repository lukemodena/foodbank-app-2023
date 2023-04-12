import React from "react";
import styled, { keyframes } from "styled-components";
import { BsFillQuestionDiamondFill } from "react-icons/bs";
import { DiAptana } from "react-icons/di";
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

const popoverStats = (parTotal, parTotalRecieved, parTotalRemain, parTotalDropOff, parRecievedDropOff, parTotalCollection, parRecievedCollection, parTotalOnlineOrder, parRecievedOnlineOrder, parTotalCashDonation, parRecievedCashDonation, cashTotal, cashRecieved, cashRemain) => (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Collection Stats</Popover.Header>
      <Popover.Body>
            <strong>Overview</strong>
            <br />Total Confirmed Paticipants: {parTotal}
            <br />Total Paticipants Recieved: {parTotalRecieved}/{parTotal}
            <br />Total Paticipants Remaining: {parTotalRemain}/{parTotal}
            <br /><strong>Drop-Off</strong>
            <br />Total Drop-Off: {parTotalDropOff}
            <br />Recieved Drop-Off: {parRecievedDropOff}/{parTotalDropOff}
            <br /><strong>Pick-Up</strong>
            <br />Total Pick-Up: {parTotalCollection}
            <br />Recieved Pick-Up: {parRecievedCollection}/{parTotalCollection}
            <br /><strong>Online Orders</strong>
            <br />Total Online Order: {parTotalOnlineOrder}
            <br />Recieved Online Order: {parRecievedOnlineOrder}/{parTotalOnlineOrder}
            <br /><strong>Cash Donations</strong>
            <br />Total Cash Donations: {parTotalCashDonation}
            <br />Recieved Cash Donations: {parRecievedCashDonation}/{parTotalCashDonation}
            <br />Total Cash Donated: £{cashTotal}
            <br />Cash Recieved: £{cashRecieved}
            <br />Cash Pending: £{cashRemain}
      </Popover.Body>
    </Popover>
  );

const DURATION = "3s";

const spin = keyframes`
    from {-webkit-transform: rotate(0deg);
        transform: rotate(0deg);}
    to { -webkit-transform: rotate(360deg);
        transform: rotate(360deg);}
`;

// const padding = (width) => {
//     if (width < 760) {
//         pad
//     }
// }

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

const StatsWrapper = styled(DiAptana)`
  color: #298a85;
  height: 25px;
  width: 25px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  cursor: pointer;
  animation-name: ${spin};
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
            <OverlayTrigger trigger="click" rootClose placement="auto" overlay={popover(Notes)}>
                <a><DiamondWrapper/></a>
            </OverlayTrigger>
        )
    }
};


export const Static = (size, parTotal, parTotalRecieved, parTotalRemain, parTotalDropOff, parRecievedDropOff, parTotalCollection, parRecievedCollection, parTotalOnlineOrder, parRecievedOnlineOrder, parTotalCashDonation, parRecievedCashDonation, cashTotal, cashRecieved, cashRemain) => {
   
    return (
        <OverlayTrigger trigger="click" rootClose placement="auto" overlay={popoverStats(parTotal, parTotalRecieved, parTotalRemain, parTotalDropOff, parRecievedDropOff, parTotalCollection, parRecievedCollection, parTotalOnlineOrder, parRecievedOnlineOrder, parTotalCashDonation, parRecievedCashDonation, cashTotal, cashRecieved, cashRemain)}> 
            <a><StatsWrapper/></a>
        </OverlayTrigger>
    )
};