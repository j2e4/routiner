'use client';

import { useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import Badge from 'src/components/badge';
import Button from 'src/components/button';
import Form from 'src/components/form';
import Toast from 'src/components/toast';
import { useRefs } from 'src/hooks/useRefs';
import { useCategories } from 'src/services/server-state/category';
import { Routine } from 'src/services/server-state/routine';

export type PlanFieldValues = {
  categoryId: string;
  repeatDays: string[];
  routineName: string;
};
interface PlanFormProps {
  action: SubmitHandler<PlanFieldValues>;
  routine?: Routine;
}

function PlanForm({ action, routine }: PlanFormProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<PlanFieldValues>({
    defaultValues: {
      categoryId: routine?.category.id ?? '',
      repeatDays: routine?.repeatDays.map(String) ?? [],
      routineName: routine?.name ?? '',
    },
  });
  const qc = useQueryClient();
  const onSubmit: SubmitHandler<PlanFieldValues> = async (plan) => {
    await action(plan);
    await qc.invalidateQueries({
      queryKey: ['routines'],
    });
    await qc.invalidateQueries({
      queryKey: ['routine_tabs'],
    });
    router.back();
    // TODO pending 처리
    // TODO 에러 처리, 지금은 아무 동작하지 않는다.
  };
  const { getRef, setRef } = useRefs();

  const categoriesQuery = useCategories();
  const categories = categoriesQuery.data ?? [];

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <fieldset>
        <Form.Legend ref={(node) => setRef('category', node)}>
          루틴 카테고리
        </Form.Legend>
        <div className="mt-4 space-y-4">
          {categories.length === 0 && (
            <div className="flex flex-col items-center justify-center gap-3">
              <div className="text-center text-sm tracking-tight text-gray-800">
                <p>등록한 카테고리가 없어요.</p>
                <p>먼저 카테고리를 등록해주세요.</p>
              </div>
              <div>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => {
                    router.push('/category/new');
                  }}
                >
                  카테고리 등록하러 가기
                </Button>
              </div>
            </div>
          )}
          {categories.map(({ id, name, theme }) => (
            <div key={id} className="flex items-center gap-x-3">
              <Form.InputRadio
                id={id}
                value={id}
                {...register('categoryId', { required: true })}
              />
              <Form.Label htmlFor={id}>
                <Badge variant={theme}>{name}</Badge>
              </Form.Label>
            </div>
          ))}
        </div>
        <Toast
          show={errors.categoryId !== undefined}
          variant="error"
          options={{
            placement: 'right',
            reference: getRef('category'),
          }}
        >
          하나 이상 선택해야 해요.
        </Toast>
      </fieldset>
      <fieldset>
        <Form.Legend ref={(node) => setRef('days', node)}>
          루틴을 반복할 요일
        </Form.Legend>
        <div className="mt-4 grid grid-cols-4 gap-x-6 gap-y-4 sm:grid-cols-7">
          {[
            { key: 'sun', label: '일', value: 7 },
            { key: 'mon', label: '월', value: 1 },
            { key: 'tue', label: '화', value: 2 },
            { key: 'wed', label: '수', value: 3 },
            { key: 'thu', label: '목', value: 4 },
            { key: 'fri', label: '금', value: 5 },
            { key: 'sat', label: '토', value: 6 },
          ].map(({ key, label, value }) => (
            <div key={key} className="flex items-center gap-x-3">
              <Form.InputCheckbox
                id={key}
                value={value}
                {...register('repeatDays', { required: true })}
              />
              <Form.Label htmlFor={key}>{label}</Form.Label>
            </div>
          ))}
          <Toast
            show={errors.repeatDays !== undefined}
            variant="error"
            options={{
              placement: 'right',
              reference: getRef('days'),
            }}
          >
            하나 이상 선택해야 해요.
          </Toast>
        </div>
      </fieldset>
      <div>
        <Form.Label htmlFor="routineName" ref={(node) => setRef('name', node)}>
          실천할 내용
        </Form.Label>
        <Form.InputText
          id="routineName"
          placeholder="자기 전에 일기 쓰기"
          className="mt-4"
          {...register('routineName', { required: true })}
        />
        <Toast
          show={errors.routineName !== undefined}
          variant="error"
          options={{
            placement: 'right',
            reference: getRef('name'),
          }}
        >
          빈 값일 수 없어요.
        </Toast>
      </div>
      <div
        className={clsx(
          'absolute bottom-0 left-0 right-0 h-20 px-6',
          'flex items-center justify-end gap-x-6 border-t border-gray-900/10',
        )}
      >
        <Button
          size="md"
          variant="secondary"
          onClick={() => {
            router.back();
          }}
        >
          취소
        </Button>
        <Button
          type="submit"
          variant="primary"
          size="md"
          onClick={() => {
            if (categories.length === 0)
              setError('categoryId', { type: 'required' });
          }}
        >
          저장
        </Button>
      </div>
      {/* form footer가 form content를 가리지 않도록 여백을 넣어준다. */}
      <div className="h-20" aria-hidden="true" />
    </Form>
  );
}

export default PlanForm;
