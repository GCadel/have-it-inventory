import { useState } from 'react';

const EditableTableCell = ({ cellValue, type, name }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(cellValue);
  const [originalValue, setOriginalValue] = useState(cellValue);

  function handleKeyDown(e) {
    if (e.code === 'Enter') {
      e.currentTarget.blur();
      setOriginalValue(e.target.value);
    }
    if (e.code === 'Escape') {
      e.currentTarget.blur();
      setValue(originalValue);
    }
  }

  function handleDoubleClick(e) {
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
              onChange={handleChange}
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
              value={Number(value).toFixed(2)}
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
          <td style={{ textAlign: 'right' }} onDoubleClick={handleDoubleClick}>
            {Number(value).toFixed(2)}
          </td>
        );
      case 'count':
        return (
          <td style={{ textAlign: 'right' }} onDoubleClick={handleDoubleClick}>
            {value}
          </td>
        );
      default:
        return <td onDoubleClick={handleDoubleClick}>{value}</td>;
    }
  }

  // Should never be reached
  return <>Wow</>;
};

export default EditableTableCell;
