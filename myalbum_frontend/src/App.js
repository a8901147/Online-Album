import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./Login";
import Protected from "./Protected";
import { AuthProvider } from "./AuthContext";
const App = () => (
  <Router>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Login></Login>} />
        <Route path="/protected" element={<Protected></Protected>} />
      </Routes>
    </AuthProvider>
  </Router>
);

export default App;
