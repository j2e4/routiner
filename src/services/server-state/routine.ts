import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getFetch, postFetch } from 'src/services/fetch';
import { Routine } from 'types/routine';

export const getRoutines = () => {
  return getFetch('/routine', {
    next: {
      tags: ['routines'],
    },
  });
};

type UpdateRoutineCheckParams = {
  id: string;
  check: number;
};

const updateRoutineCheck = async ({ id, check }: UpdateRoutineCheckParams) => {
  const response = await postFetch('/history', {
    routineId: id,
    routineCheck: check,
  });
  if (!response.ok) throw new Error();
};

export const useRoutines = () => {
  return useQuery<Routine[]>({
    queryKey: ['routines'],
    queryFn: getRoutines,
  });
};

export const useUpdateRoutineCheck = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateRoutineCheck,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['routine_tabs'],
      });
    },
  });
};
