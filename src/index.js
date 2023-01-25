import { Provider as ProviderStore} from 'components/Store';
import News from 'pages/News/News';
import React from 'react';
import { SnackbarProvider } from 'notistack';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GlobalStyles from './globalStyles';
import Layout from './layouts/Layout';
import SignIn from './pages/SignIn/SignIn';
import Main from 'pages/Main';
import Navbar from 'components/Navbar';
import Create from 'pages/Create';
import Profile from 'pages/Profile';
import Item from 'pages/News/Item';
import Following from 'pages/Following';
import ChatPage from 'pages/Chat'


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.Fragment>
    <ProviderStore>
      <SnackbarProvider>
        <BrowserRouter>
        <Navbar />
          <Routes>
            <Route
              path=''
              element={<Layout />}>
              <Route
                path='/'
                element={<Main />}/>
              
              <Route
                path='news'>
                  <Route index element={<News />} />
                  <Route path=':slug' element={<Item />} />
              </Route>
              <Route
                path='create'
                element={<Create />} />
              <Route
                path='/chat'
                element={<ChatPage />} />
              <Route
                path='profile'>
                  <Route index element={<Profile />}/>
                  <Route path=':username' element={<Following />}/>
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </SnackbarProvider>
    </ProviderStore>
    <GlobalStyles />
  </React.Fragment>
);