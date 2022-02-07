// routes
import { PATH_AUTH, PATH_DOCS, PATH_PAGE } from '../../routes/paths';
// components
import { PATH_AFTER_LOGIN } from '../../config';
// components
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const ICON_SIZE = {
  width: 22,
  height: 22,
};

const menuConfig = [
  {
    title: 'Главная',
    icon: <Iconify icon={'eva:home-fill'} {...ICON_SIZE} />,
    path: '/',
  },
  {
    title: 'Компоненты',
    icon: <Iconify icon={'ic:round-grain'} {...ICON_SIZE} />,
    path: PATH_PAGE.components,
  },
  {
    title: 'Страницы',
    path: '/pages',
    icon: <Iconify icon={'eva:file-fill'} {...ICON_SIZE} />,
    children: [
      {
        subheader: 'Другие страницы',
        items: [
          { title: 'О нас', path: PATH_PAGE.about },
          { title: 'Связаться с нами', path: PATH_PAGE.contact },
          { title: 'FAQ', path: PATH_PAGE.faqs },
          { title: 'Тарифы', path: PATH_PAGE.pricing },
          { title: 'Оплата', path: PATH_PAGE.payment },
          { title: 'Технические работы', path: PATH_PAGE.maintenance },
          { title: 'Скоро', path: PATH_PAGE.comingSoon },
        ],
      },
      {
        subheader: 'Аутентификация',
        items: [
          { title: 'Логин', path: PATH_AUTH.loginUnprotected },
          { title: 'Регистрация', path: PATH_AUTH.registerUnprotected },
          { title: 'Сброс пароля', path: PATH_AUTH.resetPassword },
          { title: 'Проверочный код', path: PATH_AUTH.verify },
        ],
      },
      {
        subheader: 'Ошибки',
        items: [
          { title: 'Страница 404', path: PATH_PAGE.page404 },
          { title: 'Страница 500', path: PATH_PAGE.page500 },
        ],
      },
      {
        subheader: 'Панель управления',
        items: [{ title: 'Dashboard', path: PATH_AFTER_LOGIN }],
      },
    ],
  },
  {
    title: 'Документация',
    icon: <Iconify icon={'eva:book-open-fill'} {...ICON_SIZE} />,
    path: PATH_DOCS,
  },
];

export default menuConfig;
