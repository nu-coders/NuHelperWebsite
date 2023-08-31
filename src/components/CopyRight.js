import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
export default function Copyright(props) {
  return (
    <Typography variant='body2' color='text.secondary' align='center' {...props}>
      {'Copyright © '}
      <Link color='inherit' href='https://nucoders.dev'>
        NuHelper by NuCoders
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
      <br />
      {'Version 1.0.5'}
    </Typography>
  );
}
