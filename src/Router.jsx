import { Route, Routes } from "react-router-dom";
import { Home, NotFound, Login, Register } from "./pages";
import { LayoutDefault, ProtectedRoute } from "./layouts";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<LayoutDefault />}>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export { Router };
