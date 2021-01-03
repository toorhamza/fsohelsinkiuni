import patients from "../../data/patients.json";

import { Patient } from "../types";

const getEntries = (): Patient[] => {
  return patients;
};

const getNonSensitiveData = (): Omit<Patient, "ssn">[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export default {
  getEntries,
  getNonSensitiveData,
};
