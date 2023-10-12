import { Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Account from "./pages/Account";
import ProtectedRoute from "./pages/ProtectedRoute";
import Detail from "./pages/Detail";

function App() {
  return (
    <>
        <AuthContextProvider>
            <Navbar/>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<SignUp />} />
                <Route path='/account' element={<ProtectedRoute><Account /></ProtectedRoute>} />
                <Route path='/:id' element={<Detail />} />
            </Routes>
        </AuthContextProvider>
    </>
  );
}

export default App;
