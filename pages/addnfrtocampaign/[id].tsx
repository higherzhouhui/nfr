import {useSize} from 'ahooks';
import {useRouter} from 'next/router';
import {useEffect, useRef, useState} from 'react';

import type {NextPage} from 'next';

import {
  List,
  NoData,
  Product,
  SkeletonProduct,
  SuccessModal,
} from '@/components';
import {RouterPath} from '@/config/routes';
import {addMyCampaignNfrs, getMyCampaignNfrs} from '@/services/campaign';
import {CampaignContainer, CampaignStepTwo} from '@/styles/createcampaign';
// eslint-disable-next-line import/order
import {Button, Col, Row} from '@/uikit';
import {IMessageType, showTip} from '@/utils';

import 'react-datepicker/dist/react-datepicker.css';

const AddNfrTOCampaign: NextPage = () => {
  const router = useRouter();
  const {id} = router.query;
  const [checkedList, setCheckedList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [list, setList] = useState<any[]>([]);
  const [sucModalProps, setsucModalProps] = useState({
    show: false,
    loading: 1,
  });
  const listContainer = useRef<any>(null);
  const size = useSize(listContainer);
  const getColnumber = (width?: number): number => {
    let num = 2;
    if (!width) {
      return num;
    }
    num = Math.max(Math.round(width / 300), 2);
    return num;
  };
  const handleProductCheck = (id: number) => {
    list.forEach((item: any) => {
      if (item.id === id) {
        item.checked = !item.checked;
      }
    });
    setList([...list]);
    const checkList = list.filter((item: any) => {
      return item.checked;
    });
    setCheckedList(checkList);
  };

  const handleSelectAll = () => {
    const isSelectAll = list.every((item: any) => {
      return item.checked;
    });
    if (isSelectAll) {
      list.forEach((item: any) => {
        item.checked = false;
      });
      setList([...list]);
      setCheckedList([]);
    } else {
      list.forEach((item: any) => {
        item.checked = true;
      });
      setList([...list]);
      setCheckedList(list);
    }
  };

  const loadMore = () => {};

  const onClickBack = () => {
    router.back();
  };

  const onClickCreation = () => {
    if (!checkedList.length) {
      showTip({
        type: IMessageType.WARN,
        content: 'Please select at least one nfr',
      });
      return;
    }
    setsucModalProps({show: true, loading: 1});
    const mintedIds: number[] = [];
    checkedList.forEach((item: any) => {
      mintedIds.push(item.id);
    });
    addMyCampaignNfrs({
      campaign_id: parseInt(id as any, 10),
      mint_id: mintedIds,
    }).then((res: any) => {
      if (res?.code === 200) {
        setsucModalProps({show: true, loading: 0});
      } else {
        setsucModalProps({show: false, loading: 0});
      }
    });
  };

  const getUserOwnedNfrs = (campaignId: number) => {
    setLoading(true);
    getMyCampaignNfrs(campaignId).then((res: any) => {
      if (res?.code === 200) {
        const data = res?.data?.rows || [];
        data.forEach((item: any) => {
          item.type = 'ADDTOCAMPAIGN';
          item.img = item.url;
        });
        setList(data);
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    getUserOwnedNfrs(id as any);
  }, [id]);

  return (
    <CampaignContainer>
      <div className='header'>
        <h1>Add your NFRs to your Campaign</h1>
      </div>
      <div className='campaignTwoTitle'>
        <div className='title'>Select the NFRs you want to create</div>
        <div className='operation'>
          <Button
            height={36}
            marginRight={32}
            variant='text'
            width={80}
            onClick={onClickBack}
          >
            Back
          </Button>
          <Button
            height={36}
            marginRight={32}
            width={106}
            onClick={handleSelectAll}
          >
            Select All
          </Button>
          <Button
            height={36}
            variant={checkedList.length ? 'subtle' : 'default'}
            width={170}
            onClick={onClickCreation}
          >
            Proceed to creation
          </Button>
        </div>
      </div>
      <CampaignStepTwo ref={listContainer}>
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
                  <Product
                    checked={item.checked}
                    data={item}
                    key={index}
                    onClick={() => {
                      handleProductCheck(item.id);
                    }}
                  />
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
      </CampaignStepTwo>
      <SuccessModal
        dangerouslySetInnerHTML={{
          __html: `View the details of this <a href=${RouterPath.campaignDetail(
            (id as any) || 1
          )}>Campaign</a>`,
        }}
        loading={sucModalProps.loading}
        title='Add NFRs Successful'
        visible={sucModalProps.show}
        onClose={() => router.push(RouterPath.campaignDetail((id as any) || 1))}
      />
    </CampaignContainer>
  );
};

export default AddNfrTOCampaign;
