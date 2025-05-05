
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DocumentCard, { Document } from "@/components/DocumentCard";
import Navbar from "@/components/Navbar";
import { EmptyState } from "@/components/EmptyState";

// Dados simulados para a demo
const mockDocuments: Document[] = [
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
  }
];

export default function Dashboard() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      navigate("/");
      return;
    }

    // Simula uma chamada de API
    const fetchDocuments = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Filtra somente documentos não pagos e ordena por data de vencimento
        const pendingDocs = [...mockDocuments]
          .filter(doc => !doc.paid)
          .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
        
        setDocuments(pendingDocs);
      } catch (error) {
        console.error("Erro ao carregar documentos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, [navigate]);

  const handleMarkAsPaid = (id: string) => {
    // Atualiza o estado local removendo o documento da lista de pendentes
    setDocuments(prevDocs => prevDocs.filter(doc => doc.id !== id));
    
    // Em uma aplicação real, você chamaria a API para atualizar no backend
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="page-container">
        <header className="mb-8">
          <h1 className="text-2xl font-bold">Documentos Pendentes</h1>
          <p className="text-muted-foreground">
            Visualize e gerencie seus documentos fiscais pendentes de pagamento
          </p>
        </header>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 animate-pulse rounded-lg"></div>
            ))}
          </div>
        ) : documents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documents.map(document => (
              <DocumentCard
                key={document.id}
                document={document}
                onMarkAsPaid={handleMarkAsPaid}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="Nenhum documento pendente"
            description="Todos os seus documentos foram pagos."
            actionLabel="Ver documentos pagos"
            actionHref="/pagos"
          />
        )}
      </main>
    </div>
  );
}
