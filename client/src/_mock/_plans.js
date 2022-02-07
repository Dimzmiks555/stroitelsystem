import { PlanFreeIcon, PlanStarterIcon, PlanPremiumIcon } from '../assets';

// ----------------------------------------------------------------------

const LICENSES = ['Standard', 'Standard Plus', 'Extended'];

export const _homePlans = [...Array(3)].map((_, index) => ({
  license: LICENSES[index],
  commons: ['One end products', '12 months updates', '6 months of support'],
  options: [
    'JavaScript version',
    'TypeScript version',
    'Design Resources',
    'Commercial applications',
  ],
  icons: [
    'https://minimal-assets-api.vercel.app/assets/images/home/ic_sketch.svg',
    'https://minimal-assets-api.vercel.app/assets/images/home/ic_figma.svg',
    'https://minimal-assets-api.vercel.app/assets/images/home/ic_js.svg',
    'https://minimal-assets-api.vercel.app/assets/images/home/ic_ts.svg',
  ],
}));

export const _pricingPlans = [
  {
    subscription: 'Базовый',
    icon: <PlanFreeIcon />,
    price: 0,
    caption: 'Навсегда',
    lists: [
      { text: '3 прототипа', isAvailable: true },
      { text: '3 доски', isAvailable: true },
      { text: 'На 5 аккаунтов', isAvailable: false },
      { text: 'Продвинутая безопасность', isAvailable: false },
      { text: 'Права и рабочие процессы', isAvailable: false },
    ],
    labelAction: 'текущий план',
  },
  {
    subscription: 'Начальный',
    icon: <PlanStarterIcon />,
    price: 4.99,
    caption: 'экономия $24 в год',
    lists: [
      { text: '3 прототипа', isAvailable: true },
      { text: '3 доски', isAvailable: true },
      { text: 'На 5 аккаунтов', isAvailable: true },
      { text: 'Продвинутая безопасность', isAvailable: false },
      { text: 'Права и рабочие процессы', isAvailable: false },
    ],
    labelAction: 'Выбрать стартовый',
  },
  {
    subscription: 'Премиум',
    icon: <PlanPremiumIcon />,
    price: 9.99,
    caption: 'экономия $124 в год',
    lists: [
      { text: '3 прототипа', isAvailable: true },
      { text: '3 доски', isAvailable: true },
      { text: 'На 5 аккаунтов', isAvailable: true },
      { text: 'Продвинутая безопасность', isAvailable: true },
      { text: 'Права и рабочие процессы', isAvailable: true },
    ],
    labelAction: 'Выбрать Премиум',
  },
];
