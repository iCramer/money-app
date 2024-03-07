import { CurrentFiltersStyles } from './CurrentFilters.styles';
import Chip from '@mui/material/Chip';

const CurrentFilters = ({ filters }) => {
  const keys = Object.keys(filters);
  if (!keys?.length) return;

  const getDateRange = () => {
    const { start, end } = filters.date.value;
    return `${start}-${end}`
  };
  
  return (
    <CurrentFiltersStyles>
      {keys.map(key => (
        <>
          {filters[key].dataType === 'array' && (
            <>
              {Array.from(filters[key].value).map(value => (
                <Chip label={value} size="small" color="primary" />
              ))}
            </>
          )}
          {filters[key].dataType === 'date-range' && (
            <Chip label={getDateRange()} size="small" color="primary" />
          )}
        </>
      ))}
    </CurrentFiltersStyles>
  )
};

export default CurrentFilters;
