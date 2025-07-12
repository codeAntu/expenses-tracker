import { BrowserRouter, Route, Routes } from 'react-router';
import Test from './routes/test';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='/test' element={<Test />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
