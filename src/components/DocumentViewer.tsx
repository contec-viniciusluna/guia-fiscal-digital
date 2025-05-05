
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Document } from "./DocumentCard";

interface DocumentViewerProps {
  document: Document;
  onMarkViewed: (id: string) => void;
  onMarkAsPaid?: (id: string) => void;
}

export function DocumentViewer({ document, onMarkViewed, onMarkAsPaid }: DocumentViewerProps) {
  useEffect(() => {
    // Marca o documento como visualizado quando o componente é montado
    if (!document.viewed) {
      onMarkViewed(document.id);
    }
  }, [document.id, document.viewed, onMarkViewed]);

  const formattedDate = new Date(document.dueDate).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
  
  const formattedAmount = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(document.amount);

  const handleMarkAsPaid = () => {
    if (onMarkAsPaid) {
      onMarkAsPaid(document.id);
      toast.success(`Documento "${document.title}" marcado como pago`);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>{document.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-muted-foreground">Tipo</p>
              <p>{document.type}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Vencimento</p>
              <p>{formattedDate}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Valor</p>
              <p className="text-lg font-bold">{formattedAmount}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <p>
                {document.paid ? (
                  <span className="text-green-600 font-medium">Pago</span>
                ) : (
                  <span className="text-yellow-600 font-medium">Pendente</span>
                )}
              </p>
            </div>
          </div>
        </CardContent>
        {!document.paid && onMarkAsPaid && (
          <CardFooter>
            <Button 
              onClick={handleMarkAsPaid}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Marcar como pago
            </Button>
          </CardFooter>
        )}
      </Card>

      {/* Visualizador de PDF simulado */}
      <Card>
        <CardContent className="p-6">
          <div className="bg-gray-100 h-[500px] flex items-center justify-center rounded-lg border border-dashed">
            <div className="text-center">
              <h3 className="font-medium text-lg mb-2">Visualizador de PDF</h3>
              <p className="text-muted-foreground">
                Aqui será exibido o documento PDF quando integrado com seu backend.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default DocumentViewer;
