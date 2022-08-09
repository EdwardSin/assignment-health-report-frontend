import "./App.css";
import { Container } from "react-bootstrap";
import DeclarationForm from './pages/DeclarationForm';
import DeclarationTable from './pages/DeclarationTable';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import axios from "axios";

axios.defaults.headers['x-api-key'] = process.env.REACT_APP_API_KEY

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Container className={"justify-content-center d-flex my-4"}>
                                    <DeclarationForm />
                                  </Container>} />
        <Route path="/list" element={<DeclarationTable />} />
      </Routes>
    </Router>
  );
}

export default App;
