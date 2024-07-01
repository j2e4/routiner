import Link from 'next/link';
import Plans from 'src/components/organisms/Plans';
import { getRoutines } from 'src/services/server-state/routine';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

async function PlanPage() {
  const queryClient = new QueryClient();
  await queryClient.fetchQuery({
    queryKey: ['routines'],
    queryFn: getRoutines,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Plans />
      <div className="py-5 text-center">
        <Link href="/plan/new" className="btn btn-md btn-secondary">
          새 루틴 추가하기
        </Link>
      </div>
    </HydrationBoundary>
  );
}

export default PlanPage;
