import {useSize} from 'ahooks';
// import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {useEffect, useRef, useState} from 'react';
import Skeleton from 'react-loading-skeleton';
import {useRecoilState} from 'recoil';

import type {NextPage} from 'next';

import {List, Loading, NoData, Product, SkeletonProduct} from '@/components';
import {RouterPath} from '@/config/routes';
import {useEthersUtils, useSigner} from '@/ethers-react';
import {
  deleteMyCampaignNfrs,
  getCampaignDetail,
  updateCampaignRequest,
} from '@/services/campaign';
import {getNonce, IUserRequestType} from '@/services/user';
import {userState} from '@/store/user';
import {CampaignDetailContainer} from '@/styles/campaigndetail';
import {Col, Row, SvgIcon, Image, Button, Select} from '@/uikit';

const CampaignDetail: NextPage = () => {
  const router = useRouter();
  const [detail, setDetail] = useState<GlobalCampaign.Campaign | undefined>();
  const homeRef: any = useRef(null);
  const size = useSize(homeRef);
  const {id} = router.query || 1;
  const [user] = useRecoilState(userState);
  const [isOwnCampaign, setIsOwn] = useState(false);
  const [mintNfts, setMintNfrs] = useState<any[]>([]);
  const [isStatusLoading, setStatusLoading] = useState(false);
  const status = [
    {
      label: 'Become an ambassador',
      value: 'Pre-Mint',
    },
    {
      label: 'Mint',
      value: 'Mint',
    },
    {
      label: 'Wear WINGS',
      value: 'After-Mint',
    },
  ];
  const getStatusLabel = (value?: string) => {
    let label = 'Become an ambassador';
    status.forEach((item) => {
      if (item.value === value) {
        label = item.label;
      }
    });
    return label;
  };
  const getColnumber = (width?: number): number => {
    let num = 2;
    if (!width) {
      return num;
    }
    num = Math.max(Math.round(width / 300), 2);
    return num;
  };

  const onClickDelete = (mintid: number) => {
    deleteMyCampaignNfrs(mintid).then((res: any) => {
      if (res?.code === 200) {
        console.log(res);
      }
    });
    const nmint_nfts = mintNfts.filter((item: any) => {
      return item.assoc_id !== mintid;
    });
    setMintNfrs([...nmint_nfts]);
  };

  const onClickPlusNfr = () => {
    router.push(RouterPath.addNfrToCampaign(id as any));
  };

  const {getHashId} = useEthersUtils();
  const {getSignMessage} = useSigner();
  // 获取nonce请求
  const getNonceRequest = async (account: string) => {
    const res = await getNonce({
      address: account,
    });
    if (res.code === 200) {
      return res.data;
    }
    return null;
  };
  const getMetaMaskSign = async () => {
    const nonce = await getNonceRequest((user.account || '') as string);
    const msg = getHashId(`this is a pd1 ${nonce}`);
    let signature;
    let errorMsg;
    try {
      signature = await getSignMessage(
        'Become an ambassador will Add all your NFRs to this Campaign'
      );
    } catch (error: any) {
      errorMsg =
        error?.message ||
        'MetaMask Message Signature: User denied message signature.';
    }
    return {signature, errorMsg};
  };
  const getSelectDefault = (status: string) => {
    let defaultValue: any = '';
    statusOptions.forEach((item: any) => {
      if (item.value === status) {
        defaultValue = item;
      }
    });
    return defaultValue;
  };
  const handClickCampaignStatus = async () => {
    // 根据当前状态进行不同的操作
    // setStatusLoading(true);
    // const sign = await getMetaMaskSign();
    // if (sign.errorMsg) {
    //   showTip({type: IMessageType.ERROR, content: sign.errorMsg});
    // }
    // setStatusLoading(false);
    if (detail?.status === 'Pre-Mint') {
      router.push(RouterPath.createNfr(detail.collections, id as any));
    }
    if (detail?.status === 'Mint') {
      window.open(detail.wings_jump_url);
    }

    if (detail?.status === 'After-Mint') {
    }
  };
  const statusOptions: any = [
    {label: 'Pre-Mint', value: 'Pre-Mint'},
    {label: 'Mint', value: 'Mint'},
    {label: 'After-Mint', value: 'After-Mint'},
  ];
  const handleSelectStatusFliter = (item: any) => {
    if (detail) {
      const cdetail = {...detail, status: item.value};
      setDetail(cdetail);
      updateCampaignRequest({id: cdetail.id, stauts: cdetail.status});
    }
  };
  useEffect(() => {
    if (id) {
      getCampaignDetail(id as any).then((res: any) => {
        if (res?.code === 200) {
          const userAddress = res?.data?.user_address;
          const mint_nfts: any[] = res?.data?.mint_nfts || [];
          if (userAddress === user.account) {
            setIsOwn(true);
            mint_nfts.unshift({img_url: ''});
          }
          setMintNfrs(mint_nfts);
          res.data.status = res.data?.status || 'Pre-Mint';
          setDetail(res?.data);
        }
      });
    }
  }, [id]);
  return (
    <CampaignDetailContainer ref={homeRef}>
      <div className='topContainer'>
        <aside>
          <div className='imageWrapper'>
            {detail ? (
              <>
                <div className='watermark'>
                  {/* <Image
                    alt='watermark'
                    layout='fill'
                    src='/static/image/watermark.png'
                  /> */}
                  <SvgIcon name='watermark' />
                </div>
                <Image
                  alt='nfr'
                  layout='fill'
                  objectFit='cover'
                  src={detail?.img}
                />
              </>
            ) : (
              <div className='skeleton'>
                <Skeleton height='100%' width='100%' />
              </div>
            )}
          </div>
        </aside>
        <section>
          {detail ? (
            <>
              <h1>{detail.name}</h1>
              <h3>{detail.describe}</h3>
              {detail.user_id === user.id ? (
                <div style={{width: '200px'}}>
                  <Select
                    borderRadius={4}
                    defaultValue={getSelectDefault(detail.status)}
                    fontSize={14}
                    height={40}
                    marginBottom={24}
                    minHeight={32}
                    options={statusOptions}
                    placeholder='Select status'
                    width='100%'
                    onChange={(value: any) => {
                      handleSelectStatusFliter(value);
                    }}
                  />
                </div>
              ) : (
                <div className='live'>
                  <SvgIcon height={24} name='detail-nft' width={24} />
                  <span>{detail.status}</span>
                </div>
              )}
              <div className='creator'>
                Created by{' '}
                <Link
                  passHref
                  href={RouterPath.profile(
                    detail.user_id,
                    IUserRequestType.Campaign
                  )}
                >
                  <a>
                    {detail.user_id === user.id
                      ? 'you'
                      : detail.user_name || 'Jack'}
                  </a>
                </Link>
              </div>
              <div className='dateWrapper'>
                <div className='title'>Expiration date</div>
                <div className='date'>{detail.expiration_date_end}</div>
              </div>
              <div className='btns'>
                <Button
                  height={40}
                  isLoading={isStatusLoading}
                  variant='primary'
                  width={200}
                  onClick={handClickCampaignStatus}
                >
                  {getStatusLabel(detail.status)}
                </Button>
                {detail.link && (
                  <div className='learnMore'>
                    <a href={detail.link} rel='noreferrer' target='_blank'>
                      Learn more
                    </a>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className='loading'>
              <Loading size='bigest' />
            </div>
          )}
        </section>
      </div>
      <div className='botContainer'>
        <h2>PoRs accepted by this campaign</h2>
        <div className='swiperContainer'>
          <List scrollDomId='browse-campaign-dom'>
            <Row>
              {detail ? (
                mintNfts.length ? (
                  mintNfts.map((item: any, index: number) => (
                    <Col
                      colGutter={24}
                      gutter={16}
                      key={index}
                      span={getColnumber(size?.width)}
                    >
                      <Product
                        data={{
                          img: item?.img_url,
                          type: isOwnCampaign ? 'OWNCAMPAIGN' : 'NONE',
                        }}
                        key={index}
                        onClickDelete={() => {
                          onClickDelete(item?.assoc_id);
                        }}
                        onClickPlusNfr={onClickPlusNfr}
                      />
                    </Col>
                  ))
                ) : (
                  <NoData />
                )
              ) : (
                [...Array(8)].map((item: any, index: number) => (
                  <Col
                    colGutter={16}
                    gutter={16}
                    key={index}
                    span={getColnumber(size?.width)}
                  >
                    <SkeletonProduct hideTitle key={index} />
                  </Col>
                ))
              )}
            </Row>
          </List>
        </div>
      </div>
    </CampaignDetailContainer>
  );
};
CampaignDetail.displayName = 'CampaignDetail';

export default CampaignDetail;
