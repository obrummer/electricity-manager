import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

interface ContainerLoaderProps {
  amount?: number;
}

function ContainerLoader({ amount = 3 }: ContainerLoaderProps) {
  const renderLoader = () => {
    return (
      <Stack spacing={1} mt={2} data-testid="container-loader">
        {Array.from(Array(amount)).map((_x, index) => (
          <Skeleton
            key={index}
            variant="rectangular"
            height={60}
            data-testid="skeleton"
          />
        ))}
      </Stack>
    );
  };
  return renderLoader();
}

export default ContainerLoader;
