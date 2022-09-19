import {useSize} from 'ahooks';
import {NextRouter, useRouter} from 'next/router';
import {useState, useEffect, useRef} from 'react';
import {useRecoilState} from 'recoil';

import type {NextPage} from 'next';

import {
  ANftDetail,
  List,
  NoData,
  Product,
  MenuDrawer,
  SkeletonProduct,
} from '@/components';
import {getCampaignList} from '@/services/campaign';
import {getNftList} from '@/services/nft';
import {collectionState} from '@/store/collection';
import {issueState} from '@/store/issue';
import {
  BrowseContainer,
  ExploreTab,
  BrowseOverflowContentContainer,
  BrowseDrawerContainer,
  BrowseContentContainer,
} from '@/styles/explore';
import {Col, Row} from '@/uikit';

enum CurrentTab {
  NFRS = 1,
  CAMPAIGNS = 2,
}
const Explore: NextPage = () => {
  const router: NextRouter = useRouter();
  const [collection] = useRecoilState(collectionState);
  const [issue] = useRecoilState(issueState);
  const [param, setParam] = useState({
    pageNo: 1,
    pageSize: 20,
    total: 0,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [list, setList] = useState<any>([]);
  const [modalProps, setModalShow] = useState({
    show: false,
    productID: 1,
    name: '',
    image: '',
  });
  const [tabStatus, setTabStatus] = useState<CurrentTab>(CurrentTab.NFRS);
  const [options, setOptions] = useState<any>([
    {
      title: 'Collections',
      children: [],
    },
    {
      title: 'Category',
      children: [],
    },
  ]);

  const listContainer = useRef<any>(null);
  const size = useSize(listContainer);
  const getColnumber = (width?: number): number => {
    let num = 2;
    if (!width) {
      return num;
    }
    num = Math.max(Math.round(width / 350), 2);
    return num;
  };
  useEffect(() => {
    if (collection.list && collection.list.length) {
      const arr: any = [];
      collection.list.forEach((item: any) => {
        arr.push({
          ...item,
          checked: false,
        });
      });
      options[0].children = [...arr];
      setOptions([...options]);
    }
  }, [collection]);
  useEffect(() => {
    if (issue.list && issue.list.length) {
      const arr: any = [];
      issue.list.forEach((item: any) => {
        arr.push({
          ...item,
          checked: false,
        });
      });
      options[1].children = [...arr];
      setOptions([...options]);
    }
  }, [issue]);

  useEffect(() => {
    getList(1);
  }, [router, tabStatus]);

  const getList = async (pageNo: number = 1) => {
    setLoading(true);
    if (pageNo === 1) {
      setList([]);
    }
    if (tabStatus === CurrentTab.CAMPAIGNS) {
      getCampaignList().then((res: any) => {
        const rows = res?.data?.rows || [];
        rows.map((item: any) => {
          return (item.type = 'CAMPAIGN');
        });
        setList([...rows]);
        setLoading(false);
      });
      return;
    }
    const collectionAddress: string[] = [];
    const category: string[] = [];
    const {pageSize} = param;
    options[0].children.forEach((child: any) => {
      if (child.checked) {
        collectionAddress.push(child.value);
      }
    });
    options[1].children.forEach((child: any) => {
      if (child.checked) {
        category.push(child.value);
      }
    });
    const res: any = await getNftList({
      pageNo,
      pageSize,
      collectionAddress: collectionAddress.join(','),
      category: category.join(','),
      tokenId: router.query.tokenId ?? '',
    });
    if (res.code === 200) {
      const rows = res?.data?.rows || [];
      if (pageNo === 1) {
        setList([...rows]);
      } else {
        setList([...list, ...rows]);
      }
      setLoading(false);
      setParam({
        ...param,
        pageNo: res.data.page.pageNo,
        total: res.data.page.total,
      });
    }
  };

  // 加载更多
  const loadMore = async () => {
    const {pageNo, total} = param;
    if (list.length < total) {
      await getList(pageNo + 1);
    }
  };

  const handleCheckboxChange = (index1: number, index2: number, e: any) => {
    options[index1].children[index2].checked =
      !options[index1].children[index2].checked;
    setOptions([...options]);
    getList(1);
  };

  const onCloseModal = () => {
    setModalShow({show: false, productID: 1, name: '', image: ''});
  };
  const onClickDetail = (id: number, name: string, image: string) => {
    setModalShow({show: true, productID: id, name, image});
  };
  const onClickViewOn = () => {
    onCloseModal();
  };

  const shiftTab = (status: CurrentTab) => {
    if (!loading) {
      setTabStatus(status);
    }
  };

  return (
    <BrowseContainer id='browse-content-dom'>
      <BrowseOverflowContentContainer style={{flexDirection: 'column'}}>
        <ExploreTab>
          <div
            className={`tab ${tabStatus === CurrentTab.NFRS ? 'active' : ''}`}
            onClick={() => {
              shiftTab(CurrentTab.NFRS);
            }}
          >
            NFRs
          </div>
          <div
            className={`tab ${
              tabStatus === CurrentTab.CAMPAIGNS ? 'active' : ''
            }`}
            onClick={() => {
              shiftTab(CurrentTab.CAMPAIGNS);
            }}
          >
            Campaigns
          </div>
        </ExploreTab>
        <div
          className='mainContent'
          style={{display: 'flex', paddingTop: '32px'}}
        >
          {tabStatus === CurrentTab.NFRS ? (
            <BrowseDrawerContainer>
              <MenuDrawer options={options} onChange={handleCheckboxChange} />
            </BrowseDrawerContainer>
          ) : null}
          <BrowseContentContainer ref={listContainer}>
            {!loading && !list.length && <NoData />}

            <List scrollDomId='browse-content-dom' onLoadMore={loadMore}>
              <Row>
                {!loading &&
                  list.map((item: any, index: number) => (
                    <Col
                      colGutter={24}
                      gutter={16}
                      key={index}
                      span={getColnumber(size?.width)}
                    >
                      <Product data={item} key={item.id} />
                    </Col>
                  ))}
                {loading &&
                  [...Array(20)].map((item: any, index: number) => (
                    <Col
                      colGutter={24}
                      gutter={16}
                      key={index}
                      span={getColnumber(size?.width)}
                    >
                      <SkeletonProduct key={index} />
                    </Col>
                  ))}
              </Row>
            </List>
          </BrowseContentContainer>
        </div>
      </BrowseOverflowContentContainer>
      {modalProps.show ? (
        <ANftDetail
          image={modalProps.image || '/static/ANFT/Azuki2232.png'}
          name={modalProps.name}
          productID={modalProps.productID}
          visable={modalProps.show}
          onClickViewOn={onClickViewOn}
          onClose={onCloseModal}
        />
      ) : null}
    </BrowseContainer>
  );
};

export default Explore;
