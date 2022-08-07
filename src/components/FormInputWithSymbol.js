const FormInputWithSymbol = ({
  label,
  name,
  isEditMode,
  value,
  pattern,
  symbol,
  style,
  setValue,
  setValueError,
  maxLength,
  errorMessage,
  forwardRef,
}) => {
  return (
    <div>
      <label className={"form-label fw-bold"}> {label}: </label>{" "}
      <div>
        {" "}
        {isEditMode ? (
          <div className="d-inline-block">
            <input
              className={`form-control d-inline-block ${errorMessage ? 'is-invalid': ''}`}
              style={style}
              maxLength={maxLength}
              pattern={pattern}
              name={name}
              value={value}
              onChange={(event) => {
                setValue(event.target.value);
                setValueError("");
              }}
              ref={forwardRef}
              required
            />
          </div>
        ) : (
          <div className="ms-2 d-inline-block"> {value} </div>
        )}{" "}
        {symbol}
        <div>
          {errorMessage && (
            <p
              style={{
                fontSize: ".9rem",
              }}
              className="text-danger mt-1"
            >
              {errorMessage}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormInputWithSymbol;
