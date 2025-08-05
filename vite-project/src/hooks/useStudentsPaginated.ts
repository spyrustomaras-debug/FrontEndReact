import { useInfiniteQuery } from '@tanstack/react-query';

type Student = {
  id: number;
  name: string;
};

type PaginatedResponse<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

export const useStudentsPaginated = () => {
  return useInfiniteQuery<PaginatedResponse<Student>, Error>({
    queryKey: ['students'],
    initialPageParam: 1, // ✅ Add this line
    queryFn: async ({ pageParam = 1 }) => {
      const res = await fetch(`http://localhost:8000/api/students/?page=${pageParam}`);
      if (!res.ok) throw new Error('Failed to fetch students');
      return res.json();
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage.next) return undefined;
      const url = new URL(lastPage.next);
      const nextPage = url.searchParams.get('page');
      return nextPage ? parseInt(nextPage, 10) : undefined;
    }
  });
};
