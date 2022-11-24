import { Container } from "@styles/layout";
import { SERVER_PROPS_ID } from "next/dist/shared/lib/constants";
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styled from "styled-components";
import reset from "styled-reset";

const ReactCalendar = () => {
  const [value, onChange] = useState(new Date());
  const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  return (
    <CalendarContainer>
      <CalendarCustom 
        onChange={onChange} 
        value={value}
        formatDay={(locale, date) => date.toLocaleString("en", {day: "numeric"})}
      />
    </CalendarContainer>
  );
};

const CalendarContainer = styled(Container)`
  width: 100%;
  margin: 2em;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: lightcoral; */
`;

const CalendarCustom = styled(Calendar)`
  width: 100%;
  height: 90vh;
  border: none;
  /* background-color: lavender; */
  /* display: grid;
  grid-template-rows: 15% 80%; */
  abbr[title] {
    text-decoration: none;
  }
  //당월이 아닌 날짜
  .react-calendar__month-view__days__day--neighboringMonth {
    color: ${props => props.theme.color.fontSub};
  }
  button {
    color: ${props => props.theme.color.fontMain};
    background-color: none;
  }

  //nav
  .react-calendar__navigation {
    height: 12vh;
    margin-bottom: 0;
  }
  .react-calendar__navigation__label {
    font-size: ${props => props.theme.fontSize.textLg};
  }
  .react-calendar__navigation__label__labelText {
  }
  .react-calendar__navigation__label__labelText--from{
    font-size: ${props => props.theme.fontSize.textXl};
  }
  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    color: ${props => props.theme.color.fontPoint};
    background: #f8f8fa;
  }
  .react-calendar__navigation button[disabled] {
  background-color: #f0f0f0;
  }
  .react-calendar__navigation__prev2-button,
  .react-calendar__navigation__next2-button {
    display: none;
  }

  //요일, 날짜 전체
  .react-calendar__viewContainer {
    color: ${props => props.theme.color.fontMain};
    height: 70vh;
    padding: 1.5em;
  }
  //요일 전체
  .react-calendar__month-view__weekdays {
    height: 5vh;
    border-bottom: 1px solid ${props => props.theme.color.fontMain};
    margin-bottom: 0.5em;
  }
  //요일 각자
  .react-calendar__month-view__weekdays__weekday {
    display: flex;
    justify-content: center;
    align-items: center;
    abbr {
      font-size: ${props => props.theme.fontSize.textMain};
    }
  }
  /* abbr */
  //날짜 전체
  .react-calendar__month-view__days {
    height: 65vh;
  }
  //날짜 각자
  .react-calendar__tile {
    display: flex;
    justify-content: flex-end;
  }
  /* .react-calendar__month-view__days__day  */
  /* abbr */
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
  background: #f8f8fa;
  color: ${props => props.theme.color.fontPoint};
  border-radius: 6px;
  }
  .react-calendar__tile--now {
  background: ${props => props.theme.color.purpleBox};
  border-radius: 6px;
  font-weight: bold;
  color: ${props => props.theme.color.fontPoint};
  }
  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
  background: #6f48eb33;
  border-radius: 6px;
  font-weight: bold;
  color: ${props => props.theme.color.fontPoint};
  }
`;
export default ReactCalendar;
