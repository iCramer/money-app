import { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink
} from "react-router-dom";
import { AppWrapper } from './App.styles';
import CssBaseline from '@mui/material/CssBaseline';
import { StyledEngineProvider } from '@mui/material/styles';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Transactions from './pages/Transactions';
import { StyleOverrides, StyleOverridesGlobal } from './StyleOverrides';
import { AppContextProvider } from './AppContext';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PaymentIcon from '@mui/icons-material/Payment';
import BackupIcon from '@mui/icons-material/Backup';
import FileUpload from './pages/FileUpload';
import axios from 'axios';

const App = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getTransactions().then(resp => {
      setTransactions(resp.data);
    });
  }, []);

  const getTransactions = () => {
    return axios.get(`/api/transactions`);
  };

  return (
    <AppContextProvider>
      <CssBaseline />
      <StyledEngineProvider injectFirst>
        <StyleOverridesGlobal />
        <StyleOverrides>
          <AppWrapper>
            <Router>
              <div className="side-nav">
                <div className="logo-wrapper">
                  <AccountBalanceIcon color="inherit" className="logo" />
                </div>
                <ul>
                  <li>
                    <NavLink to="/" activeClassName="active">
                      <PaymentIcon />
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/fileUpload" activeClassName="active">
                      <BackupIcon />
                    </NavLink>
                  </li>
                </ul>
              </div>
              <div className="main-container">
                <header>
                  <h1>Money<span>App</span></h1>
                </header>
                <main>
                  <Routes>
                    <Route
                      path="/"
                      element={
                        <Transactions transactions={transactions} />
                      }
                    />
                    <Route path="/fileUpload" element={<FileUpload />} />
                  </Routes>
                </main>
              </div>
            </Router>
          </AppWrapper>
        </StyleOverrides>
      </StyledEngineProvider>
    </AppContextProvider>
  );
}

export default App;
