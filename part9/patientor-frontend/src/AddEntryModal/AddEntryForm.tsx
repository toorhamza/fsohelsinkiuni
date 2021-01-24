import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField, NumberField, DiagnosisSelection } from "./FormField";
import { HealthCheckRating, Diagnosis } from "../types";
import { useStateValue } from "../state";

/*
 * use type Patient, but omit id and entries,
 * because those are irrelevant for new patient object.
 */
export interface PatientEntryValues {
  patientId: string;
  id: string;
  type: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis["code"]>;
  healthCheckRating?: HealthCheckRating;
  discharge?: {
    date: string;
    criteria: string;
  };
  employerName?: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

interface Props {
  onSubmit: (values: PatientEntryValues) => void;
  onCancel: () => void;
}

export const AddPatientForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue();
  const [entryType, setentryType] = React.useState();

  const getHealthCheckForm = () => {
    return (
      <Formik
        initialValues={{
          patientId: "d27736ec-f723-11e9-8f0b-362b9e155667",
          id: "51-651",
          type: "HealthCheck",
          description: "This is a test",
          date: "2002-05-04",
          specialist: "Mark",
          diagnosisCodes: ["A27"],
          healthCheckRating: 0,
        }}
        onSubmit={onSubmit}
        validate={(values) => {
          const requiredError = "Field is required";

          const errors: { [field: string]: string } = {};
          if (!values.patientId) {
            errors.patientId = requiredError;
          }
          if (!values.id) {
            errors.id = requiredError;
          }
          if (!values.type) {
            errors.type = requiredError;
          }
          if (!values.description) {
            errors.description = requiredError;
          }
          if (!values.date) {
            errors.date = requiredError;
          }
          if (!values.specialist) {
            errors.specialist = requiredError;
          }
          if (!values.healthCheckRating) {
            errors.healthCheckRating = requiredError;
          }
          return errors;
        }}
      >
        {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
          return (
            <Form className="form ui">
              <Field
                label="Patient Id"
                placeholder="Patient Id"
                name="patientId"
                component={TextField}
              />
              <Field
                label="Entry Id"
                placeholder="Id"
                name="id"
                component={TextField}
              />
              <Field
                label="Type"
                placeholder="type"
                name="type"
                component={TextField}
              />
              <Field
                label="Description"
                placeholder="description"
                name="description"
                component={TextField}
              />
              <Field
                label="Date"
                placeholder="date"
                name="date"
                component={TextField}
              />
              <Field
                label="Specialist"
                placeholder="Specialist"
                name="specialist"
                component={TextField}
              />
              <Field
                label="Specialist"
                placeholder="Specialist"
                name="specialist"
                component={TextField}
              />

              <DiagnosisSelection
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                diagnoses={Object.values(diagnoses)}
              />
              <Field
                label="healthCheckRating"
                name="healthCheckRating"
                component={NumberField}
                min={0}
                max={3}
              />
              <Grid>
                <Grid.Column floated="left" width={5}>
                  <Button type="button" onClick={onCancel} color="red">
                    Cancel
                  </Button>
                </Grid.Column>
                <Grid.Column floated="right" width={5}>
                  <Button
                    type="submit"
                    floated="right"
                    color="green"
                    disabled={!dirty || !isValid}
                  >
                    Add
                  </Button>
                </Grid.Column>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    );
  };

  const getHospitalForm = () => {
    return (
      <Formik
        initialValues={{
          patientId: "d27736ec-f723-11e9-8f0b-362b9e155667",
          id: "51-651",
          type: "Hospital",
          description: "This is a test",
          date: "2002-05-04",
          specialist: "Mark",
          diagnosisCodes: ["A27"],
          discharge: { date: "2002-05-10", criteria: "No criteria" },
        }}
        onSubmit={onSubmit}
        validate={(values) => {
          const requiredError = "Field is required";

          const errors: { [field: string]: string } = {};
          if (!values.patientId) {
            errors.patientId = requiredError;
          }
          if (!values.id) {
            errors.id = requiredError;
          }
          if (!values.type) {
            errors.type = requiredError;
          }
          if (!values.description) {
            errors.description = requiredError;
          }
          if (!values.date) {
            errors.date = requiredError;
          }
          if (!values.specialist) {
            errors.specialist = requiredError;
          }
          if (!values.discharge?.date) {
            errors.discharge = requiredError;
          }
     
          return errors;
        }}
      >
        {({ isValid}) => {
          return (
            <Form className="form ui">
              <Field
                label="Patient Id"
                placeholder="Patient Id"
                name="patientId"
                component={TextField}
              />
              <Field
                label="Entry Id"
                placeholder="Id"
                name="id"
                component={TextField}
              />
              <Field
                label="Type"
                placeholder="type"
                name="type"
                component={TextField}
              />
              <Field
                label="Description"
                placeholder="description"
                name="description"
                component={TextField}
              />
              <Field
                label="Date"
                placeholder="date"
                name="date"
                component={TextField}
              />
              <Field
                label="Specialist"
                placeholder="Specialist"
                name="specialist"
                component={TextField}
              />
              <Field
                label="Discharge date"
                placeholder="discharge date"
                name="discharge.date"
                component={TextField}
              />
              <Field
                label="Discharge criteria"
                placeholder="discharge date"
                name="discharge.criteria"
                component={TextField}
              />

              <Grid>
                <Grid.Column floated="left" width={5}>
                  <Button type="button" onClick={onCancel} color="red">
                    Cancel
                  </Button>
                </Grid.Column>
                <Grid.Column floated="right" width={5}>
                  <Button
                    type="submit"
                    floated="right"
                    color="green"
                    disabled={!isValid}
                  >
                    Add
                  </Button>
                </Grid.Column>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    );
  };

  const getOccupationalHealthCareForm = () => {
    return (
      <Formik
        initialValues={{
          patientId: "d27736ec-f723-11e9-8f0b-362b9e155667",
          id: "51-651",
          type: "OccupationalHealthcare",
          description: "This is a test",
          date: "2002-05-04",
          specialist: "Mark",
          diagnosisCodes: ["A27"],
          employerName: "Company Oy",
          sickLeave: { startDate: "2002-05-10", endDate: "2002-05-20" },
        }}
        onSubmit={onSubmit}
        validate={(values) => {
          const requiredError = "Field is required";

          const errors: { [field: string]: string } = {};
          if (!values.patientId) {
            errors.patientId = requiredError;
          }
          if (!values.id) {
            errors.id = requiredError;
          }
          if (!values.type) {
            errors.type = requiredError;
          }
          if (!values.description) {
            errors.description = requiredError;
          }
          if (!values.date) {
            errors.date = requiredError;
          }
          if (!values.specialist) {
            errors.specialist = requiredError;
          }
          if (!values.employerName) {
            errors.employerName = requiredError;
          }
          return errors;
        }}
      >
        {({ isValid }) => {
          return (
            <Form className="form ui">
              <Field
                label="Patient Id"
                placeholder="Patient Id"
                name="patientId"
                component={TextField}
              />
              <Field
                label="Entry Id"
                placeholder="Id"
                name="id"
                component={TextField}
              />
              <Field
                label="Type"
                placeholder="type"
                name="type"
                component={TextField}
              />
              <Field
                label="Description"
                placeholder="description"
                name="description"
                component={TextField}
              />
              <Field
                label="Date"
                placeholder="date"
                name="date"
                component={TextField}
              />
              <Field
                label="Specialist"
                placeholder="Specialist"
                name="specialist"
                component={TextField}
              />
              <Field
                label="Sick leave start date"
                placeholder="Sick leave start date"
                name="sickLeave.startDate"
                component={TextField}
              />
              <Field
                label="Sick leave end date"
                placeholder="Sick leave end date"
                name="sickLeave.endDate"
                component={TextField}
              />

              <Grid>
                <Grid.Column floated="left" width={5}>
                  <Button type="button" onClick={onCancel} color="red">
                    Cancel
                  </Button>
                </Grid.Column>
                <Grid.Column floated="right" width={5}>
                  <Button
                    type="submit"
                    floated="right"
                    color="green"
                    disabled={!isValid}
                  >
                    Add
                  </Button>
                </Grid.Column>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    );
  };

  return (
    <div>
      <h3>Please select the entry type</h3>
      <select onChange={(event) => setentryType(event.target.value)}>
        <option value="HealthCheck">HealthCheck</option>
        <option value="Hospital">Hospital</option>
        <option selected value="OccupationalHealthcare">
          Occupational Healthcare
        </option>
      </select>
      <div>
        {entryType == "HealthCheck" ? getHealthCheckForm() : null}
        {entryType == "Hospital" ? getHospitalForm() : null}
        {entryType == "OccupationalHealthcare" ? getOccupationalHealthCareForm() : null}

      </div>
    </div>
  );
};

export default AddPatientForm;
