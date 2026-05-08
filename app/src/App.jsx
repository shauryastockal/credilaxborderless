import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import LoanHub from './pages/LoanHub';
import Repayment from './pages/Repayment';
import SendMoney from './pages/SendMoney';
import Convert from './pages/Convert';
import CardPage from './pages/CardPage';
import Wealth from './pages/Wealth';
import { ThemeProvider } from './context/ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="loan" element={<LoanHub />} />
          <Route path="repayment" element={<Repayment />} />
          <Route path="send" element={<SendMoney />} />
          <Route path="convert" element={<Convert />} />
          <Route path="card" element={<CardPage />} />
          <Route path="wealth" element={<Wealth />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </ThemeProvider>
  );
}
