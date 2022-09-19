import {FC, memo} from 'react';

import {FooterContainer} from './styles';

import {SvgIcon} from '@/uikit';

export const Footer: FC = memo(() => {
  return (
    <FooterContainer>
      <main>
        <div className='left'>
          <a
            className='href'
            href='https://www.notion.so/capsid-one/Capsid-is-hiring-4438a9d8113c4b2cb2265602b3db7525'
            rel='noreferrer'
            target='_blank'
          >
            Careers
          </a>
          {/* <a className='href' href='#'>
            Cookies
          </a>
          <a className='href' href='#'>
            Disclaimer
          </a>
          <a className='href' href='#'>
            Terms
          </a>
          <a className='href' href='#'>
            Privacy
          </a> */}
        </div>
        <div className='right'>
          <a href='https://discord.gg/Capsid' rel='noreferrer' target='_blank'>
            <SvgIcon height={24} name='discord' width={24} />
          </a>
          <a
            href='https://twitter.com/Capsid_One'
            rel='noreferrer'
            target='_blank'
          >
            <SvgIcon height={24} name='profile-twitter' width={24} />
          </a>
          <a
            href='https://mirror.xyz/realcapsid.eth'
            rel='noreferrer'
            target='_blank'
          >
            <SvgIcon height={24} name='mirror' width={24} />
          </a>
        </div>
      </main>
    </FooterContainer>
  );
});
Footer.displayName = 'Footer';

export default Footer;
