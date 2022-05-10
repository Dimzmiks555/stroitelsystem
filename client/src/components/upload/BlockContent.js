// @mui
import { Box, Typography, Stack } from '@mui/material';
// assets
import { UploadIllustration } from '../../assets';

// ----------------------------------------------------------------------

export default function BlockContent() {
  return (
    <Stack
      spacing={2}
      alignItems="center"
      justifyContent="center"
      direction={{ xs: 'column', md: 'row' }}
      sx={{ width: 1, textAlign: { xs: 'center', md: 'left' } }}
    >
      {/* <UploadIllustration sx={{ width: 'auto' }} /> */}

      <Box sx={{ p: 0 }}>
        <Typography gutterBottom variant="h5">
          Выберите файл
        </Typography>

        {/* <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Перетащите файлы сюда.
        </Typography> */}
      </Box>
    </Stack>
  );
}
