import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './login';
import Signup from './Signup';
import { ErrorProvider } from './ErrorHandling';


const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/home/*" element={<Home />}>
    </Route>
  </Routes>
);

const App = () => (
  <ErrorProvider>
    <Router>
      <AppRoutes />
    </Router>
  </ErrorProvider>
);


export default App;
