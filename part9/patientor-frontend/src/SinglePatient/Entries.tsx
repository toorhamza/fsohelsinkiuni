import React from "react";
import { Entry, HealthCheckRating } from "../types";
import { Card, Icon } from "semantic-ui-react";

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  const healthCheckObject = Object.assign({},...Object.entries(HealthCheckRating).map(([a, b]) => ({ [b]: a })));
  switch (entry.type) {
    case "Hospital":
      return (
        <Card fluid>
          <Card.Content>
            <Card.Header>
              {entry.date} <Icon name="hospital" />
            </Card.Header>
            <Card.Meta>{entry.description}</Card.Meta>
            <Card.Description>
              <p>specialist: {entry.specialist}</p>
              <p>diagnosis codes: {entry.diagnosisCodes}</p>
              <p>discharge date: {entry.discharge.date}</p>
            </Card.Description>
          </Card.Content>
        </Card>
      );

    case "HealthCheck":
      return (
        <Card fluid>
          <Card.Content>
            <Card.Header>
              {entry.date} <Icon name="doctor" />
            </Card.Header>
            <Card.Meta>{entry.description}</Card.Meta>
            <Card.Description>
              <p>specialist: {entry.specialist}</p>
              <p>Health Rating: {healthCheckObject[entry.healthCheckRating]}</p>
            </Card.Description>
          </Card.Content>
        </Card>
      );
    case "OccupationalHealthcare":
        return (
            <Card fluid>
              <Card.Content>
                <Card.Header>
                  {entry.date} <Icon name="stethoscope" />
                </Card.Header>
                <Card.Meta>{entry.description}</Card.Meta>
                <Card.Description>
                  <p>specialist: {entry.specialist}</p>
                  <p>employer: {entry.employerName}</p>
                  {entry.sickLeave?<p> sickleave: {entry.sickLeave.startDate}</p> : null}              
                   </Card.Description>
              </Card.Content>
            </Card>
          );
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
