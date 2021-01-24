import express from 'express';
import diagnoses from '../services/diagnoses'
import patients from '../services/patients'
import { Entry } from '../types';

const router = express.Router();

router.get('/ping', (_req, res) => {
  res.status(200).send('pong')
});




router.get('/patients', (_req, res) => {
    res.json(patients.getNonSensitiveData());
  });

router.get('/diagnose', (_req, res) => {
    res.json(diagnoses.getEntries());
  });

  router.post('/patients', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { name, dateOfBirth, gender, ssn, occupation } = req.body;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const newPatient = patients.addPatient({name, dateOfBirth, gender, ssn, occupation})

    res.json(newPatient);

  });

  router.get('/patients/:id', (req, res) => {
    const patient = patients.findPatientById(req.params.id);
  
    if (patient) {
      res.json(patient);
    } else {
      res.status(404).end();
    }
  });

  router.post('/patients/:id/entries', (req, res)  => {
    const { id } = req.params;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const newEntry: Entry = req.body;
    try {
      const addedEntry = patients.addNewEntry(id, newEntry);
      res.json(addedEntry);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Undefined error';
      res.status(400).send(errorMessage);
    }
  });

  
export default router;