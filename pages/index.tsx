import {useSize} from 'ahooks';
import {useRouter} from 'next/router';
import {useRef} from 'react';

import type {NextPage} from 'next';

import {List} from '@/components';
import {aliOss} from '@/config';
import {
  FoundMember,
  HomeContainer,
  HomePageContainer,
  InvestorWrapper,
  ResourceMember,
} from '@/styles/home';
import {Button, Col, Row, SvgIcon} from '@/uikit';

const Home: NextPage = () => {
  const router = useRouter();
  const handleGotoClick = (url: string) => {
    window.open(url);
  };

  const listContainer = useRef<any>(null);
  const size = useSize(listContainer);
  const getColnumber = (width?: number): number => {
    let num = 2;
    if (!width) {
      return num;
    }
    num = Math.max(Math.round(width / 300), 2);
    console.log(size?.width);
    return num;
  };

  const getInvestorColnumber = (width?: number): number => {
    let num = 2;
    if (!width) {
      return num;
    }
    num = Math.max(Math.round(width / 250), 2);
    console.log(size?.width);
    return num;
  };

  const foundList = ['number1', 'number2', 'number3', 'number4'];
  const investorList = [
    'investor1',
    'investor2',
    'investor3',
    'investor4',
    'investor5',
  ];
  const veteransList = [
    'veterans1',
    'veterans2',
    'veterans3',
    'veterans4',
    'veterans5',
    'veterans6',
    'veterans7',
  ];

  return (
    <HomePageContainer>
      <HomeContainer>
        <div className='home-content-container content-container'>
          <div className='home-left-box'>
            <h1>The 1st Marketplace for</h1>
            <h1 className='strong'>Non-Fungible Rights</h1>
            {/* <h1>THE 1st MARKETPLACE FOR RIGHTS NFTS</h1> */}
            <p>
              Buy, sell and mint the rights to use NFTs, including but not
              limited to collabs, derivatives, merch, renting. Read
              <span
                onClick={() => {
                  handleGotoClick(
                    'https://capsid.gitbook.io/capsid/products/marketplace-for-rights-nfts'
                  );
                }}
              >
                {' '}
                more
              </span>
              .
            </p>
            <div className='btn-box'>
              <Button
                borderColor='#2590FF'
                borderRadius={35}
                borderWidth={2}
                color='#2590FF'
                fontSize={16}
                fontWeight={500}
                height={56}
                variant='default'
                width={230}
                onClick={() => {
                  handleGotoClick(
                    'https://digfn8hi7nj.typeform.com/to/q2P5GHhG'
                  );
                }}
              >
                Add me to the allow list
              </Button>
            </div>
          </div>
          <div className='home-right-box'>
            <video
              autoPlay
              loop
              muted
              playsInline
              controlsList='nodownload'
              data-object-fit='cover'
              data-wf-ignore='true'
              preload='true'
            >
              <source
                data-wf-ignore='true'
                src={`${aliOss}/vedio/home-introduce.mp4`}
                type='video/mp4'
              />
            </video>
          </div>
        </div>
      </HomeContainer>
      <div className='content-container secondContent' ref={listContainer}>
        <div className='title'>Founding members from</div>
        <List>
          <Row>
            {foundList.map((name: string, index: number) => (
              <Col
                colGutter={16}
                gutter={16}
                key={index}
                span={getColnumber(size?.width)}
              >
                <FoundMember key={index}>
                  <SvgIcon name={name} />
                </FoundMember>
              </Col>
            ))}
          </Row>
        </List>
        <div className='title'>Backed by top notch investors</div>
        <List>
          <Row>
            {investorList.map((src: string, index: number) => (
              <Col
                colGutter={32}
                gutter={16}
                key={index}
                span={getInvestorColnumber(size?.width)}
              >
                <InvestorWrapper key={index}>
                  {/* <div className='img'>
                    <Image
                      alt='investor'
                      layout='fill'
                      objectFit='scale-down'
                      src={`/static/image/${src}.png`}
                    />
                  </div> */}
                  <SvgIcon name={src} />
                </InvestorWrapper>
              </Col>
            ))}
          </Row>
        </List>
        <div className='title'>Backed by execs and veterans from</div>
        <List>
          <Row>
            {veteransList.map((src: string, index: number) => (
              <Col
                colGutter={24}
                gutter={16}
                key={index}
                span={getInvestorColnumber(size?.width)}
              >
                <InvestorWrapper key={index}>
                  {/* <div className='img'>
                    <Image
                      alt='investor'
                      layout='fill'
                      objectFit='scale-down'
                      src={`/static/image/${src}.png`}
                    />
                  </div> */}
                  <SvgIcon name={src} />
                </InvestorWrapper>
              </Col>
            ))}
          </Row>
        </List>
      </div>
      <div className='resources'>
        <div className='title'>Resource</div>
        <div className='tworesource'>
          <ResourceMember
            // href='#'
            // target='_blank'
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className='name'>
              Frequently Asked Questions{' '}
              <span className='coming'>coming soon</span>
            </div>
            <SvgIcon height={18} name='rightarrow' width={18} />
          </ResourceMember>
          <span className='jiange' />
          <ResourceMember
            href='https://discord.gg/capsid'
            rel='noreferrer'
            target='_blank'
          >
            <div className='svglogoname'>
              <SvgIcon
                className='logosvg'
                height={18}
                name='discord'
                width={18}
              />
              <div className='name'>Discord</div>
            </div>
            <SvgIcon height={18} name='rightarrow' width={18} />
          </ResourceMember>
        </div>
        <div className='tworesource'>
          <ResourceMember
            href='https://mirror.xyz/realcapsid.eth'
            rel='noreferrer'
            target='_blank'
          >
            <div className='svglogoname'>
              <SvgIcon
                className='logosvg'
                height={18}
                name='mirror'
                width={18}
              />
              <div className='name'>Mirror</div>
            </div>
            <SvgIcon height={18} name='rightarrow' width={18} />
          </ResourceMember>
          <span className='jiange' />
          <ResourceMember
            href='https://twitter.com/Capsid_One'
            rel='noreferrer'
            target='_blank'
          >
            <div className='svglogoname'>
              <SvgIcon
                className='logosvg'
                height={18}
                name='profile-twitter'
                width={18}
              />
              <div className='name'>Twitter</div>
            </div>
            <SvgIcon height={18} name='rightarrow' width={18} />
          </ResourceMember>
        </div>
      </div>
    </HomePageContainer>
  );
};

export default Home;
