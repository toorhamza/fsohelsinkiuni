import diagnoses from '../../data/diagnoses.json'

import { Diagnose } from '../types'

const diagnose: Array<Diagnose> = diagnoses as Array<Diagnose>

const getEntries = (): Array<Diagnose> => {
    return diagnose;
};


export default {
    getEntries,
};