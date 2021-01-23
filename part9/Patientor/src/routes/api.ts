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

  
export default router;