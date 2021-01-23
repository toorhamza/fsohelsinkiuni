import patients from "../../data/patients.json";

import { PublicPatient, Patient,EntryPatient } from "../types";
import toNewPatient from "../utils"

const getEntries = (): PublicPatient[] => {
  return patients;
};

const getNonSensitiveData = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (entry: EntryPatient): Patient => {
  const validatePatient = toNewPatient(entry);
  const newPatient = {
    id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
    ...validatePatient
  };

  patients.push(newPatient);
  return newPatient;
};

const findPatientById = (id: any): EntryPatient | undefined => {
  const patient = patients.find((p) => p.id === id);
  return patient;
}


export default {
  getEntries,
  getNonSensitiveData,
  addPatient,
  findPatientById
};
