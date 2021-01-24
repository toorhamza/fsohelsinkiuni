import patients from "../patients";

import { PublicPatient, Patient,EntryPatient, Entry } from "../types";
import toNewPatient from "../utils"

const patientsArray: Patient[] = patients;

const getEntries = (): PublicPatient[] => {
  return patientsArray;
};

const getNonSensitiveData = (): PublicPatient[] => {
  return patientsArray.map(({ id, name, dateOfBirth, gender, occupation }) => ({
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

  patientsArray.push(newPatient);
  return newPatient;
};

const findPatientById = (id: any): EntryPatient | undefined => {
  const patient: Patient | undefined = patientsArray.find((p) => p.id === id);
  return patient;
}

const addNewEntry = (id: string, entry: Entry): Entry => {
  const patient: Patient | undefined = patientsArray.find((p) => p.id === id);
  if (!patient) {
    throw new Error(`Incorrect patient id`);
  }

  const newEntry: Entry = {...entry, id:Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15), }


  patient.entries?.push(newEntry);

  console.log(patient.entries)

  return entry;
};


export default {
  getEntries,
  getNonSensitiveData,
  addPatient,
  findPatientById,
  addNewEntry
};
