import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import ClickAwayListener from '@mui/material/ClickAwayListener';


const TagList = ({ tags, onClickAway, currentTags, changeCheck, openModal }) => {
  return (
    <Paper>
      <ClickAwayListener onClickAway={onClickAway}>
        <MenuList>
          {tags?.map(tag => (
            <MenuItem key={tag.tagName} value={tag.tagName}>
                <Checkbox
                  value={tag.tagName}
                  checked={currentTags?.includes(tag.tagName)}
                  onChange={evt => changeCheck(evt)}
                />
                <ListItemText primary={tag.tagName} />
            </MenuItem>
          ))}
          <MenuItem className="new-tag-btn">
            <Button onClick={openModal}>
              <AddCircleOutlineOutlinedIcon fontSize="small" />
              Add New Tag
            </Button>
          </MenuItem>
        </MenuList>
      </ClickAwayListener>
    </Paper>
  );
};

export default React.memo(TagList);
