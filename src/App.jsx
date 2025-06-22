import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import LoginPage from "./components/LoginPage";
import InternPage from "./components/InternPage";
import SupervisorPage from "./components/SupervisorPage";
import AdminPage from "./components/AdminPage";
import SignupPage from "./components/SignupPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import HomePage from "./components/Homepage";

function App() {
  return (
    <AuthProvider>
      
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route element={<Navbar />} >
          <Route
            path="/intern"
            element={
              <ProtectedRoute role="intern">
                <InternPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/supervisor"
            element={
              <ProtectedRoute role="supervisor">
                <SupervisorPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <AdminPage />
              </ProtectedRoute>
            }
          />
          </Route>
        </Routes>
      
    </AuthProvider>
  );
}
export default App;