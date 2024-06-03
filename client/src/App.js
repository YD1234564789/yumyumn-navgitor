import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage'
import MainPage from './pages/MainPage';
import { AuthContextProvider, RequireAuth } from './api/auth';

function App() {
  const auth=localStorage.token
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="*" element={
            <RequireAuth auth={auth}>
              <MainPage />
            </RequireAuth >
          } />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;