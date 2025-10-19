import { useEffect, useState } from 'react';

const EditableTableCell = ({
  cellValue,
  type,
  name,
  cellUpdater,
  markForEdit,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(cellValue);
  const [originalValue, setOriginalValue] = useState(cellValue);

  useEffect(() => {
    if (!isEditing) {
      const newOb = {};
      newOb[`${name}`] = value;
      cellUpdater(newOb);
    }
  }, [originalValue]);

  function handleKeyDown(e) {
    if (e.code === 'Enter') {
      e.currentTarget.blur();
      setOriginalValue(e.target.value);
      markForEdit(true);
    }
    if (e.code === 'Escape') {
      e.currentTarget.blur();
      setValue(originalValue);
    }
  }

  function handleClick() {
    setIsEditing(true);
  }

  function handleBlur() {
    setIsEditing(false);
  }

  function handleChange(e) {
    setValue(e.target.value);
  }

  if (isEditing)
    switch (type) {
      case 'count':
        return (
          <td>
            <input
              type="number"
              min={0}
              step={1}
              name={name}
              onChange={(e) => {
                setValue(Number(e.target.value).toFixed(0));
              }}
              value={value}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
            />
          </td>
        );
      case 'currency':
        return (
          <td>
            <input
              type="number"
              step={0.01}
              name={name}
              onChange={handleChange}
              value={value}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
            />
          </td>
        );

      case 'text':
      default:
        return (
          <td>
            <input
              type="text"
              name={name}
              onChange={handleChange}
              value={value}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
            />
          </td>
        );
    }
  else {
    switch (type) {
      case 'currency':
        return (
          <td style={{ textAlign: 'right' }} onClick={handleClick}>
            {Number(value).toFixed(2)}
          </td>
        );
      case 'count':
        return (
          <td style={{ textAlign: 'right' }} onClick={handleClick}>
            {value}
          </td>
        );
      default:
        return <td onClick={handleClick}>{value}</td>;
    }
  }
};

export default EditableTableCell;
