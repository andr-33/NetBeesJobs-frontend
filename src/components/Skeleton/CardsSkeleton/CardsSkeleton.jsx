import {
    Grid2 as Grid,
    Skeleton
} from '@mui/material';

const CardsSkeleton = ({length, height, size}) => {
    return (
        <Grid container spacing={2} mt={2}>
            {Array.from({ length: length }).map((_, index) => (
                <Grid key={index} size={size}>
                    <Skeleton
                        variant="rectangular"
                        height={height}
                        sx={{
                            borderRadius: '16px'
                        }}
                    />
                </Grid>
            ))}
        </Grid>
    );
};

export default CardsSkeleton;