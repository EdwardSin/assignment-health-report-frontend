const FormInput = ({
    label, name, isEditMode, value, setValue, setValueError, maxLength, errorMessage, forwardRef
}) => {
    return (<div>
        <label className={"form-label fw-bold"}>{label}:</label>
        {isEditMode ? (
          <div>
            <input
              className={`form-control ${errorMessage ? 'is-invalid': ''}`}
              maxLength={maxLength}
              name={name}
              value={value}
              onChange={(event) => {
                setValue(event.target.value);
                setValueError("");
              }}
              ref={forwardRef}
              required
            />
            {errorMessage && (
              <div style={{ fontSize: ".9rem" }} className="text-danger mt-1">
                {errorMessage}
              </div>
            )}
          </div>
        ) : (
          <div className="ms-2">{value}</div>
        )}
    </div>)
}

export default FormInput;