import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import { AuthContextProvider, RequireAuth } from './api/auth';

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path="login" element={<LoginPage />} />
          <Route path="*" element={
            <RequireAuth auth="123">
              <MainPage />
            </RequireAuth>
          } />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;