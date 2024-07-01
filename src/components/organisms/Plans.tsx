'use client';

import Link from 'next/link';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import Badge from 'src/components/badge';
import List from 'src/components/list';
import { useRoutines } from 'src/services/server-state/routine';

function Plans() {
  const { data: routines = [] } = useRoutines();

  return (
    <List border="b">
      {routines.length === 0 && (
        <List.Item>
          <List.ItemBody className="text-center">
            <List.ItemBodyText>등록한 루틴이 없어요.</List.ItemBodyText>
          </List.ItemBody>
        </List.Item>
      )}
      {routines.map(({ category, ...routine }) => (
        <List.Item key={routine.id} hoverable>
          <List.ItemBody>
            {({ Filler }) => (
              <>
                <Badge variant={category.theme}>{category.name}</Badge>
                <List.ItemBodyText
                  as={Link}
                  href={`/plan/${routine.id}`}
                  className="mt-1 block"
                >
                  {routine.name}
                  <Filler />
                </List.ItemBodyText>
              </>
            )}
          </List.ItemBody>
          <List.ItemTail className="inline-flex items-center">
            <ChevronRightIcon className="h-5 w-5 text-gray-400" />
          </List.ItemTail>
        </List.Item>
      ))}
    </List>
  );
}

export default Plans;
