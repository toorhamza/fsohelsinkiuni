import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Icon } from "semantic-ui-react";

import { useStateValue } from "../state";

import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { setSinglePatient } from "../state/reducer"

const SinglePatient: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();

  useEffect(() => {
    try {
      axios
        .get<Patient>(`${apiBaseUrl}/patients/${id}`)
        .then((i) => dispatch(setSinglePatient(i.data)));
    } catch (e) {
      console.error(e);
    }
  }, [id]);

  return (
    <div>
      {patients ? Object.values(patients).map((patient) => {
          return (
              <>
            <h2>
            {patient.name}
            <Icon
              name={
                ((patient.gender as unknown) as string) == "male"
                  ? "mars"
                  : ((patient.gender as unknown) as string) == "female"
                  ? "venus"
                  : "genderless"
              }
            />
                      </h2>
             <p>
        SSN: {patient.ssn}
      </p>

      <p>
        Occupation: {patient.occupation}
      </p>
</>
          )
      }) : null}
    </div>
  );
};

export default SinglePatient;
