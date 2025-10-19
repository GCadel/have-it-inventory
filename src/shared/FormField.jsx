const FormField = ({
  name = 'sd',
  placeholder,
  type,
  displayText,
  min = 0,
  intStep = false,
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
        step={intStep ? 1 : 0.01}
      />
    </div>
  );
};

export default FormField;
