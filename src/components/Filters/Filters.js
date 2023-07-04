import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AppContext } from '../../AppContext';
import { FiltersWrapper } from './Filters.styles';
import CheckboxList from '../CheckboxList';
import Grid from '@mui/material/Grid';
import Button from '../Button';
import DateRange from '../DateRange';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

const filterTypes = {
  date: 'date-range',
  type: 'array',
  account: 'array',
  tags: 'array',
  categories: 'array',
};

const Filters = ({ onFilterChange, getCategories }) => {
  const [filterValues, setFilterValues] = useState(new Map());
  const [firstDateChange, setFirstDateChange] = useState(true);
  const { tagList, categoriesList } = useContext(AppContext);
  const [tags, setTags] = tagList;
  const [categories] = categoriesList;

  useEffect(() => {
    axios.get(`/api/tags`).then(resp => {
      setTags(resp.data);
    });
    getCategories();
  }, []);
 
  const onValueChange = (field, value) => {
    if (field === 'date' && firstDateChange) {
      setFirstDateChange(false);
      return;
    }
    const values = new Map(filterValues)
    if (value.size === 0) {
      values.delete(field);
    }
    else {
      values.set(field, value);
    }
    setFilterValues(values);
  };

  const handleSubmit = () => {
    const filterReturn = Array.from(filterValues.keys()).reduce((acc, key) => {
      acc[key] = {
        dataType: filterTypes[key],
        value: filterValues.get(key)
      };
      return acc;
    }, {});

    onFilterChange(filterReturn);
  };
  
  const clearFilters = () => {
    setFilterValues(new Map());
    onFilterChange({});
  };


  return (
    <FiltersWrapper>
      <h3><FontAwesomeIcon icon={faFilter} className="filter-icon" /> Filters</h3>
      <Grid container spacing={2} direction="row">
        <Grid item xs={4}>
          <DateRange onDateChange={range => onValueChange('date', range) } />
        </Grid>
        <Grid item xs={2}>
        <CheckboxList
            title="Account"
            onChange={selected => onValueChange('account', selected)}
            selected={filterValues.get('account') || new Set()}
            items={[
              {name: 'checking', label: 'Checking'},
              {name: 'savings', label: 'Savings'},
              {name: 'chase-bonvoy', label: 'Chase Bonvoy'},
              {name: 'chase-amazon', label: 'Chase Amazon'}
            ]}
          />
        </Grid>
        <Grid item xs={2}>
          <CheckboxList
            title="Type"
            onChange={selected => onValueChange('type', selected)}
            selected={filterValues.get('type') || new Set()}
            items={[
              {name: 'debit', label: 'Spent'},
              {name: 'credit', label: 'Deposited'}
            ]}
          />
        </Grid>
        <Grid item xs={2}>
          <CheckboxList
              title="Tag"
              onChange={selected => onValueChange('tags', selected)}
              selected={filterValues.get('tags') || new Set()}
              items={tags}
              itemKey="tagName"
            />
        </Grid>
        <Grid item xs={2}>
          <CheckboxList
              title="Category"
              onChange={selected => onValueChange('categories', selected)}
              selected={filterValues.get('categories') || new Set()}
              items={categories}
              itemKey="label"
            />
        </Grid>
        <Grid item xs={12} className="filter-submit-btn">
          <Button onClick={handleSubmit}>Set Filters</Button>
          <Button onClick={clearFilters} variant="text">Clear Filters</Button>
        </Grid>
      </Grid>
    </FiltersWrapper>
  )
};

export default React.memo(Filters);
