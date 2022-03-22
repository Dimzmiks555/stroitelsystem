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
  orders: {
    root: path(ROOTS_DASHBOARD, '/orders'),
    profile: path(ROOTS_DASHBOARD, '/orders/profile'),
    cards: path(ROOTS_DASHBOARD, '/orders/cards'),
    list: path(ROOTS_DASHBOARD, '/orders/list'),
    newOrder: path(ROOTS_DASHBOARD, '/orders/new'),
    editById: path(ROOTS_DASHBOARD, `/orders/reece-chung/edit`),
    account: path(ROOTS_DASHBOARD, '/orders/account'),
  },
  contragents: {
    root: path(ROOTS_DASHBOARD, '/contragents'),
    profile: path(ROOTS_DASHBOARD, '/contragents/profile'),
    cards: path(ROOTS_DASHBOARD, '/contragents/cards'),
    list: path(ROOTS_DASHBOARD, '/contragents/list'),
    new: path(ROOTS_DASHBOARD, '/contragents/new'),
    editById: path(ROOTS_DASHBOARD, `/contragents/:id`),
    account: path(ROOTS_DASHBOARD, '/contragents/account'),
  },
  note: {
    root: path(ROOTS_DASHBOARD, '/note'),
    profile: path(ROOTS_DASHBOARD, '/note/profile'),
    cards: path(ROOTS_DASHBOARD, '/note/cards'),
    list: path(ROOTS_DASHBOARD, '/note/list'),
    newUser: path(ROOTS_DASHBOARD, '/note/new'),
    editById: path(ROOTS_DASHBOARD, `/note/reece-chung/edit`),
    account: path(ROOTS_DASHBOARD, '/note/account'),
  },
  realisations: {
    root: path(ROOTS_DASHBOARD, '/realisations'),
    profile: path(ROOTS_DASHBOARD, '/realisations/profile'),
    cards: path(ROOTS_DASHBOARD, '/realisations/cards'),
    list: path(ROOTS_DASHBOARD, '/realisations/list'),
    newUser: path(ROOTS_DASHBOARD, '/realisations/new'),
    editById: path(ROOTS_DASHBOARD, `/realisations/reece-chung/edit`),
    account: path(ROOTS_DASHBOARD, '/realisations/account'),
  },
  checkouts: {
    root: path(ROOTS_DASHBOARD, '/checkouts'),
    profile: path(ROOTS_DASHBOARD, '/checkouts/profile'),
    cards: path(ROOTS_DASHBOARD, '/checkouts/cards'),
    list: path(ROOTS_DASHBOARD, '/checkouts/list'),
    new: path(ROOTS_DASHBOARD, '/checkouts/new'),
    editById: path(ROOTS_DASHBOARD, `/checkouts/reece-chung/edit`),
    account: path(ROOTS_DASHBOARD, '/checkouts/account'),
  },
  nomenklatura: {
    root: path(ROOTS_DASHBOARD, '/nomenklatura'),
    profile: path(ROOTS_DASHBOARD, '/nomenklatura/profile'),
    cards: path(ROOTS_DASHBOARD, '/nomenklatura/cards'),
    list: path(ROOTS_DASHBOARD, '/nomenklatura/list'),
    new: path(ROOTS_DASHBOARD, '/nomenklatura/new'),
    editById: path(ROOTS_DASHBOARD, `/nomenklatura/reece-chung/edit`),
    account: path(ROOTS_DASHBOARD, '/nomenklatura/account'),
  },
  objects: {
    root: path(ROOTS_DASHBOARD, '/objects'),
    profile: path(ROOTS_DASHBOARD, '/objects/profile'),
    cards: path(ROOTS_DASHBOARD, '/objects/cards'),
    list: path(ROOTS_DASHBOARD, '/objects/list'),
    new: path(ROOTS_DASHBOARD, '/objects/new'),
    editById: path(ROOTS_DASHBOARD, `/objects/reece-chung/edit`),
    account: path(ROOTS_DASHBOARD, '/objects/account'),
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
  eCommerce: {
    root: path(ROOTS_DASHBOARD, '/e-commerce'),
    shop: path(ROOTS_DASHBOARD, '/e-commerce/shop'),
    product: path(ROOTS_DASHBOARD, '/e-commerce/product/:name'),
    productById: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-air-force-1-ndestrukt'),
    list: path(ROOTS_DASHBOARD, '/e-commerce/list'),
    newProduct: path(ROOTS_DASHBOARD, '/e-commerce/product/new'),
    editById: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-blazer-low-77-vintage/edit'),
    checkout: path(ROOTS_DASHBOARD, '/e-commerce/checkout'),
    invoice: path(ROOTS_DASHBOARD, '/e-commerce/invoice'),
  },
  blog: {
    root: path(ROOTS_DASHBOARD, '/blog'),
    posts: path(ROOTS_DASHBOARD, '/blog/posts'),
    post: path(ROOTS_DASHBOARD, '/blog/post/:title'),
    postById: path(ROOTS_DASHBOARD, '/blog/post/apply-these-7-secret-techniques-to-improve-event'),
    newPost: path(ROOTS_DASHBOARD, '/blog/new-post'),
  },
};

export const PATH_DOCS = 'https://docs-minimals.vercel.app/introduction';