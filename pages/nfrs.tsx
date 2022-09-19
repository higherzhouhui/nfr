import {useState, useEffect} from 'react';
import Skeleton from 'react-loading-skeleton';
import {useRecoilState} from 'recoil';

import type {NextPage} from 'next';

import {ANftDetail, List, NoData, Product, MenuDrawer} from '@/components';
import {getUserNft} from '@/services/user';
import {collectionState} from '@/store/collection';
import {
  BrowseContainer,
  StudioOperatorContainer,
  BrowseDrawerContainer,
  BrowseContentContainer,
  BrowseOverflowContentContainer,
} from '@/styles/explore';
import {Button} from '@/uikit';
import 'react-loading-skeleton/dist/skeleton.css';
const Studio: NextPage = () => {
  const [collection] = useRecoilState(collectionState);
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
    getList();
  }, []);

  const getList = async (pageNo: number = 1) => {
    setLoading(true);
    if (pageNo === 1) {
      setList([]);
    }
    const collectionAddress: string[] = [];
    const {pageSize} = param;
    options[0].children.forEach((child: any) => {
      if (child.checked) {
        collectionAddress.push(child.value);
      }
    });
    const res: any = await getUserNft({
      pageNo,
      pageSize,
      collectionAddress: collectionAddress.join(','),
    });
    if (res.code === 200) {
      const rows = res?.data || [];
      if (pageNo === 1) {
        setList([...rows]);
      } else {
        setList([...list, ...rows]);
      }
      setLoading(false);
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

  const handleProductCheck = (index: number) => {
    list[index].checked = !list[index].checked;
    setList([...list]);
  };

  const handleSelectAllClick = () => {
    list.map((item: any) => {
      item.checked = true;
      return item;
    });
    setList([...list]);
  };

  const handleCreateClick = () => {
    onClickDetail(list[0].id, list[0].name, list[0].image);
  };

  const onCloseModal = () => {
    setModalShow({show: false, productID: 1, name: '', image: ''});
  };
  const onClickDetail = (id: number, name: string, image: string) => {
    setModalShow({show: true, productID: id, name, image});
  };
  return (
    <BrowseContainer id='browse-content-dom' module='NFRS'>
      <StudioOperatorContainer>
        <div className='studio-operator-content'>
          <h4>Select NFTs you'd like to share the rights to use</h4>
          <div className='btn-box'>
            <Button
              borderRadius={8}
              fontSize={14}
              height={36}
              marginRight={32}
              variant='default'
              width={106}
              onClick={handleSelectAllClick}
            >
              Select All
            </Button>
            <Button
              borderRadius={8}
              fontSize={14}
              height={36}
              variant='primary'
              width={170}
              onClick={handleCreateClick}
            >
              Proceed to creation
            </Button>
          </div>
        </div>
      </StudioOperatorContainer>
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
                  isSelect
                  checked={item.checked}
                  data={item}
                  key={item.token_id}
                  onClick={() => {
                    handleProductCheck(index);
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
          onClickViewOn={onCloseModal}
          onClose={onCloseModal}
        />
      ) : null}
    </BrowseContainer>
  );
};

export default Studio;
