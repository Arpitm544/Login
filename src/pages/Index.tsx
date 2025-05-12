
import { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import AuthLayout from "@/components/auth/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

type AuthView = "login" | "register" | "forgot-password";

const Index = () => {
  const [view, setView] = useState<AuthView>("login");
  const [token, setToken] = useState<string | null>(localStorage.getItem("authToken"));

  if (token) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <AuthLayout>
      {view === "login" && (
        <LoginForm
          onSuccess={(token) => {
            localStorage.setItem("authToken", token);
            setToken(token);
          }}
          onRegisterClick={() => setView("register")}
          onForgotPasswordClick={() => setView("forgot-password")}
        />
      )}
      
      {view === "register" && (
        <RegisterForm
          onSuccess={(token) => {
            localStorage.setItem("authToken", token);
            setToken(token);
          }}
          onLoginClick={() => setView("login")}
        />
      )}
      
      {view === "forgot-password" && (
        <ForgotPasswordForm
          onBackToLoginClick={() => setView("login")}
          onSuccess={() => setView("login")}
        />
      )}
    </AuthLayout>
  );
};

export default Index;
