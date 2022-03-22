// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Label from '../../../components/Label';
import SvgIconStyle from '../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name) => <SvgIconStyle src={`/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  kanban: getIcon('ic_kanban'),
  banking: getIcon('ic_banking'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  booking: getIcon('ic_booking'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'Основное',
    items: [
      {
        title: 'Главная',
        path: PATH_DASHBOARD.general.app,
        icon: ICONS.dashboard,
      },
      // { title: 'Интернет-магазин', path: PATH_DASHBOARD.general.ecommerce, icon: ICONS.ecommerce },
      // { title: 'Аналитика', path: PATH_DASHBOARD.general.analytics, icon: ICONS.analytics },
      // { title: 'Банк', path: PATH_DASHBOARD.general.banking, icon: ICONS.banking },
      // { title: 'Бронирование', path: PATH_DASHBOARD.general.booking, icon: ICONS.booking },
    ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'Управление',
    items: [
      // MANAGEMENT : USER
      // {
      //   title: 'Пользователь',
      //   path: PATH_DASHBOARD.user.root,
      //   icon: ICONS.user,
      //   children: [
      //     { title: 'Профиль', path: PATH_DASHBOARD.user.profile },
      //     { title: 'Карточки', path: PATH_DASHBOARD.user.cards },
      //     { title: 'Список', path: PATH_DASHBOARD.user.list },
      //     { title: 'Создание', path: PATH_DASHBOARD.user.newUser },
      //     { title: 'Редактирование', path: PATH_DASHBOARD.user.editById },
      //     { title: 'Аккаунт', path: PATH_DASHBOARD.user.account },
      //   ],
      // },
      {
        title: 'Учёт',
        path: PATH_DASHBOARD.note.list,
        icon: ICONS.analytics,
        children: [
          { title: 'Записи', path: PATH_DASHBOARD.note.list },
          { title: 'Отчёты', path: PATH_DASHBOARD.eCommerce.shop },
          { title: 'Списания', path: PATH_DASHBOARD.checkouts.list },
        ],
      },
      {
        title: 'Тендеры',
        path: PATH_DASHBOARD.tenders.list,
        icon: ICONS.cart,
          children: [
            { title: 'Тендеры', path: PATH_DASHBOARD.tenders.list },
            { title: 'Поиск', path: PATH_DASHBOARD.eCommerce.shop },
          ],
      },
      {
        title: 'Заказы',
        path: PATH_DASHBOARD.orders.list,
        icon: ICONS.booking
      },
      {
        title: 'Сделки',
        path: PATH_DASHBOARD.application.list,
        icon: ICONS.ecommerce
      },
      {
        title: 'Документы',
        path: PATH_DASHBOARD.tenders.list,
        icon: ICONS.mail,
          children: [
            { title: 'Входящие', path: PATH_DASHBOARD.tenders.list },
            { title: 'Исходящие', path: PATH_DASHBOARD.eCommerce.shop },
          ],
      },
    

      // MANAGEMENT : E-COMMERCE
      // {
      //   title: 'Интернет-магазин',
      //   path: PATH_DASHBOARD.eCommerce.root,
      //   icon: ICONS.cart,
      //   children: [
      //     { title: 'Магазин', path: PATH_DASHBOARD.eCommerce.shop },
      //     { title: 'Продукт', path: PATH_DASHBOARD.eCommerce.productById },
      //     { title: 'Список', path: PATH_DASHBOARD.eCommerce.list },
      //     { title: 'Создать', path: PATH_DASHBOARD.eCommerce.newProduct },
      //     { title: 'Редактирование', path: PATH_DASHBOARD.eCommerce.editById },
      //     { title: 'Заказ', path: PATH_DASHBOARD.eCommerce.checkout },
      //     { title: 'Счет', path: PATH_DASHBOARD.eCommerce.invoice },
      //   ],
      // },

      // // MANAGEMENT : BLOG
      // {
      //   title: 'Блог',
      //   path: PATH_DASHBOARD.blog.root,
      //   icon: ICONS.blog,
      //   children: [
      //     { title: 'Посты', path: PATH_DASHBOARD.blog.posts },
      //     { title: 'Пост', path: PATH_DASHBOARD.blog.postById },
      //     { title: 'Новый пост', path: PATH_DASHBOARD.blog.newPost },
      //   ],
      // },
    ],
  },

  

  {
    subheader: 'Справочник',
    items: [
      
      {
        title: 'Объекты',
        path: PATH_DASHBOARD.objects.list,
        icon: ICONS.banking
      },
      {
        title: 'Контрагенты',
        path: PATH_DASHBOARD.contragents.list,
        icon: ICONS.user
      },
      {
        title: 'Номенклатура',
        path: PATH_DASHBOARD.nomenklatura.list,
        icon: ICONS.kanban
      },
      { title: 'Реализации', 
        path: PATH_DASHBOARD.realisations.list 
      },
    ],
  },
  // APP
  // ----------------------------------------------------------------------
  // {
  //   subheader: 'Приложения',
  //   items: [
      // {
      //   title: 'Почта',
      //   path: PATH_DASHBOARD.mail.root,
      //   icon: ICONS.mail,
      //   info: (
      //     <Label variant="outlined" color="error">
      //       +32
      //     </Label>
      //   ),
      // },
      // { title: 'Чат', path: PATH_DASHBOARD.chat.root, icon: ICONS.chat },
      // { title: 'Календарь', path: PATH_DASHBOARD.calendar, icon: ICONS.calendar },
      // {
      //   title: 'Канбан',
      //   path: PATH_DASHBOARD.kanban,
      //   icon: ICONS.kanban,
      // },
  //   ],
  // },
];

export default navConfig;