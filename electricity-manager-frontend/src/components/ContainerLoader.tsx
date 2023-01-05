import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

interface ContainerLoaderProps {
  amount?: number;
}

function ContainerLoader({ amount = 3 }: ContainerLoaderProps) {
  const renderLoader = () => {
    return (
      <Stack spacing={1}>
        {Array.from(Array(amount)).map((_x, index) => (
          <Skeleton key={index} variant="rectangular" height={60} />
        ))}
      </Stack>
    );
  };
  return renderLoader();
}

export default ContainerLoader;
