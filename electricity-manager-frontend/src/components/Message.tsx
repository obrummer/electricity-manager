import Typography from '@mui/material/Typography';

interface MessageProps {
  text?: string;
}

function Message({ text = 'Something went wrong' }: MessageProps) {
  return <Typography>{text}</Typography>;
}

export default Message;
