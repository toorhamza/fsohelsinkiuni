import express from 'express';
import diagnoses from '../services/diagnoses'
import patients from '../services/patients'

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
    const { name, dateOfBirth, gender, ssn, occupation } = req.body;
    const newPatient = patients.addPatient({name, dateOfBirth, gender, ssn, occupation})

    res.json(newPatient);

  });


export default router;