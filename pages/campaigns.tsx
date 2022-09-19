import {NextRouter, useRouter} from 'next/router';
import {useState, useEffect} from 'react';
import Skeleton from 'react-loading-skeleton';
import {useRecoilState} from 'recoil';

import type {NextPage} from 'next';

import {ANftDetail, List, NoData, Product, MenuDrawer} from '@/components';
import {getNftList} from '@/services/nft';
import {collectionState} from '@/store/collection';
import {issueState} from '@/store/issue';
import {
  BrowseContainer,
  BrowseDrawerContainer,
  BrowseContentContainer,
  BrowseOverflowContentContainer,
} from '@/styles/explore';
import 'react-loading-skeleton/dist/skeleton.css';
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
  }, [router]);

  const getList = async (pageNo: number = 1) => {
    setLoading(true);
    if (pageNo === 1) {
      setList([]);
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
  return (
    <BrowseContainer id='browse-content-dom'>
      <BrowseOverflowContentContainer>
        <BrowseDrawerContainer>
          <MenuDrawer options={options} onChange={handleCheckboxChange} />
        </BrowseDrawerContainer>
        <BrowseContentContainer>
          {!loading && !list.length && <NoData />}

          <List scrollDomId='browse-content-dom' onLoadMore={loadMore}>
            <div className='list-box'>
              {list.map((item: any, index: number) => (
                <Product
                  data={item}
                  key={item.id}
                  onClick={() => {
                    onClickDetail(item.id, item.name, item.img);
                  }}
                />
              ))}
              {loading &&
                [...Array(20)].map((item: any, index: number) => (
                  <div className='nft-item-box' key={`skeleton-${index}`}>
                    <div className='img-box'>
                      <Skeleton className='img-skeleton' />
                    </div>
                    <div className='title-box'>
                      <Skeleton className='title-skeleton' />
                    </div>
                  </div>
                ))}
            </div>
          </List>
        </BrowseContentContainer>
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
