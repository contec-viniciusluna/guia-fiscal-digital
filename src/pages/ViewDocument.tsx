
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DocumentViewer } from "@/components/DocumentViewer";
import Navbar from "@/components/Navbar";
import { Document } from "@/components/DocumentCard";
import { toast } from "sonner";

// Combinação dos documentos mock para a página de visualização
const allMockDocuments: Document[] = [
  {
    id: "1",
    title: "DARF IRPJ",
    type: "Imposto Federal",
    dueDate: "2025-05-20",
    amount: 1250.75,
    viewed: true,
    paid: false
  },
  {
    id: "2",
    title: "ICMS - Abril 2025",
    type: "Imposto Estadual",
    dueDate: "2025-05-10",
    amount: 3420.92,
    viewed: false,
    paid: false
  },
  {
    id: "3",
    title: "ISS - Abril 2025",
    type: "Imposto Municipal",
    dueDate: "2025-05-15",
    amount: 875.40,
    viewed: false,
    paid: false
  },
  {
    id: "4",
    title: "FGTS - Abril 2025",
    type: "Encargo Trabalhista",
    dueDate: "2025-05-07",
    amount: 1985.62,
    viewed: true,
    paid: false
  },
  {
    id: "5",
    title: "PIS/COFINS",
    type: "Imposto Federal",
    dueDate: "2025-05-25",
    amount: 2340.15,
    viewed: false,
    paid: false
  },
  {
    id: "6",
    title: "DARF IRPJ - Março 2025",
    type: "Imposto Federal",
    dueDate: "2025-04-20",
    amount: 1180.50,
    viewed: true,
    paid: true
  },
  {
    id: "7",
    title: "ICMS - Março 2025",
    type: "Imposto Estadual",
    dueDate: "2025-04-10",
    amount: 3150.75,
    viewed: true,
    paid: true
  },
  {
    id: "8",
    title: "ISS - Março 2025",
    type: "Imposto Municipal",
    dueDate: "2025-04-15",
    amount: 820.30,
    viewed: true,
    paid: true
  }
];

export default function ViewDocument() {
  const { id } = useParams<{ id: string }>();
  const [document, setDocument] = useState<Document | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      navigate("/");
      return;
    }

    // Simula uma chamada de API para buscar o documento específico
    const fetchDocument = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 800));
        const foundDocument = allMockDocuments.find(doc => doc.id === id);
        
        if (foundDocument) {
          setDocument(foundDocument);
        } else {
          toast.error("Documento não encontrado");
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Erro ao carregar documento:", error);
        toast.error("Erro ao carregar documento");
      } finally {
        setLoading(false);
      }
    };

    fetchDocument();
  }, [id, navigate]);

  const handleMarkViewed = (docId: string) => {
    setDocument(prev => 
      prev ? { ...prev, viewed: true } : null
    );
    // Em uma aplicação real, você chamaria a API para atualizar no backend
  };

  const handleMarkAsPaid = (docId: string) => {
    // Atualiza o estado local
    setDocument(prev => 
      prev ? { ...prev, paid: true } : null
    );
    
    // Em uma aplicação real, você chamaria a API para atualizar no backend
    // Após a operação, você pode redirecionar para a página de documentos pagos
    setTimeout(() => {
      navigate("/pagos");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="page-container">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="mb-2"
            >
              &larr; Voltar
            </Button>
            <h1 className="text-2xl font-bold">Visualizar Documento</h1>
          </div>
        </div>

        {loading ? (
          <div className="space-y-4">
            <div className="h-12 bg-gray-200 animate-pulse rounded-lg w-3/4"></div>
            <div className="h-64 bg-gray-200 animate-pulse rounded-lg"></div>
          </div>
        ) : document ? (
          <DocumentViewer 
            document={document}
            onMarkViewed={handleMarkViewed}
            onMarkAsPaid={!document.paid ? handleMarkAsPaid : undefined}
          />
        ) : (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold">Documento não encontrado</h2>
            <p className="mt-2 text-muted-foreground">O documento solicitado não existe ou foi removido.</p>
          </div>
        )}
      </main>
    </div>
  );
}
