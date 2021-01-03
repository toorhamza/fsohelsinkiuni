import patients from "../../data/patients.json";

import { Patient } from "../types";
import toNewPatient from "../utils"

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

const addPatient = (entry: Omit<Patient, 'id'>): Patient => {
  const validatePatient = toNewPatient(entry)
  const newPatient = {
    id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
    ...validatePatient
  }

  patients.push(newPatient);
  return newPatient;
}

export default {
  getEntries,
  getNonSensitiveData,
  addPatient
};
