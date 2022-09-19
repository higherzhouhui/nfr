import {FC, memo} from 'react';
import Skeleton from 'react-loading-skeleton';

import {SkeletonProductComp} from './styles';
import 'react-loading-skeleton/dist/skeleton.css';

type SkeletonProductProps = {
  hideTitle?: boolean;
};

export const SkeletonProduct: FC<SkeletonProductProps> = memo(({hideTitle}) => {
  return (
    <SkeletonProductComp>
      <div className='nft-item-box'>
        <div className='img-box'>
          <Skeleton className='img-skeleton' />
        </div>
        {!hideTitle && (
          <div className='title-box'>
            <Skeleton className='title-skeleton' />
          </div>
        )}
      </div>
    </SkeletonProductComp>
  );
});

SkeletonProduct.displayName = 'SkeletonProduct';
