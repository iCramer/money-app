import { CheckboxListStyles } from './CheckboxList.styles';
import Checkbox from '../Checkbox';

const CheckboxList = ({ title, onChange, children, items, selected, itemKey = 'name' }) => {
  const onCheckChange = evt => {
    const { name, checked } = evt.target;
    const newSelection = new Set(selected);
    if (checked) {
      newSelection.add(name);
    }
    else {
      newSelection.delete(name);
    }
    onChange(newSelection);
  }

  return (
    <CheckboxListStyles>
      <label>{title}</label>
      {!children && items?.length ? (
        <div className="check-list">
          {items.map(item => (
            <Checkbox
              name={item[itemKey]}
              label={item.label || item[itemKey]}
              checked={selected.has(item[itemKey])}
              onChange={evt => onCheckChange(evt)}
              key={[item[itemKey]]}
            />
          ))}
        </div>
      ) : (children)}
    </CheckboxListStyles>
  )
};

export default CheckboxList;
