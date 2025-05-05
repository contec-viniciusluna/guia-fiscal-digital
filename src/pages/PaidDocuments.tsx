
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DocumentCard, { Document } from "@/components/DocumentCard";
import Navbar from "@/components/Navbar";
import { EmptyState } from "@/components/EmptyState";

// Mock de documentos pagos para a demo
const mockPaidDocuments: Document[] = [
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

export default function PaidDocuments() {
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
        // Ordenar por data de vencimento, do mais recente para o mais antigo
        const sortedDocs = [...mockPaidDocuments].sort(
          (a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime()
        );
        setDocuments(sortedDocs);
      } catch (error) {
        console.error("Erro ao carregar documentos pagos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="page-container">
        <header className="mb-8">
          <h1 className="text-2xl font-bold">Documentos Pagos</h1>
          <p className="text-muted-foreground">
            Histórico de documentos já pagos
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
              <DocumentCard key={document.id} document={document} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="Nenhum documento pago"
            description="Você ainda não marcou nenhum documento como pago."
            actionLabel="Ver documentos pendentes"
            actionHref="/dashboard"
          />
        )}
      </main>
    </div>
  );
}
