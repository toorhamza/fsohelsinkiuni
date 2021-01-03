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

export default router;