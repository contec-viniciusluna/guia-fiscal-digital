
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function Navbar() {
  const [email, setEmail] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    setEmail(userEmail);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userEmail");
    toast.success("Logout realizado com sucesso");
    navigate("/");
  };

  // Verifica se o usuário está logado
  if (!email) {
    return null;
  }

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/dashboard" className="flex items-center">
                <h1 className="text-xl font-bold logo-text ml-2">Guia Fiscal Digital</h1>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/dashboard"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  location.pathname === "/dashboard"
                    ? "border-fiscal text-gray-900"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }`}
              >
                Pendentes
              </Link>
              <Link
                to="/pagos"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  location.pathname === "/pagos"
                    ? "border-fiscal text-gray-900"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }`}
              >
                Pagos
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="mr-4 text-sm text-gray-500">{email}</span>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="ml-2"
              >
                Sair
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
