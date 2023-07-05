import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import Button from '../Button';
import StyleOutlinedIcon from '@mui/icons-material/StyleOutlined';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import ClickAwayListener from '@mui/material/ClickAwayListener';


const TagList = ({ tags, onClickAway, currentTags, changeCheck, openModal }) => {
  return (
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
        <MenuItem>
          <Button onClick={openModal} size="small" variant="text">
            <StyleOutlinedIcon size="sm" />
            Add New Tag
          </Button>
        </MenuItem>
      </MenuList>
    </ClickAwayListener>
  );
};

export default React.memo(TagList);
