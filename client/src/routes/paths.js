// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  register: path(ROOTS_AUTH, '/register'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  verify: path(ROOTS_AUTH, '/verify'),
};

export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page404: '/404',
  page500: '/500',
  components: '/components',
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    app: path(ROOTS_DASHBOARD, '/app'),
    ecommerce: path(ROOTS_DASHBOARD, '/ecommerce'),
    analytics: path(ROOTS_DASHBOARD, '/analytics'),
    banking: path(ROOTS_DASHBOARD, '/banking'),
    booking: path(ROOTS_DASHBOARD, '/booking'),
  },
  mail: {
    root: path(ROOTS_DASHBOARD, '/mail'),
    all: path(ROOTS_DASHBOARD, '/mail/all'),
  },
  chat: {
    root: path(ROOTS_DASHBOARD, '/chat'),
    new: path(ROOTS_DASHBOARD, '/chat/new'),
    conversation: path(ROOTS_DASHBOARD, '/chat/:conversationKey'),
  },
  calendar: path(ROOTS_DASHBOARD, '/calendar'),
  kanban: path(ROOTS_DASHBOARD, '/kanban'),
  user: {
    root: path(ROOTS_DASHBOARD, '/user'),
    profile: path(ROOTS_DASHBOARD, '/user/profile'),
    cards: path(ROOTS_DASHBOARD, '/user/cards'),
    list: path(ROOTS_DASHBOARD, '/user/list'),
    newUser: path(ROOTS_DASHBOARD, '/user/new'),
    editById: path(ROOTS_DASHBOARD, `/user/reece-chung/edit`),
    account: path(ROOTS_DASHBOARD, '/user/account'),
  },
  application: {
    root: path(ROOTS_DASHBOARD, '/application'),
    profile: path(ROOTS_DASHBOARD, '/application/profile'),
    cards: path(ROOTS_DASHBOARD, '/application/cards'),
    list: path(ROOTS_DASHBOARD, '/application/list'),
    newUser: path(ROOTS_DASHBOARD, '/application/new'),
    editById: path(ROOTS_DASHBOARD, `/application/reece-chung/edit`),
    account: path(ROOTS_DASHBOARD, '/application/account'),
  }, 
  deals: {
    root: path(ROOTS_DASHBOARD, '/deals'),
    list: path(ROOTS_DASHBOARD, '/deals/list'),
    new: path(ROOTS_DASHBOARD, '/deals/new'),
  },
  prices: {
    root: path(ROOTS_DASHBOARD, '/prices'),
    list: path(ROOTS_DASHBOARD, '/prices/list'),
    new: path(ROOTS_DASHBOARD, '/prices/new'),
  },
  other_expenses: {
    root: path(ROOTS_DASHBOARD, '/other_expenses'),
    list: path(ROOTS_DASHBOARD, '/other_expenses/list'),
    new: path(ROOTS_DASHBOARD, '/other_expenses/new'),
  },
  main_expenses: {
    root: path(ROOTS_DASHBOARD, '/main_expenses'),
    list: path(ROOTS_DASHBOARD, '/main_expenses/list'),
    new: path(ROOTS_DASHBOARD, '/main_expenses/new'),
  },
  avanses: {
    root: path(ROOTS_DASHBOARD, '/avanses'),
    list: path(ROOTS_DASHBOARD, '/avanses/list'),
    new: path(ROOTS_DASHBOARD, '/avanses/new'),
  },
  orders: {
    root: path(ROOTS_DASHBOARD, '/orders'),
    list: path(ROOTS_DASHBOARD, '/orders/list'),
    newOrder: path(ROOTS_DASHBOARD, '/orders/new'),
  },
  payments: {
    root: path(ROOTS_DASHBOARD, '/payments'),
    list: path(ROOTS_DASHBOARD, '/payments/list'),
    new: path(ROOTS_DASHBOARD, '/payments/new'),
  },
  contragents: {
    root: path(ROOTS_DASHBOARD, '/contragents'),
    list: path(ROOTS_DASHBOARD, '/contragents/list'),
    new: path(ROOTS_DASHBOARD, '/contragents/new'),
    editById: path(ROOTS_DASHBOARD, `/contragents/:id`),
  },
  people: {
    root: path(ROOTS_DASHBOARD, '/people'),
    list: path(ROOTS_DASHBOARD, '/people/list'),
    new: path(ROOTS_DASHBOARD, '/people/new'),
    editById: path(ROOTS_DASHBOARD, `/people/:id`),
  },
  note: {
    root: path(ROOTS_DASHBOARD, '/note'),
    list: path(ROOTS_DASHBOARD, '/note/list'),
    new: path(ROOTS_DASHBOARD, '/note/new'),
  },
  reports: {
    root: path(ROOTS_DASHBOARD, '/reports'),
    list: path(ROOTS_DASHBOARD, '/reports/list'),
    new: path(ROOTS_DASHBOARD, '/reports/new'),
  },
  realisations: {
    root: path(ROOTS_DASHBOARD, '/realisations'),
    list: path(ROOTS_DASHBOARD, '/realisations/list'),
    newUser: path(ROOTS_DASHBOARD, '/realisations/new'),
  },
  checkouts: {
    root: path(ROOTS_DASHBOARD, '/checkouts'),
    list: path(ROOTS_DASHBOARD, '/checkouts/list'),
    new: path(ROOTS_DASHBOARD, '/checkouts/new'),
  },
  nomenklatura: {
    root: path(ROOTS_DASHBOARD, '/nomenklatura'),
    list: path(ROOTS_DASHBOARD, '/nomenklatura/list'),
    new: path(ROOTS_DASHBOARD, '/nomenklatura/new'),
  },
  contracts: {
    root: path(ROOTS_DASHBOARD, '/contracts'),
    list: path(ROOTS_DASHBOARD, '/contracts/list'),
    new: path(ROOTS_DASHBOARD, '/contracts/new'),
  },
  objects: {
    root: path(ROOTS_DASHBOARD, '/objects'),
    list: path(ROOTS_DASHBOARD, '/objects/list'),
    new: path(ROOTS_DASHBOARD, '/objects/new'),
  },
  tenders: {
    root: path(ROOTS_DASHBOARD, '/tenders'),
    profile: path(ROOTS_DASHBOARD, '/tenders/profile'),
    cards: path(ROOTS_DASHBOARD, '/tenders/cards'),
    list: path(ROOTS_DASHBOARD, '/tenders/list'),
    newUser: path(ROOTS_DASHBOARD, '/tenders/new'),
    editById: path(ROOTS_DASHBOARD, `/tenders/reece-chung/edit`),
    account: path(ROOTS_DASHBOARD, '/tenders/account'),
  },
};

export const PATH_DOCS = 'https://docs-minimals.vercel.app/introduction';
