import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { initializeIcons } from '@fluentui/react/lib/Icons';
import { ThemeProvider } from '@fluentui/react';
import { AppProvider } from './AppContext';
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import Incidents from './pages/Incidents';
import Compliance from './pages/Compliance';
import Vulnerabilities from './pages/Vulnerabilities';
import Education from './pages/Education';
import Settings from './pages/Settings';
import Workflows from './pages/Workflows';

// Initialize FluentUI icons
initializeIcons();

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppProvider>
        <Router>
          <div className="app-container">
            <Navigation />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/incidents" element={<Incidents />} />
                <Route path="/workflows" element={<Workflows />} />
                <Route path="/compliance" element={<Compliance />} />
                <Route path="/vulnerabilities" element={<Vulnerabilities />} />
                <Route path="/education" element={<Education />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </main>
          </div>
        </Router>
      </AppProvider>
    </ThemeProvider>
  );
};

export default App;