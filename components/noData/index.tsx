import Image from 'next/image';
import {memo, useEffect} from 'react';

import {NoDataWrapper} from './styles';

export const NoData = memo(() => {
  useEffect(() => {}, []);
  return (
    <NoDataWrapper>
      <Image height={240} src='/static/icon/empty-icon.png' width={240} />
      <p>No content temporarily</p>
    </NoDataWrapper>
  );
});

NoData.displayName = 'NoData';
