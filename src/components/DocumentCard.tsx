
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export interface Document {
  id: string;
  title: string;
  type: string;
  dueDate: string;
  amount: number;
  viewed: boolean;
  paid: boolean;
}

interface DocumentCardProps {
  document: Document;
  onMarkAsPaid?: (id: string) => void;
}

export function DocumentCard({ document, onMarkAsPaid }: DocumentCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  
  const formattedDate = new Date(document.dueDate).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
  
  const formattedAmount = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(document.amount);
  
  const isOverdue = new Date(document.dueDate) < new Date() && !document.paid;
  
  const handleMarkAsPaid = async () => {
    if (!onMarkAsPaid) return;
    
    setIsLoading(true);
    try {
      // Simula uma chamada de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      onMarkAsPaid(document.id);
      toast.success(`Documento "${document.title}" marcado como pago`);
    } catch (error) {
      toast.error("Erro ao marcar documento como pago");
      console.error("Erro:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Card className={`card-hover ${isOverdue ? 'border-red-400' : ''}`}>
      <CardContent className="p-6">
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-lg">{document.title}</h3>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">{document.type}</span>
            <span className={`font-medium ${isOverdue ? 'text-red-500' : ''}`}>
              Vencimento: {formattedDate}
            </span>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-lg font-bold">{formattedAmount}</span>
            <div className="flex items-center">
              {document.viewed ? (
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  Visualizado
                </span>
              ) : (
                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                  Não visualizado
                </span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between p-6 pt-0">
        <Link 
          to={`/documento/${document.id}`} 
          className="text-fiscal hover:underline text-sm"
        >
          Visualizar documento
        </Link>
        {!document.paid && onMarkAsPaid && (
          <Button 
            onClick={handleMarkAsPaid} 
            disabled={isLoading} 
            size="sm"
            variant="outline"
            className="border-green-500 text-green-600 hover:bg-green-50"
          >
            {isLoading ? "Processando..." : "Marcar como pago"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default DocumentCard;
