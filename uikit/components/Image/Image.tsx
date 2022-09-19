import Image, {ImageProps} from 'next/image';
import {FC, memo, useState} from 'react';

import {ImageComp} from './style';

export interface MImageProps extends ImageProps {
  noCut?: boolean;
  pad?: boolean;
}

const MImage: FC<MImageProps> = memo((props) => {
  const src = props.src as any as string;
  let aliCutSrc = `${src}?x-oss-process=image/resize,m_fill,h_450,w_450`;
  if (props.noCut) {
    aliCutSrc = src;
  }
  if (props.pad) {
    aliCutSrc = `${src}?x-oss-process=image/resize,m_fill,h_240,w_400`;
  }
  const [error, setError] = useState(false);
  const domain = '/static';
  const isDefine = src.includes(domain);
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {isDefine ? (
        <Image {...props} />
      ) : (
        <ImageComp>
          <img
            alt={props.alt}
            src={error ? src : aliCutSrc}
            style={{objectFit: props.objectFit}}
            onError={() => {
              setError(true);
            }}
            onLoad={props.onLoad}
          />
        </ImageComp>
      )}
    </>
  );
});

MImage.displayName = 'MImage';
export default MImage;
