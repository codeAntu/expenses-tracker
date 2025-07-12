import { BrowserRouter, Route, Routes } from 'react-router';
import LoginPage from './routes/auth/Login';
import SignupPage from './routes/auth/Signup';
import VerifyPage from './routes/auth/Verify';
import Test from './routes/test';
import Index from './routes';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Index />} />
          <Route path='/test' element={<Test />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/verify' element={<VerifyPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
