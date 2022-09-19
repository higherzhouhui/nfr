import dynamic from 'next/dynamic';
import Head from 'next/head';
import {useRouter} from 'next/router';
import {memo, useEffect, useState} from 'react';
import {useRecoilState} from 'recoil';

import {LayoutContainer} from './styles';

import {Footer, WalletModal} from '@/components';
import {getIssue, getCollections, getStatus} from '@/services/options';
import {collectionState} from '@/store/collection';
import {issueState} from '@/store/issue';
import {statusState} from '@/store/status';
import {progressInit} from '@/utils';
const Header = dynamic(import('./header'), {ssr: false});

export const Layout = memo(({children}) => {
  const router = useRouter();
  const [issue, setIssue] = useRecoilState(issueState);
  const [collection, setCollection] = useRecoilState(collectionState);
  const [status, setStatus] = useRecoilState(statusState);
  const [isHideFoot, setFooterFlag] = useState(false);
  useEffect(() => {
    progressInit(router);
    getOptionsRequest();
  }, []);

  const hideFooter = ['/createnfr', '/createcampaign'];

  useEffect(() => {
    let flag = false;
    hideFooter.forEach((item: string) => {
      if (item === router.pathname) {
        flag = true;
      }
    });
    setFooterFlag(flag);
  }, [router.pathname]);

  // 获取公用参数
  const getOptionsRequest = async () => {
    if (issue.list && collection.list && status.list) {
      return;
    }
    const issueRes = await getIssue();
    const collectionRes = await getCollections();
    const statusRes = await getStatus();
    if (issueRes.code === 200) {
      const obj = issueRes.data;
      const arr: any = [];
      Object.keys(obj).forEach((key: any) => {
        arr.push({
          label: obj[key],
          value: key,
        });
      });
      setIssue({
        list: [...arr],
      });
    }
    if (collectionRes.code === 200) {
      const obj = collectionRes.data;
      const arr: any = [];
      Object.keys(obj).forEach((key: any) => {
        arr.push({
          label: key,
          value: obj[key],
        });
      });
      setCollection({
        list: [...arr],
      });
    }
    if (statusRes.code === 200) {
      const obj = statusRes.data;
      const arr: any = [];
      Object.keys(obj).forEach((key: any) => {
        arr.push({
          label: obj[key],
          value: key,
        });
      });
      setStatus({
        list: [...arr],
      });
    }
  };

  return (
    <>
      <Head>
        <title>Capsid NFRs</title>
        <meta
          content='width=device-width, initial-scale=1.0, user-scalable=no'
          name='viewport'
        />
      </Head>
      <Header />
      <LayoutContainer>{children}</LayoutContainer>
      {!isHideFoot && <Footer />}
      {/* wallet modal */}
      <WalletModal />
    </>
  );
});

Layout.displayName = 'Layout';
