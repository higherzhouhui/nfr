import {FC, memo} from 'react';

import {LoadingWrapper, FullPageLoadingWrapper} from './styles';

export type ILoadingProps = {
  size?: 'mini' | 'regular' | 'large' | 'bigest';
};

export const Loading: FC<ILoadingProps> = memo(({size}) => {
  return <LoadingWrapper size={size} />;
});

Loading.defaultProps = {
  size: 'regular',
};

Loading.displayName = 'Loading';

export const FullPageLoading: FC<ILoadingProps> = memo(({size}) => {
  return (
    <FullPageLoadingWrapper>
      <Loading size={size} />
    </FullPageLoadingWrapper>
  );
});

Loading.defaultProps = {
  size: 'large',
};

FullPageLoading.displayName = 'FullPageLoading';
