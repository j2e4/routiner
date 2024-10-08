import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import PlanForm, { PlanFieldValues } from 'src/app/plan/form';
import { getCategories } from 'src/services/server-state/category';
import { createRoutine } from 'src/services/server-state/routine';

export default async function PlanNewPage() {
  const queryClient = new QueryClient();
  await queryClient.fetchQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  async function create(formData: PlanFieldValues) {
    'use server';

    await createRoutine({
      name: formData.routineName,
      repeatDays: formData.repeatDays.map(Number),
      categoryId: formData.categoryId,
    });
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PlanForm action={create} />
    </HydrationBoundary>
  );
}
