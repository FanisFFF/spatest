import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage/login-page.component";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { FC, ReactNode } from "react";
import RegisterPage from "./pages/RegisterPage/register-page.component";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import HomePage from "./pages/HomePage/home.component";
import SearchPage from "./pages/SearchPage/SearchPage";
import Layout from "./pages/Layout/Layout";
interface Props {
  children: ReactNode;
}
const App: FC = () => {
  const queryClient = new QueryClient();
  return (
    <>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          {/* <ReactQueryDevtools initialIsOpen={false} /> */}
          <BrowserRouter>
            <Routes>
              <Route path="/register" element={<RegisterPage />}></Route>
              {/* <Route path="*" element={<Navigate to="/login" />} /> */}
              <Route
                path="/login"
                element={
                  <RedirectRoute>
                    <LoginPage />
                  </RedirectRoute>
                }
              />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Layout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<HomePage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/:username" element={<ProfilePage />} />
              </Route>

              {/* <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <HomePage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/profile/:username"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/search/"
                element={
                  <ProtectedRoute>
                    <SearchPage />
                  </ProtectedRoute>
                }
              /> */}
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </AuthProvider>
    </>
  );
};
const RedirectRoute: FC<Props> = ({ children }) => {
  const { token } = useAuth();
  return token ? <Navigate to="/home" /> : <>{children}</>;
};
const ProtectedRoute: FC<Props> = ({ children }) => {
  const { token } = useAuth();
  return token ? <>{children}</> : <Navigate to="/login" />;
};
export default App;
