import React, { useState } from 'react';
import ReactCalendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // css import

const Calendar = () => {
  const [value, onChange] = useState(new Date());

  return (
    <div>
      <ReactCalendar onChange={onChange} value={value} />
    </div>
  );
}

export default Calendar;