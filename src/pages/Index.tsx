
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redireciona para a página de login quando o usuário acessa a raiz
    navigate("/");
  }, [navigate]);
  
  return null;
};

export default Index;
