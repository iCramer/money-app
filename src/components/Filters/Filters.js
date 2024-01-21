import React, { useState, useContext, useEffect, useRef } from 'react';
import axios from 'axios';
import { AppContext } from '../../AppContext';
import { FiltersWrapper, TagEditorGlobalStyles, StyledBadge } from './Filters.styles';
import CheckboxList from '../CheckboxList';
import Button from '../Button';
import DateRange from '../DateRange';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import Paper from '@mui/material/Paper';
import Popover from '@mui/material/Popover';
import ClickAwayListener from '@mui/material/ClickAwayListener';

const filterTypes = {
  date: 'date-range',
  type: 'array',
  account: 'array',
  tags: 'array',
  categories: 'array',
};

const accounts = [
  {name: 'checking', label: 'Checking'},
  {name: 'savings', label: 'Savings'},
  {name: 'chase-bonvoy', label: 'Chase Bonvoy'},
  {name: 'chase-amazon', label: 'Chase Amazon'}
]

const Filters = ({ onFilterChange, getCategories }) => {
  const [filterValues, setFilterValues] = useState(new Map());
  const [firstDateChange, setFirstDateChange] = useState(true);
  const [openPopper, setOpenPopper] = useState('');
  const { tagList, categoriesList } = useContext(AppContext);
  const [tags, setTags] = tagList;
  const [categories] = categoriesList;

  const tagAnchor = useRef(null);
  const categoryAnchor = useRef(null);
  const accountAnchor = useRef(null);
  const typeAnchor = useRef(null);
  const dateAnchor = useRef(null);

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

  const getTriggerBtn = (id, label) => {
    const filter = filterValues.get(id);
    const filterLength = filter && filterTypes[id] === 'array' ? Array.from(filter).length : null;
    return (
      <Button onClick={() => setOpenPopper(id)} variant={filter ? 'success': 'success-outline'} shape="pill">
        {label}
        {filterLength && (
          <StyledBadge badgeContent={filterLength} color="info" style={{ marginLeft: '15px' }} />
        )}
      </Button>
    )
  };

  return (
    <FiltersWrapper>
      <TagEditorGlobalStyles />
      <h3><FontAwesomeIcon icon={faFilter} className="filter-icon" /> Filters</h3>
      <div className="filters">
        <div ref={dateAnchor}>
          {getTriggerBtn('date', 'Date Range')}
        </div>
        <Popover
          open={openPopper === 'date'}
          anchorEl={dateAnchor.current}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <ClickAwayListener onClickAway={() => setOpenPopper('')}>
            <Paper>
              <DateRange onDateChange={range => onValueChange('date', range) } />
            </Paper>
          </ClickAwayListener>
        </Popover>

        <div ref={accountAnchor}>
          {getTriggerBtn('account', 'Accounts')}
        </div>
        <Popover
          open={openPopper === 'account'}
          anchorEl={accountAnchor.current}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <ClickAwayListener onClickAway={() => setOpenPopper('')}>
            <Paper>
              <CheckboxList
                onChange={selected => onValueChange('account', selected)}
                selected={filterValues.get('account') || new Set()}
                items={accounts}
              />
            </Paper>
          </ClickAwayListener>
        </Popover>

        <div ref={typeAnchor}>
          {getTriggerBtn('type', 'Transaction Type')}
        </div>
        <Popover
          open={openPopper === 'type'}
          anchorEl={typeAnchor.current}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <ClickAwayListener onClickAway={() => setOpenPopper('')}>
            <Paper>
              <CheckboxList
                onChange={selected => onValueChange('type', selected)}
                selected={filterValues.get('type') || new Set()}
                items={[
                  {name: 'spend', label: 'Spend'},
                  {name: 'deposit', label: 'Deposit'}
                ]}
              />
            </Paper>
          </ClickAwayListener>
        </Popover>

        <div ref={tagAnchor}>
          {getTriggerBtn('tags', 'Tags')}
        </div>
        <Popover
          open={openPopper === 'tags'}
          anchorEl={tagAnchor.current}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <ClickAwayListener onClickAway={() => setOpenPopper('')}>
            <Paper>
              <CheckboxList
                onChange={selected => onValueChange('tags', selected)}
                selected={filterValues.get('tags') || new Set()}
                items={tags}
                itemKey="tagName"
              />
            </Paper>
          </ClickAwayListener>
        </Popover>

        <div ref={categoryAnchor}>
          {getTriggerBtn('categories', 'Categories')}
        </div>
        <Popover
          open={openPopper === 'categories'}
          anchorEl={categoryAnchor.current}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <ClickAwayListener onClickAway={() => setOpenPopper('')}>
            <Paper>
            <CheckboxList
              onChange={selected => onValueChange('categories', selected)}
              selected={filterValues.get('categories') || new Set()}
              items={categories}
              itemKey="label"
            />
            </Paper>
          </ClickAwayListener>
        </Popover>
        </div>

      <div className="filter-submit-btn">
        <Button onClick={handleSubmit}>Set Filters</Button>
        <Button onClick={clearFilters} variant="text">Clear Filters</Button>
      </div>
    </FiltersWrapper>
  )
};

export default React.memo(Filters);
