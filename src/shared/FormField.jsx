const FormField = ({
  name = 'sd',
  placeholder,
  type,
  displayText,
  min = 1,
}) => {
  return (
    <div>
      <label htmlFor={name}>{displayText}: </label>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        required
        minLength={min}
      />
    </div>
  );
};

export default FormField;
