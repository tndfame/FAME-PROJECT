import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import AppLayout from "./components/layouts/AppLayout";
import RegisterPage from "./pages/register-page/RegisterPage";
import "./assets/ant-design-custom.css";
import { AuthProvider } from './context/AuthContext'; 
import { ApiProvider } from './context/ApiContext';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <ApiProvider>
          <BrowserRouter>
            <Routes>
              <Route path="*" element={<AppLayout />} />
            </Routes>
          </BrowserRouter>
        </ApiProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
