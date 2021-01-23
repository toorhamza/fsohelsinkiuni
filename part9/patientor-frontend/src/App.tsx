import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Button, Divider, Header, Container } from "semantic-ui-react";

import { apiBaseUrl } from "./constants";
import { useStateValue } from "./state";
import { Patient } from "./types";
import { setPatientList} from "./state/reducer"

import PatientListPage from "./PatientListPage";
import SinglePatient from "./SinglePatient";

const App: React.FC = () => {
  const [, dispatch] = useStateValue();

  const fetchPatientList = async () => {
    try {
      const { data: patientListFromApi } = await axios.get<Patient[]>(
        `${apiBaseUrl}/patients`
      );
      dispatch(setPatientList(patientListFromApi));
      console.log("done");
    } catch (e) {
      console.error(e);
    }
  };

  React.useEffect(() => {
    axios.get<void>(`${apiBaseUrl}/ping`);

    
    fetchPatientList();
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Container>
          <Header as="h1">Patientor</Header>
          <Button onClick={fetchPatientList} as={Link} to="/" primary>
            Home
          </Button>
          <Divider hidden />
          <Switch>
          <Route path="/" exact>
              <PatientListPage />
            </Route>            <Route path="/patients/:id">
              <SinglePatient />
            </Route>
          </Switch>
        </Container>
      </Router>
    </div>
  );
};

export default App;
