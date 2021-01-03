import { Patient, Gender } from './types';


const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
}

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
  };

const parseName = (string: any): string => {
    if (!string || !isString(string)) {
        throw new Error('Incorrect or missing name: ' + parseName);
    }

    return string;
}

const parseDateofBirth = (date: any): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date of Birth: ' + date);
    }
    return date;
};

const parseOccupation = (string: any): string => {
    if (!string || !isString(string)) {
        throw new Error('Incorrect or missing occupation: ' + parseOccupation);
    }

    return string;
}

const parseSSN = (string: any): string => {
    if (!string || !isString(string)) {
        throw new Error('Incorrect or missing comment: ' + parseSSN);
    }

    return string;
}

const parseGender = (gender: any): string => {
    if (!gender || !isGender(gender)) {
           throw new Error('Incorrect or missing gender: ' + parseGender);
    }

    return gender;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
const toNewPatient = (object: any): Omit<Patient, 'id'> => {
    return {
        name: parseName(object.name),
        dateOfBirth: parseDateofBirth(object.dateOfBirth),
        gender: parseGender(object.gender),
        ssn: parseSSN(object.ssn),
        occupation: parseOccupation(object.occupation)
      };
}



export default toNewPatient;