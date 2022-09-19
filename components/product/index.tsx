// import Image from 'next/image';
import {useRouter} from 'next/router';
import {memo, FC} from 'react';

import {ProductWrapper} from './styles';

import {RouterPath} from '@/config/routes';
import {Button, SvgIcon, Image} from '@/uikit';

interface ProductInterface {
  data: {
    img: string;
    id?: number;
    type?:
      | 'NFR'
      | 'CAMPAIGN'
      | 'NONE'
      | 'SELECT'
      | 'ADDTOCAMPAIGN'
      | 'OWNCAMPAIGN';
    price?: number;
    name?: string;
    expiration_date_end?: number;
    parent_nft_name?: string;
  };
  isSelect?: boolean;
  checked?: boolean;
  hideWaterMark?: boolean;
  onClick?: () => void;
  onCheckBoxChange?: () => void;
  children?: React.ReactNode;
  onClickDelete?: () => void;
  onClickPlusNfr?: () => void;
}

export const Product: FC<ProductInterface> = memo(
  ({
    data,
    children,
    checked,
    onClick,
    onClickDelete,
    onClickPlusNfr,
    hideWaterMark,
  }) => {
    const router = useRouter();
    const routerToDetail = () => {
      onClick && onClick();
      if (
        data.type === 'NONE' ||
        data.type === 'SELECT' ||
        data.type === 'ADDTOCAMPAIGN'
      ) {
        return;
      }
      if (data.type === 'CAMPAIGN') {
        router.push(RouterPath.campaignDetail(data.id || 1));
      }
      if (!data.type || data.type === 'NFR') {
        router.push(RouterPath.nfrDetail(data.id || 1));
      }
    };
    return (
      <ProductWrapper
        checked={checked}
        isSelect={data.type === 'SELECT' || data.type === 'ADDTOCAMPAIGN'}
        onClick={routerToDetail}
      >
        <div className='img-box img-studio'>
          {data.img && (
            <div className='img-content-box'>
              <Image alt='pic' layout='fill' src={data.img} />
              {!hideWaterMark && (
                <div className='por-top-box'>
                  {/* <img alt='top' src='/static/image/watermark.png' /> */}
                  <SvgIcon name='watermark' />
                </div>
              )}
            </div>
          )}
          {data.type === 'OWNCAMPAIGN' ? (
            <div>
              {data.img ? (
                <div className='mask'>
                  <Button
                    height={36}
                    variant='danger'
                    width={88}
                    onClick={onClickDelete}
                  >
                    Delete
                  </Button>
                </div>
              ) : (
                <div className='plusWrapper' onClick={onClickPlusNfr}>
                  <SvgIcon height={40} name='campaign-plus' width={40} />
                  <p>Add NFR</p>
                </div>
              )}
            </div>
          ) : null}
          {children}
        </div>
        <div className='des-box'>
          {data.type === 'CAMPAIGN' ? (
            <div className='campaign'>
              <h2>{data.name}</h2>
              <h4>Ends in {data.expiration_date_end}</h4>
            </div>
          ) : data.type === 'NONE' ||
            data.type === 'OWNCAMPAIGN' ? null : data.type === 'SELECT' ? (
            <div className='select'>
              <h2>{data.name}</h2>
              {checked ? (
                <div className='svgWrapper'>
                  <SvgIcon height={12} name='createnfr-done' width={12} />
                </div>
              ) : null}
            </div>
          ) : data.type === 'ADDTOCAMPAIGN' ? (
            <div className='addTocampaign'>
              <div>
                <h4>Current Price</h4>
                <div className='price'>{data.price} ETH</div>
              </div>
              {checked ? (
                <div className='svgWrapper'>
                  <SvgIcon height={12} name='createnfr-done' width={12} />
                </div>
              ) : null}
            </div>
          ) : (
            <div className='nfr'>
              <h4>Current Price</h4>
              <div className='price'>{data.price} ETH</div>
            </div>
          )}
        </div>
      </ProductWrapper>
    );
  }
);

Product.displayName = 'Product';
