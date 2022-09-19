import {Web3Provider} from 'ethers-react';
import React from 'react';
import {SkeletonTheme} from 'react-loading-skeleton';
import {RecoilRoot} from 'recoil';
import {ThemeProvider} from 'styled-components';

import {LanguageProvider} from './LanguageProvider';

import {lightTheme} from '@/uikit';

type ProvidersProps = {};

const Providers: React.FC<ProvidersProps> = ({children}) => {
  return (
    <ThemeProvider theme={lightTheme}>
      <LanguageProvider>
        <Web3Provider>
          <SkeletonTheme baseColor='#ebf0f6' highlightColor='#ffffff'>
            <RecoilRoot>{children}</RecoilRoot>
          </SkeletonTheme>
        </Web3Provider>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default Providers;
