import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/login/login";
import Signup from "./pages/signup/signup";
import CreateForm from "./pages/forms/createForm/createForm";
import Myforms from "./pages/forms/Myforms/myforms";
import Landingpage from "./pages/landingpage/landingpage"; 
import { AuthProvider } from "./utils/AuthProvider";
import GuestAccess from "./layout/GuestAccess"; 
import Layout from "./layout/layout"; 
import axios from "axios";

axios.defaults.withCredentials = true;

const App = () => {
  return (
    <></>
    // <AuthProvider>
    //   <BrowserRouter>
    //     <Routes>
    //       {/* Routes accessibles uniquement aux invités */}
    //       <Route path="/login" element={<GuestAccess><Login /></GuestAccess>} />
    //       <Route path="/register" element={<GuestAccess><Signup /></GuestAccess>} />
          
    //       {/* Routes protégées après connexion */}
    //       {/* <Route path="/" element={<Layout />}>
    //          <Route path="home" element={<Landingpage />} />
    //          <Route path="forms" element={<Myforms />} />
    //          <Route path="add" element={<CreateForm />} />
    //       </Route>
    //        */}
    //       {/* Redirection pour les chemins non trouvés */}
    //       <Route path="*" element={<Landingpage />} />
    //     </Routes>
    //   </BrowserRouter>
    // </AuthProvider>
  );
};

export default App;
