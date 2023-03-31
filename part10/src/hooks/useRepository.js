import { useQuery } from '@apollo/client';

import { GET_REPOSITORY } from '../graphql/queries';

const useRepositories = (variables) => {
  const { data, error, loading, refetch, fetchMore, result } = useQuery(GET_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables,
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return {
    repository: data?.repository,
    error,
    loading,
    refetch,
    fetchMore: handleFetchMore,
    ...result,
  };
};

export default useRepositories;