import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ClientLayout from '../../layout/ClientLayout';
import RegistrationForm from '../../components/Registration/RegistrationForm';
import Login from '../../components/Login/Login';
import { AuthProvider } from '../../contexts/AuthContext';

const PublicRoutes = () => {
  return (
    <ClientLayout>
      <AuthProvider>
        <Routes>
          <Route path='/client/auth/login' element={<Login />} />
          <Route path='/client/auth/registration' element={<RegistrationForm />} />
        </Routes>
      </AuthProvider>
    </ClientLayout>
  );
};

export default PublicRoutes;
