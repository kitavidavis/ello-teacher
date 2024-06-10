import React from 'react';
import { createTheme, CssBaseline, PaletteMode, ThemeOptions, ThemeProvider } from "@mui/material";
import ElloAppBar from './components/AppBar';
import Footer from './components/Footer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing from './Pages/Landing';
import ReadingListPage from './Pages/ReadingList';
import { ApolloProvider } from '@apollo/client';
import client from './ApolloClient';
//import AppLayout from './components/AppLayout';
import Dashboard from './components/AppLayout';
import AllBooks from './components/AllBooks';


function App() {
  const [mode, setMode] = React.useState<PaletteMode>('dark');

  const themeOptions: ThemeOptions = {
    typography: {
      fontFamily: ["Mulish"].join(",")
    },
    palette: {
      primary: {
        main: "#5acccc",
        light: "#ffffff",
        dark: "#335c6e",
        contrastText: "#fabd33"
      },
      secondary: {
        main: "#cffafa",
        light: "#F76434",
        dark: "#4aa088",
        contrastText: "#faad00"
      },
      mode: mode
    },
  };

  const theme = createTheme(themeOptions);

  const toggleMode = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  }

  const LandingPage = () => {
    return (
      <>
      <ElloAppBar mode={mode} toggleColorMode={toggleMode} />
      <Landing />
      <Footer />
      </>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ApolloProvider client={client}>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<LandingPage />} />
              <Route path='/books' element={<Dashboard />}>
                <Route index element={<AllBooks />} />
                <Route path='/books/all-books' element={<AllBooks />} />
                <Route path='/books/reading-list' element={<ReadingListPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default App;
