// @mui
import { styled } from '@mui/material/styles';
// layouts
import Layout from '../layouts';
// components
import Page from '../components/Page';
// sections
import { useRouter } from 'next/router';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(() => ({
  height: '100%',
}));

const ContentStyle = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: theme.palette.background.default,
}));


// ----------------------------------------------------------------------

// HomePage.getLayout = function getLayout(page) {
//   return <Layout variant="main">{page}</Layout>;
// };

// ----------------------------------------------------------------------

export default function HomePage() {

  const router = useRouter()

  if (typeof window !== 'undefined') {
    
    router.push('/auth/login')

  }

  return (
    <Page title="Стартовая страница">
      <RootStyle>
        {/* <HomeHero /> */}
        {/* <ContentStyle>
          <HomeMinimal />

          <HomeHugePackElements />

          <HomeDarkMode />

          <HomeColorPresets />

          <HomeCleanInterfaces />

          <HomePricingPlans />

          <HomeLookingFor />

          <HomeAdvertisement />
        </ContentStyle> */}
      </RootStyle>
    </Page>
  );
}
