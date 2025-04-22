import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchUsers } from "../services/users";
import { User } from "../types";

export function useUsers(){
    const {
        isLoading,
        isError,
        data,
        refetch,
        fetchNextPage,
        isFetchingNextPage,
        hasNextPage,
        
        } = useInfiniteQuery<{ nextCursor: number, users: User[] }>({
        queryKey: ['users'],
        queryFn: (pageParam) => fetchUsers(pageParam),
        getNextPageParam: (lastPage) => lastPage?.nextCursor ?? undefined,
        initialPageParam: 0,
        maxPages: 2,
        refetchOnWindowFocus: false,
    });

    const users: User[] = data?.pages?.flatMap(page => page.users) ?? []
    
    return{
        isLoading,
        isError,
        users,
        refetch,
        fetchNextPage,
        isFetchingNextPage,
        hasNextPage,
    }
}