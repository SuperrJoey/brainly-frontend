import Dashboard from "./pages/dashboard"
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Shared } from "./pages/Shared"

function App() {
  return <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/signin" element={<Signin/>}/>
      <Route path="/home" element={<Dashboard/>}/>
      <Route path="/api/v1/brain/:shareId" element={<Shared/>}/>
    </Routes>
  </BrowserRouter>
}

export default App;