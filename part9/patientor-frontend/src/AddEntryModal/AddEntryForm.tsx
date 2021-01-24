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
  return (
    <Formik
      initialValues={{
        patientId: "d27736ec-f723-11e9-8f0b-362b9e155667",
        id: "51-651",
        type: "HealthCheck",
        description: "This is a test",
        date: "2002-05-04",
        specialist: "Mark",
        diagnosisCodes: [],
        healthCheckRating: 0,
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.patientId) {
          errors.patientId = requiredError;
          console.log("required")
        }
        if (!values.id) {
          errors.id = requiredError;
          console.log("required")

        }
        if (!values.type) {
          errors.type = requiredError;
          console.log("required")

        }
        if (!values.description) {
          errors.description = requiredError;
          console.log("required")

        }
        if (!values.date) {
          errors.date = requiredError;
          console.log("required")

        }
        if (!values.specialist) {
          errors.specialist = requiredError;
          console.log("required")

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

export default AddPatientForm;
