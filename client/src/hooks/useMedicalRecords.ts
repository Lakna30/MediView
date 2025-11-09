import { useQuery, useMutation } from "@tanstack/react-query";
import {
  getMedicalRecords,
  createMedicalRecord,
  MedicalRecord,
} from "@/lib/firebase";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export function useMedicalRecords(patientId: string) {
  const { toast } = useToast();

  const query = useQuery({
    queryKey: ["/api/medical-records", patientId],
    queryFn: () => getMedicalRecords(patientId),
    enabled: !!patientId,
  });

  const createMutation = useMutation({
    mutationFn: createMedicalRecord,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/medical-records"] });
      toast({
        title: "Success",
        description: "Medical record created successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create medical record",
        variant: "destructive",
      });
    },
  });

  return {
    records: query.data || [],
    isLoading: query.isLoading,
    error: query.error,
    createRecord: createMutation.mutate,
    isCreating: createMutation.isPending,
  };
}
