import { useState, useRef } from "react";
import { Button, Col, Row } from "react-bootstrap";
import FormRadioInput from '../components/FormRadioInput';
import FormInput from '../components/FormInput';
import FormInputWithSymbol from '../components/FormInputWithSymbol';
import axios from 'axios';

function DeclarationForm() {
  const [name, setName] = useState("");
  const [temperature, setTemperature] = useState("");
  const [hasSymptoms, setHasSymptoms] = useState();
  const [hasContactInLast14Days, setHasContactInLast14Days] = useState();
  const nameInputRef = useRef(null);
  const temperatureInputRef = useRef(null);
  const [nameError, setNameError] = useState("");
  const [temperatureError, setTemperatureError] = useState("");
  const [hasSymptomsError, setHasSymptomsError] = useState("");
  const [hasContactInLast14DaysError, setHasContactInLast14DaysError] =
    useState("");
  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const isValidated = () => {
    let valid = true;
    if (hasSymptoms === undefined) {
      setHasSymptomsError("Please select an option!");
      valid = false;
    }
    if (hasContactInLast14Days === undefined) {
      setHasContactInLast14DaysError("Please select an option!");
      valid = false;
    }
    if (temperature.trim() === "") {
      setTemperatureError("Temperature is required!");
      temperatureInputRef.current.focus();
      valid = false;
    }
    if (
      isNaN(temperature) ||
      parseFloat(temperature) < 30 ||
      parseFloat(temperature) > 45
    ) {
      setTemperatureError(
        "Temperature is invalid, value must be between 30°C and 45°C!"
      );
      temperatureInputRef.current.focus();
      valid = false;
    }
    if (name.trim() === "") {
      setNameError("Name is required!");
      nameInputRef.current.focus();
      valid = false;
    }
    return valid;
  };
  const reset = () => {
    resetError();
    setIsEditMode(true);
    setName("");
    setTemperature("");
    setHasSymptoms(undefined);
    setHasContactInLast14Days(undefined);
  };
  const resetError = () => {
    setNameError("");
    setTemperatureError("");
    setHasSymptomsError("");
    setHasContactInLast14DaysError("");
  };
  const onFormNext = () => {
    resetError();
    if (isValidated()) {
      setIsEditMode(false);
    }
  };
  const onFormBack = () => {
    setIsEditMode(true);
  };
  const onFormSubmit = async () => {
    setLoading(true);
    const result = await axios.post(`/api/form/submit`, {
      name,
      temperature,
      hasSymptoms,
      hasContactInLast14Days
    });
    setLoading(false);
    if (result.status === 200) {
      setIsSubmitted(true);
    }
  };
  return (
    <form
      className={"col-md-10 col-lg-6 px-md-5 px-3 py-3 py-md-4"}
      style={{ backgroundColor: "#FCFAEC", boxShadow: "3px 3px 10px #888" }}
    >
      <h1 className={"h5 text-center mb-3"}>Health Covid-19 Declaration</h1>
      {!isSubmitted ? (
        <div>
          <div className={"mb-4"}>
            <FormInput
              maxLength={128}
              type={"text"}
              label={"Name"}
              name={"name"}
              isEditMode={isEditMode}
              value={name}
              setValue={setName}
              setValueError={setNameError}
              errorMessage={nameError}
              forwardRef={nameInputRef}
            />
          </div>
          <div className={"mb-4"}>
            <FormInputWithSymbol
              maxLength={5}
              type={"text"}
              label={"Temperature"}
              symbol={"°C"}
              style={{ width: 100 }}
              name={"temperature"}
              isEditMode={isEditMode}
              value={temperature}
              setValue={setTemperature}
              setValueError={setTemperatureError}
              errorMessage={temperatureError}
              forwardRef={temperatureInputRef}
            />
          </div>
          <div className={"mb-4"}>
            <FormRadioInput
              label={
                "Do you have any of the following symptoms now or within the last 14 days: Cough, smell/taste impairment, fever, breathing difficulties, body aches, headaches, fatigue, sore throat, diarrhoea, and / or runny nose (even if your symptoms are mild)?"
              }
              isEditMode={isEditMode}
              name={"hasSymptoms"}
              value={hasSymptoms}
              setValue={setHasSymptoms}
              setValueError={setHasSymptomsError}
              errorMessage={hasSymptomsError}
            />
          </div>
          <div className={"mb-4"}>
            <FormRadioInput
              label={
                "Have you been in contact with anyone who is suspected to have or/has been diagnosed with Covid-19 within the last 14 days?"
              }
              isEditMode={isEditMode}
              name={"hasContactInLast14Days"}
              value={hasContactInLast14Days}
              setValue={setHasContactInLast14Days}
              setValueError={setHasContactInLast14DaysError}
              errorMessage={hasContactInLast14DaysError}
            />
          </div>
          <Row>
            {isEditMode ? (
              <Col className={"justify-content-end d-flex py-3"}>
                <Button
                  variant="primary"
                  onClick={() => {
                    onFormNext();
                  }}
                >
                  Next
                </Button>
              </Col>
            ) : (
              <Col className={"justify-content-between d-flex py-3"}>
                <Button
                  variant="primary"
                  disabled={loading}
                  onClick={() => {
                    onFormBack();
                  }}
                >
                  Back
                </Button>
                <Button
                  variant="primary"
                  disabled={loading}
                  onClick={() => {
                    onFormSubmit();
                  }}
                >
                  {loading && (
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  )}
                  Submit
                </Button>
              </Col>
            )}
          </Row>
        </div>
      ) : (
        <div>
          <p className={"h6 text-center pt-4 mb-3"}>
            Form has been submitted successfully!
          </p>
          <div className="text-center mb-4">
            <a
              className="text-decoration-none"
              href="/"
              onClick={() => {
                reset();
                setIsSubmitted(false);
              }}
            >
              Click to submit a new record
            </a>
          </div>
        </div>
      )}
    </form>
  );
}

export default DeclarationForm;
