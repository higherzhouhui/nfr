// import Image from 'next/image';
import Link from 'next/link';
import {NextRouter, useRouter} from 'next/router';
import React, {FC, memo, useEffect, useRef, useState} from 'react';
import {useRecoilState} from 'recoil';

import {
  HeaderContainer,
  HeaderLeftContainer,
  LogoContainer,
  MenuContainer,
  MenuItemContainer,
  HeaderSearchContainer,
  HeaderNavContainer,
  MenuDrawerContainer,
  DrawerContentContainer,
  DrawerSearchContentContainer,
} from './styles';

import {RouterPath} from '@/config/routes';
import {userState} from '@/store/user';
import {walletState} from '@/store/wallet';
import {SvgIcon, Drawer, Image} from '@/uikit';
import {popUpLogin} from '@/utils';
interface NavInterface {
  title: string;
  url: string;
}
enum ECurrentPage {
  Explore = 'Explore',
  CreateNFRs = 'Create NFRs',
  CreateCampaign = 'CreateCampaign',
  OTHER = 'OTHER',
}
export const Header: FC = memo(() => {
  const router: NextRouter = useRouter();
  const [user, setUser] = useRecoilState(userState);
  const [currentPage, setCurrentPage] = useState<ECurrentPage>(
    ECurrentPage.Explore
  );
  const [wallet, setWallet] = useRecoilState(walletState);
  const paths = ['/explore', '/createnfr', '/createcampaign'];

  // wallet点击事件
  const handleWalletClick = () => {
    popUpLogin(true);
  };
  // 路由跳转
  const handClickStatus = (status: ECurrentPage) => {
    setCurrentPage(status);
    if (status !== ECurrentPage.Explore) {
      popUpLogin(wallet.visible);
    }
  };

  // 退出登录
  const handleLogoutClick = async () => {
    localStorage.removeItem('x-token');
    setUser({
      token: null,
      id: null,
      account: null,
      img: null,
      name: null,
    });
    setWallet({
      visible: true,
    });
    router.push(RouterPath.explore());
  };

  useEffect(() => {
    const pathName = router.pathname.toLowerCase();
    if (pathName === paths[0]) {
      setCurrentPage(ECurrentPage.Explore);
    } else if (pathName === paths[1]) {
      setCurrentPage(ECurrentPage.CreateNFRs);
    } else if (pathName === paths[2]) {
      setCurrentPage(ECurrentPage.CreateCampaign);
    } else {
      setCurrentPage(ECurrentPage.OTHER);
    }
  }, [router.pathname]);

  return (
    <HeaderContainer>
      <HeaderLeftContainer>
        <LogoContainer>
          <Link passHref href='/'>
            <a className='logo'>
              <SvgIcon height={20} name='logo' width={80} />
            </a>
          </Link>
          {router.pathname !== '/' ? (
            <div className='routerTitle'>
              <Link passHref href='/explore'>
                <a
                  className={`title ${
                    currentPage === ECurrentPage.Explore ? 'active' : ''
                  }`}
                  onClick={() => {
                    handClickStatus(ECurrentPage.Explore);
                  }}
                >
                  Explore
                  <div className='underLine' />
                </a>
              </Link>
              <Link passHref href='/createnfr'>
                <a
                  className={`title ${
                    currentPage === ECurrentPage.CreateNFRs ? 'active' : ''
                  }`}
                  onClick={() => {
                    handClickStatus(ECurrentPage.CreateNFRs);
                  }}
                >
                  Create NFRs
                  <div className='underLine' />
                </a>
              </Link>
              <Link passHref href='/createcampaign'>
                <a
                  className={`title ${
                    currentPage === ECurrentPage.CreateCampaign ? 'active' : ''
                  }`}
                  onClick={() => {
                    handClickStatus(ECurrentPage.CreateCampaign);
                  }}
                >
                  Create Campaign
                  <div className='underLine' />
                </a>
              </Link>
            </div>
          ) : null}
        </LogoContainer>
        {/* <HeaderNav /> */}
      </HeaderLeftContainer>

      <MenuContainer
        style={{visibility: router.pathname !== '/' ? 'visible' : 'hidden'}}
      >
        {/* {router.pathname !== '/' && <HeaderSearch />} */}
        {user.account ? (
          <MenuItemContainer>
            <div
              className='addressWraper'
              onClick={() => {
                // handleGotoClick('/user');
              }}
            >
              <div className='imageWrapper'>
                <Image
                  alt='avatar'
                  layout='fill'
                  src={
                    user.img
                      ? user.img
                      : `/static/icon/avatar-${
                          typeof user.id === 'number' && user.id % 10 < 8
                            ? user.id % 10
                            : '0'
                        }.png`
                  }
                />
              </div>
              {user.account ? (
                <span className='address'>
                  {`${user.account.toString().slice(0, 5)}...${user.account
                    .toString()
                    .slice(38)}`}
                </span>
              ) : null}
            </div>
            <div className='dropDown'>
              <div
                className='list'
                onClick={() => {
                  router.push(RouterPath.profile(user.id || 1));
                }}
              >
                <SvgIcon height='24px' name='user-profile' width='24px' /> My
                profile
              </div>
              <div className='list' onClick={handleLogoutClick}>
                <SvgIcon height='24px' name='user-logout' width='24px' />
                Disconnect
              </div>
            </div>
          </MenuItemContainer>
        ) : (
          <MenuItemContainer onClick={handleWalletClick}>
            <div className='wallet-box'>
              <SvgIcon height={16} name='wallet-icon' width={16} />
              <p>Connect wallet</p>
            </div>
          </MenuItemContainer>
        )}
      </MenuContainer>
      <MenuDrawer />
    </HeaderContainer>
  );
});
Header.displayName = 'Header';

// 搜索框
export const HeaderSearch = memo(() => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [visible, setVisible] = useState<boolean>(false);
  const [tokenId, setTokenId] = useState<string | undefined>(undefined);
  const [isFocus, setIsFocus] = useState<boolean>(false);
  // 回车事件
  const handleKeyDownClick = (e: any) => {
    if (e.keyCode === 13) {
      setIsFocus(false);
      setVisible(false);
      inputRef.current?.blur();
      router.push(`/explore?tokenId=${tokenId || ''}`);
    }
  };
  // 移动端打开搜索
  const handleOpenSearchClick = () => {
    setVisible(true);
  };
  // 移动端关闭搜索
  const handleCloseSearchClick = () => {
    setVisible(false);
  };
  return (
    <HeaderSearchContainer>
      <div className='icon-box'>
        <SvgIcon height={24} name='search-icon' width={24} />
      </div>
      <div className='icon-phone-box' onClick={handleOpenSearchClick}>
        <SvgIcon height={24} name='search-icon' width={24} />
      </div>
      <div className='input-box'>
        <input
          placeholder='Search by NFT token ID'
          ref={inputRef}
          type='text'
          value={tokenId}
          onChange={(e: any) => {
            setTokenId(e.target.value);
          }}
          onFocus={() => {
            setIsFocus(true);
          }}
          onKeyDown={handleKeyDownClick}
        />
      </div>
      {isFocus && tokenId && (
        <div className='search-list-box'>
          <div
            className='search-item-box'
            onClick={() => {
              setIsFocus(false);
              inputRef.current?.blur();
              router.push(`/explore?tokenId=${tokenId}`);
            }}
          >
            {tokenId}
          </div>
        </div>
      )}
      <Drawer visible={visible} width='100%' onClose={handleCloseSearchClick}>
        <DrawerSearchContentContainer>
          <div className='drawer-header-box'>
            <div className='input-box'>
              <input
                placeholder='Search by NFT token ID'
                ref={inputRef}
                type='text'
                value={tokenId}
                onChange={(e: any) => {
                  setTokenId(e.target.value);
                }}
                onFocus={() => {
                  setIsFocus(true);
                }}
                onKeyDown={handleKeyDownClick}
              />
              <div className='icon-phone-box'>
                <SvgIcon height={24} name='search-icon' width={24} />
              </div>
            </div>
            <SvgIcon
              height={20}
              name='close-icon'
              width={20}
              onClick={handleCloseSearchClick}
            />
          </div>
          <div className='search-list-box'>
            {tokenId && (
              <div
                className='search-item-box'
                onClick={() => {
                  setIsFocus(false);
                  setVisible(false);
                  inputRef.current?.blur();
                  router.push(`/explore?tokenId=${tokenId}`);
                }}
              >
                {tokenId}
              </div>
            )}
          </div>
        </DrawerSearchContentContainer>
      </Drawer>
    </HeaderSearchContainer>
  );
});

HeaderSearch.displayName = 'HeaderSearch';

// Nav
const HeaderNav = memo(() => {
  const router: NextRouter = useRouter();
  const [navs, setNavs] = useState<NavInterface[]>([
    {
      title: 'Explore',
      url: '/explore',
    },
    {
      title: 'Create PoRs',
      url: '/studio',
    },
  ]);
  return (
    <HeaderNavContainer>
      {navs.map((nav: NavInterface) => (
        <div
          className={`nav-item-box ${
            router.pathname === nav.url ? 'active-nav' : ''
          }`}
          key={nav.url}
        >
          <Link href={nav.url}>{nav.title}</Link>
        </div>
      ))}
    </HeaderNavContainer>
  );
});

HeaderNav.displayName = 'HeaderNav';

// Menu Drawer
const MenuDrawer = memo(() => {
  const router: NextRouter = useRouter();
  const [wallet, setWallet] = useRecoilState(walletState);
  const [user] = useRecoilState(userState);
  const [visible, setVisible] = useState<boolean>(false);
  const [navs, setNavs] = useState<NavInterface[]>([
    {
      title: 'Explore',
      url: '/explore',
    },
    {
      title: 'Create NFRs',
      url: '/studio',
    },
  ]);

  // open menu Drawer
  const handleOpenMenuClick = () => {
    setVisible(true);
  };

  // close menu Drawer
  const handleCloseMenuClick = () => {
    setVisible(false);
  };
  // wallet点击事件
  const handleWalletClick = () => {
    popUpLogin(true);
  };
  return (
    <MenuDrawerContainer>
      <SvgIcon
        height={24}
        name='menu-icon'
        width={24}
        onClick={handleOpenMenuClick}
      />
      <Drawer visible={visible} width='100%' onClose={handleCloseMenuClick}>
        <DrawerContentContainer>
          <div className='drawer-header-box'>
            <SvgIcon
              height={20}
              name='logo'
              width={80}
              onClick={handleCloseMenuClick}
            />
            <SvgIcon
              height={20}
              name='close-icon'
              width={20}
              onClick={handleCloseMenuClick}
            />
          </div>
          {/* <div className='drawer-menu-box'>
            {navs.map((nav: NavInterface) => (
              <div
                className='drawer-menu-item-box'
                key={nav.url}
                onClick={handleCloseMenuClick}
              >
                <Link href={nav.url}>{nav.title}</Link>
              </div>
            ))}
          </div> */}
          <div className='drawer-btn-box'>
            {user.account ? (
              <div
                className='addressWraper'
                onClick={() => {
                  handleCloseMenuClick();
                  // handleGotoClick('/user');
                }}
              >
                <div className='imageWrapper'>
                  <Image
                    alt='avatar'
                    layout='fill'
                    src={`/static/icon/avatar-${
                      typeof user.id === 'number' && user.id % 10 < 8
                        ? user.id % 10
                        : '0'
                    }.png`}
                  />
                </div>
                {user.account ? (
                  <span className='address'>
                    {`${user.account.toString().slice(0, 5)}...${user.account
                      .toString()
                      .slice(38)}`}
                  </span>
                ) : null}
              </div>
            ) : (
              <div className='wallet-box' onClick={handleWalletClick}>
                <SvgIcon height={16} name='wallet-icon' width={16} />
                <p>Connect wallet</p>
              </div>
            )}
          </div>
        </DrawerContentContainer>
      </Drawer>
    </MenuDrawerContainer>
  );
});
MenuDrawer.displayName = 'MenuDrawer';

export default Header;
