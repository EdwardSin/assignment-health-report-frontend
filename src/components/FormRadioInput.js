const FormRadioInput = ({
  label,
  isEditMode,
  name,
  value,
  setValue,
  setValueError,
  errorMessage,
}) => {
  return (
    <div>
      <label className={"form-label fw-bold"}>{label}</label>
      {errorMessage && (
        <p style={{ fontSize: ".9rem" }} className="text-danger mb-1">
          {errorMessage}
        </p>
      )}
      {isEditMode ? (
        <div>
          <div className="form-check">
            <input
              className={`form-check-input ${errorMessage ? 'is-invalid': ''}`}
              type="radio"
              name={name}
              id={name + "Yes"}
              defaultChecked={value}
              onChange={() => {
                setValue(true);
                setValueError("");
              }}
              required
            />
            <label className="form-check-label fw-bold" htmlFor={name + "Yes"}>
              Yes
            </label>
          </div>
          <div className="form-check">
            <input
              className={`form-check-input ${errorMessage ? 'is-invalid': ''}`}
              type="radio"
              value={false}
              name={name}
              id={name + "No"}
              defaultChecked={value === false}
              onChange={() => {
                setValue(false);
                setValueError("");
              }}
              required
            />
            <label className="form-check-label fw-bold" htmlFor={name + "No"}>
              No
            </label>
          </div>
        </div>
      ) : (
        <div className="ms-2">{value ? "Yes" : "No"}</div>
      )}
    </div>
  );
};

export default FormRadioInput;
