import { m } from 'framer-motion';
// @mui
import { Button, Typography, TextField, Stack } from '@mui/material';
//
import { varFade, MotionViewport } from '../../components/animate';

// ----------------------------------------------------------------------

export default function FaqsForm() {
  return (
    <Stack component={MotionViewport} spacing={3}>
      <m.div variants={varFade().inUp}>
        <Typography variant="h4">Не нашли ответ?</Typography>
      </m.div>

      <m.div variants={varFade().inUp}>
        <TextField fullWidth label="Имя" />
      </m.div>

      <m.div variants={varFade().inUp}>
        <TextField fullWidth label="Электронная почта" />
      </m.div>

      <m.div variants={varFade().inUp}>
        <TextField fullWidth label="Тема" />
      </m.div>

      <m.div variants={varFade().inUp}>
        <TextField fullWidth label="Ваше сообщение." multiline rows={4} />
      </m.div>

      <m.div variants={varFade().inUp}>
        <Button size="large" variant="contained">
          Отправить
        </Button>
      </m.div>
    </Stack>
  );
}
