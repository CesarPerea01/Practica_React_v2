
export const fetchUsers = async ({ pageParam = 1 }: { pageParam?: any }) => {
    const response = await fetch(`https://randomuser.me/api?results=10&seed=juanchi&page=${pageParam}`);
    if (!response.ok) throw new Error('Error en la peticion');
    const data = await response.json();
  
    const currentPage = data.info.page
    const nextCursor = currentPage > 1 ? undefined : currentPage + 1
    return ({
      users: data.results,
      nextCursor
    });
  }