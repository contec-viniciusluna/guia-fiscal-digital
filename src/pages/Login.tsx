
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "@/components/AuthForm";

export default function Login() {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Verifica se o usuário já está autenticado
    const token = localStorage.getItem("userToken");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold logo-text">Guia Fiscal Digital</h1>
        <p className="mt-2 text-gray-600">Gerencie seus documentos fiscais de forma simples e eficiente</p>
      </div>
      <AuthForm />
      <div className="mt-4 text-center text-sm text-gray-500">
        <p>Para fins de demonstração, use:</p>
        <p>Email: usuario@teste.com | Senha: senha123</p>
      </div>
    </div>
  );
}
