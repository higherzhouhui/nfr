import {FC, memo, useEffect, useState} from 'react';

import {BackGroundComp, BubbleComp, Bubbles, BubleStyle} from './style';

type BgProps = {};

const BackGround: FC<BgProps> = memo((props) => {
  const {children} = props;
  return (
    <BackGroundComp>
      {children}
      <Bubble />
      <div className='leftTop' />
      <div className='rightBottom' />
    </BackGroundComp>
  );
});

BackGround.displayName = 'BackGround';

type BubbleProps = {
  type?: string | string[] | undefined;
};

const Bubble: FC<BubbleProps> = memo(() => {
  const [bubleStyles, setBubleStyles] = useState<BubleStyle[]>([]);
  let tempStyles: any = '';
  const justflyWidth = () => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    tempStyles = [
      {width: 160, left: '-29px', bottom: 58, background: '#2590FF'},
      {width: 24, left: '21%', top: '26%', background: '#00D6F8'},
      {width: 40, left: '23%', top: '57%', background: '#4686ca'},
      {width: 80, left: '70%', top: '15%', background: '#00D6F8'},
      {width: 120, right: '-30px', top: '17%', background: '#7970ff'},
      {width: 40, left: '68%', top: '70%', background: '#7970ff'},
    ];
    setBubleStyles(tempStyles);
  };
  useEffect(() => {
    justflyWidth();
  }, []);

  return (
    <BubbleComp>
      <div className='content'>
        {bubleStyles.map((val, index) => {
          return <Bubbles {...val} key={index} />;
        })}
      </div>
    </BubbleComp>
  );
});

Bubble.displayName = 'Bubble';

export default BackGround;
