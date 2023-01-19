import Typography from '@mui/material/Typography';

interface HeaderProps {
  text: string;
}

function Header({ text }: HeaderProps) {
  return (
    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
      {text}
    </Typography>
  );
}

export default Header;
