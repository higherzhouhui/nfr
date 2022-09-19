// import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {useEffect, useRef, useState} from 'react';
import Skeleton from 'react-loading-skeleton';
import {useRecoilState} from 'recoil';

import type {NextPage} from 'next';

import {Loading} from '@/components';
import {RouterPath} from '@/config/routes';
import {getLazyMintNftDetail} from '@/services/nft';
import {userState} from '@/store/user';
import {CampaignDetailContainer} from '@/styles/campaigndetail';
import {NfrProperty} from '@/styles/nfrdetail';
import {SvgIcon, Image} from '@/uikit';

const NfrDetail: NextPage = () => {
  const [detail, setDetail] = useState<GlobalNft.Nft>();
  const router = useRouter();
  const homeRef: any = useRef(null);
  const {id} = router.query || 1;
  const [user] = useRecoilState(userState);
  useEffect(() => {
    if (id) {
      getLazyMintNftDetail(id as any).then((res: any) => {
        if (res?.code === 200) {
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
                <Image alt='nfr' layout='fill' src={detail?.img} />
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
              <h1>
                {detail.anft_name}
                {detail?.anft_opensea_url && (
                  <a className='svgWrapper' href={detail?.anft_opensea_url}>
                    <SvgIcon height='100%' name='opensea' width='100%' />
                  </a>
                )}
              </h1>
              <h3>{detail.describe}</h3>
              <div className='live'>
                <SvgIcon height={24} name='detail-nft' width={24} />
                <span>{detail.status === 2 ? 'Minted' : 'Bought'}</span>
              </div>
              <div className='creator'>
                <span>Created by </span>{' '}
                <Link
                  passHref
                  href={RouterPath.profile(detail?.creator_id || 1)}
                >
                  <a style={{marginRight: '32px'}}>
                    {detail.creator_id === user.id
                      ? 'you'
                      : detail.creator_name || 'Jack'}
                  </a>
                </Link>
                <span>Owned by </span>{' '}
                <Link passHref href={RouterPath.profile(detail?.owner_id || 1)}>
                  <a>
                    {detail.owner_id === user.id
                      ? 'you'
                      : detail.owner_name || 'Rose'}
                  </a>
                </Link>
              </div>
              <div className='price'>
                <SvgIcon height={32} name='eth' width={32} />
                <span>{detail?.price}</span>
              </div>

              {detail?.attachment ? (
                <div className='attachWrapper'>
                  <a href={detail.attachment} rel='noreferrer' target='_blank'>
                    Attachment
                    <SvgIcon height={16} name='detail-attach' width={16} />
                  </a>
                </div>
              ) : null}
            </>
          ) : (
            <div className='loading'>
              <Loading size='bigest' />
            </div>
          )}
        </section>
      </div>
      {detail ? (
        <NfrProperty>
          <h2>properties</h2>
          <div className='propertyWrapper'>
            <div className='property'>
              <div className='title'>PARENT NAME</div>
              <div className='name'>{detail?.nft_name}</div>
            </div>
            <div className='property'>
              <div className='title'>CATEGORY</div>
              <div className='name'>{detail?.issue_name}</div>
            </div>
          </div>
          <div className='propertyWrapper'>
            <div className='property'>
              <div className='title'>EXPRESS TIME</div>
              <div className='name'>{detail?.expiration_time}</div>
            </div>
            <div className='property'>
              <div className='title'>NUMBER LIMITATION</div>
              <div className='name'>{detail?.number_limination}</div>
            </div>
          </div>
          <div className='propertyWrapper'>
            <div className='property'>
              <div className='title'>Payment</div>
              <div className='name'>{detail?.payment || 'Pay upfront'}</div>
            </div>
          </div>
        </NfrProperty>
      ) : null}
    </CampaignDetailContainer>
  );
};
NfrDetail.displayName = 'NfrDetail';

export default NfrDetail;
