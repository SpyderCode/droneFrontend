import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DroneStatusProvider } from './context/DroneStatusContext'; // Add DroneStatusProvider
import { MissionsProvider } from './context/MissionsContext'; // Add MissionsProvider
import { ModelsProvider } from './context/ModelsContext'; // Add ModelsProvider
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import MissionsPage from './pages/MissionsPage';
import MissionFormPage from './pages/MissionFormPage';
import MissionDetailsPage from './pages/MissionDetailsPage';
import DroneStatusPage from './pages/DroneStatusPage';
import DroneFormPage from './pages/DroneFormPage';
import ProtectedRoute from './ProtectedRoute';
import Navbar from './components/Navbar';
import NotFound from './pages/NotFound';

function App() {
  return (
    <AuthProvider>
      <DroneStatusProvider> {/* Wrap DroneStatus context */}
        <MissionsProvider>  {/* Wrap Missions context */}
          <ModelsProvider>  {/* Wrap Models context */}
            <BrowserRouter>
              <main className="container mx-auto px-10">
                <Navbar />
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />

                  <Route element={<ProtectedRoute />} >
                    {/* Add new routes for drones and missions */}
                    <Route path="/drones" element={<DroneStatusPage />} />
                    <Route path="/drones/:id" element={<DroneFormPage />} />
                    <Route path="/add-drones" element={<DroneFormPage />} />

                    <Route path="/missions" element={<MissionsPage />} />
                    <Route path="/missions/:id" element={<MissionFormPage />} />
                    <Route path="/missionDetails/:missionId" element={<MissionDetailsPage />} />
                    <Route path="/add-missions" element={<MissionFormPage />} />
                  </Route>

                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </BrowserRouter>
          </ModelsProvider>
        </MissionsProvider>
      </DroneStatusProvider>
    </AuthProvider>
  );
}

export default App;
