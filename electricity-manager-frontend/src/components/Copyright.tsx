import Typography from '@mui/material/Typography';

function Copyright() {
  return (
    <Typography
      sx={{ pt: 4 }}
      variant="body2"
      color="text.secondary"
      align="center"
    >
      {'Copyright © Olli Brummer '}
      {new Date().getFullYear()}.
    </Typography>
  );
}

export default Copyright;
