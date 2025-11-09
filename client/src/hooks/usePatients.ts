import { useQuery, useMutation } from "@tanstack/react-query";
import { getAllPatients, createPatient, updatePatient, getPatient, Patient } from "@/lib/firebase";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export function usePatients() {
  const { toast } = useToast();

  const query = useQuery({
    queryKey: ["/api/patients"],
    queryFn: getAllPatients,
  });

  const createMutation = useMutation({
    mutationFn: createPatient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/patients"] });
      toast({
        title: "Success",
        description: "Patient registered successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to register patient",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Patient> }) =>
      updatePatient(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/patients"] });
      toast({
        title: "Success",
        description: "Patient updated successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update patient",
        variant: "destructive",
      });
    },
  });

  return {
    patients: query.data || [],
    isLoading: query.isLoading,
    error: query.error,
    createPatient: createMutation.mutate,
    updatePatient: updateMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
  };
}

export function usePatient(id: string) {
  return useQuery({
    queryKey: ["/api/patients", id],
    queryFn: () => getPatient(id),
    enabled: !!id,
  });
}
