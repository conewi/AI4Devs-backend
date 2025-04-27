import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RecruiterDashboard from './components/RecruiterDashboard';
import AddCandidate from './components/AddCandidateForm';
import PositionSelector from './components/PositionSelector';
import CandidatesKanban from './components/CandidatesKanban';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RecruiterDashboard />} />
        <Route path="/add-candidate" element={<AddCandidate />} />
        <Route path="/positions" element={<PositionSelector />} />
        <Route path="/positions/:positionId/candidates" element={<CandidatesKanban />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;