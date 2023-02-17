import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer'
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup';
import { AuthProvider } from './context/auth/authContext';
import { PostProvider } from './context/post/postContext'
import PrivateRoute from './protected/PrivateRoute';
import PublicRoute from './protected/PublicRoute';
import CreatePost from './components/CreatePost';
import Profile from './components/Profile';
import { ToastContainer } from 'react-toastify';
import Bookmarks from './components/Bookmarks';

function App() {
  return (
    <div className="App">
      <AuthProvider>
      <PostProvider>
      <BrowserRouter>
 
          <Navbar />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <Footer />
          <Routes>
            <Route path="/login" element={
            <PublicRoute>
              <Login />
            </PublicRoute> } />
            <Route path="/signup" element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
            } />
            <Route path="/"
              element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>}
            />

            <Route path="/createpost"
              element={
              <PrivateRoute>
                <CreatePost />
              </PrivateRoute>}
            />

            <Route path="/profile"
              element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>}
            />

            <Route path="/bookmarks"
              element={
              <PrivateRoute>
                <Bookmarks />
              </PrivateRoute>}
            />

          </Routes>
        </BrowserRouter>
        </PostProvider>

      </AuthProvider>
    </div>
  );
}

export default App;
