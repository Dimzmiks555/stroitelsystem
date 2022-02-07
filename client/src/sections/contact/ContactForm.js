import { m } from 'framer-motion';
// @mui
import { Button, Typography, TextField, Stack } from '@mui/material';
// components
import { MotionViewport, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

export default function ContactForm() {
  return (
    <Stack component={MotionViewport} spacing={5}>
      <m.div variants={varFade().inUp}>
        <Typography variant="h3">
          Свободно свяжитесь с нами. <br />
          Мы будем рады Вас выслушать.
        </Typography>
      </m.div>

      <Stack spacing={3}>
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
          <TextField fullWidth label="Введите сообщение." multiline rows={4} />
        </m.div>
      </Stack>

      <m.div variants={varFade().inUp}>
        <Button size="large" variant="contained">
          Отправить
        </Button>
      </m.div>
    </Stack>
  );
}
