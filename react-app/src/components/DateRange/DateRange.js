import { useState, useEffect } from 'react'
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRangeStyles } from './DateRange.styles';
import { DateRange as ReactDateRange } from 'react-date-range';


const DateRange = ({ onDateChange }) => {
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection'
    }
  ]);

  const formatDate = date => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    
    return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`
  };

  useEffect(() => {
    let { startDate, endDate } = range[0];
    if (!endDate) endDate = new Date();
    if (!startDate) startDate = new Date();

    const formattedRage = {
      start: formatDate(startDate),
      end: formatDate(endDate)
    }
    onDateChange(formattedRage)
  }, [range]);

  return (
    <DateRangeStyles>
      <ReactDateRange
        editableDateInputs={true}
        onChange={item => setRange([item.selection])}
        moveRangeOnFirstSelection={false}
        ranges={range}
      />
    </DateRangeStyles>
  );
}

export default DateRange;
