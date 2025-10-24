import React from "react";
import AppRoutes from "./routes/index";
import { Toaster } from "react-hot-toast";

function App() {
  return (
  <>
  <AppRoutes />
  <Toaster position="top-right" reverseOrder={false} />
  </>
  )
}

export default App;