import { Container } from "@styles/layout";
import { SERVER_PROPS_ID } from "next/dist/shared/lib/constants";
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styled from "styled-components";

const ReactCalendar = () => {
  const [value, onChange] = useState(new Date());

  return (
    <CalendarContainer>
      <CalendarCustom onChange={onChange} value={value} />
    </CalendarContainer>
  );
};

const CalendarContainer = styled(Container)`
    width: 100%;
`;

const CalendarCustom = styled(Calendar)`
    width: 100%;
    height: 100%;
    border: none;
    button {
      color: ${props => props.theme.color.fontMain};
      height: 5em;
    }
    .react-calendar__navigation {
        height: 5em;
    }
    .react-calendar__navigation__label {
        font-size: ${props => props.theme.fontSize.textLg};
    }
`;
export default ReactCalendar;
