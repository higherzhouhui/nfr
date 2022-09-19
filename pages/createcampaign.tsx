import {useSize} from 'ahooks';
// import Image from 'next/image';
import {useRouter} from 'next/router';
import {useEffect, useRef, useState} from 'react';
import DatePicker from 'react-datepicker';
import {useForm} from 'react-form';
import {useRecoilState} from 'recoil';

import type {NextPage} from 'next';

import {
  InputField,
  List,
  Loading,
  MultiSelectField,
  NoData,
  Product,
  SkeletonProduct,
  SuccessModal,
  TextareaField,
  UploadPonents,
} from '@/components';
import {RouterPath} from '@/config/routes';
import {
  createCampaignRequest,
  getMyCampaignNfrs,
  updateCampaignRequest,
} from '@/services/campaign';
import {IUserRequestType} from '@/services/user';
import {collectionState} from '@/store/collection';
import {userState} from '@/store/user';
import {
  CampaignContainer,
  CampaignContent,
  CampaignStepTwo,
} from '@/styles/createcampaign';
import {FormItemContainer} from '@/styles/createnfr';
// eslint-disable-next-line import/order
import {Button, Col, Prompt, Row, SvgIcon, Image, Select} from '@/uikit';
import {formatDateToString, IMessageType, showTip} from '@/utils';
import 'react-datepicker/dist/react-datepicker.css';

const CreateCampaign: NextPage = () => {
  const router = useRouter();
  const [collection] = useRecoilState(collectionState);
  const [checkedList, setCheckedList] = useState<any[]>([]);
  const [expirationDate, setExpirationDate] = useState<any>(
    new Date(formatDateToString(new Date(), true))
  );
  const [uploadingCover, setUploading] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [list, setList] = useState<any[]>([]);
  const [img, setImg] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [filePath, setFilePath] = useState({
    path: '',
    name: '',
  });
  const [user] = useRecoilState(userState);
  const [multiValues, setMultiValues] = useState<any[]>();
  const requestData = useRef<any>(null);
  const onChangeFilePath = (name: string, filePath: string) => {
    setFilePath({
      name,
      path: filePath,
    });
  };
  const [nextLoading, setNextLoading] = useState(false);
  const onChangeImagePath = (_name: string, filePath: string) => {
    setImg(filePath);
  };
  const [sucModalProps, setsucModalProps] = useState({
    show: false,
    loading: 1,
  });
  const listContainer = useRef<any>(null);
  const size = useSize(listContainer);
  const [blurFlag, setBlurFlag] = useState({
    projectCover: false,
    describle: false,
    payment: false,
    collection: false,
    status: false,
  });
  const paymentOptions: any = [
    {label: 'Pay upfront', value: 'Pay upfront'},
    {label: 'Split revenue', value: 'Split revenue'},
  ];
  const statusOptions: any = [
    {label: 'Pre-Mint', value: 'Pre-Mint'},
    {label: 'Mint', value: 'Mint'},
    {label: 'After-Mint', value: 'After-Mint'},
  ];
  const [selectPayment, setPayment] = useState<any>();
  const handleSelectPaymentFliter = (item: any) => {
    setPayment(item.value);
  };
  const [selectStatus, setStatus] = useState<any>();
  const handleSelectStatusFliter = (item: any) => {
    setStatus(item.value);
  };
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

  const isCansubmit = (cansubmit: boolean): boolean => {
    if (!cansubmit) {
      return true;
    }
    if (img && selectPayment && selectStatus) {
      return false;
    }
    return true;
  };

  const {
    Form,
    meta: {canSubmit},
  } = useForm({
    validate: (values: any) => {},
    onSubmit: async (values: any) => {
      const {name, collections, describe, link} = values;
      const labels: string[] = [];
      collections.forEach((item: any) => {
        labels.push(item.label);
      });
      requestData.current = {
        name,
        expiration_date_begin: formatDateToString(new Date()),
        expiration_date_end: formatDateToString(expirationDate),
        describe,
        attachment_url: filePath.path,
        link,
        img,
        mint_nfts: [],
        collections: labels,
        payment: selectPayment,
        status: selectStatus,
      };
      createCampaign(requestData.current);
    },
    debugForm: false,
  });

  const createCampaign = (data: any) => {
    setNextLoading(true);
    createCampaignRequest(data).then((res: any) => {
      setNextLoading(false);
      if (res?.code === 200) {
        requestData.current.id = res?.data;
        setCurrentStep(2);
        getUserOwnedNfrs(requestData.current.id);
      }
    });
  };

  const onClickCancel = () => {
    router.back();
  };

  const onClickStep = () => {
    setBlurFlag({
      payment: true,
      describle: true,
      collection: true,
      projectCover: true,
      status: true,
    });
    // 测试
    // setCurrentStep(2);
  };

  const onClickSkip = () => {
    router.push(RouterPath.campaignDetail(requestData.current.id || 1));
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
    checkedList.forEach((item: any) => {
      requestData.current?.mint_nfts?.push(item.id);
    });
    updateCampaignRequest(requestData.current).then((res: any) => {
      if (res?.code === 200) {
        setsucModalProps({show: true, loading: 0});
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
    setUploading(true);
  }, [img]);

  return (
    <CampaignContainer>
      <div className='header'>
        <h1>
          {currentStep === 1
            ? 'Create Campaign'
            : 'Add your NFRs to the campaign'}
        </h1>
      </div>
      {currentStep === 2 && (
        <div className='campaignTwoTitle'>
          <div className='title'>Select the NFRs you want to create</div>
          <div className='operation'>
            <Button
              height={36}
              marginRight={32}
              variant='text'
              width={80}
              onClick={onClickSkip}
            >
              Skip
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
      )}
      <CampaignContent style={{display: currentStep === 1 ? 'flex' : 'none'}}>
        <aside>
          <h2>Project Cover</h2>
          <div className='uploadContainer'>
            <UploadPonents
              accept='image/*'
              loadingSize='large'
              onChange={onChangeImagePath}
            >
              <div className='content'>
                {!img ? (
                  <>
                    <Button height={36} variant='subtle' width={132}>
                      Upload image
                    </Button>
                    <div className='sizeTip'>Minimum size 410pxX410px</div>
                  </>
                ) : (
                  <>
                    <Image
                      alt='cover'
                      layout='fill'
                      objectFit='contain'
                      src={img}
                      onLoad={() => {
                        setUploading(false);
                      }}
                    />
                    {uploadingCover && (
                      <div
                        className='loading'
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <div>
                          <Loading size='large' />
                        </div>
                      </div>
                    )}
                  </>
                )}
                {img && !uploadingCover ? (
                  <div className='replaceImage'>
                    <SvgIcon height={16} name='replace-image' width={16} />
                    <span>Replace the image</span>
                  </div>
                ) : blurFlag.projectCover ? (
                  <p className='error'>project cover is required!</p>
                ) : null}
              </div>
            </UploadPonents>
          </div>
        </aside>
        <section>
          <Form>
            <FormItemContainer>
              <p>Campaign name</p>
              <InputField
                field='name'
                placeholder='Give me a name'
                validate={(value: string) => {
                  if (!value) {
                    return 'Campaign name is required!';
                  }
                  return false;
                }}
              />
            </FormItemContainer>
            <FormItemContainer>
              <p>Expiration date</p>
              <DatePicker
                className='datePicker'
                placeholderText='Select date'
                selected={expirationDate}
                onChange={(date: Date) => {
                  setExpirationDate(date);
                }}
              />
            </FormItemContainer>
            <FormItemContainer>
              <div className='qmark'>
                Target collections
                <Prompt text="Select collections you'd like to acquire NFRs from">
                  <SvgIcon height={16} name='create-qmark' width={16} />
                </Prompt>
              </div>
              <MultiSelectField
                field='collections'
                options={collection.list || []}
                placeholder='select collections'
                validate={(value: string) => {
                  if (!value || !value.length) {
                    return 'collections is required!';
                  }
                  return false;
                }}
                value={multiValues}
                onAddOption={() => {}}
                onChange={(value: any[]) => {
                  setMultiValues(value);
                }}
                onSearch={() => {}}
              />
            </FormItemContainer>
            <FormItemContainer>
              <p>Describe the campaign briefly</p>
              <TextareaField
                field='describe'
                placeholder='Please input describe'
                validate={(value: string) => {
                  if (value && value.length > 3000) {
                    return 'No more than 3000 words';
                  }
                  if (!value) {
                    return 'describe is required!';
                  }
                  return false;
                }}
              />
            </FormItemContainer>
            <FormItemContainer>
              <div className='attach'>
                <UploadPonents onChange={onChangeFilePath}>
                  <div className='content'>
                    {filePath.name ? (
                      filePath.name
                    ) : (
                      <>
                        <span>Provide the detailed proposal</span>
                        <SvgIcon height={16} name='detail-attach' width={16} />
                      </>
                    )}
                  </div>
                </UploadPonents>
              </div>
            </FormItemContainer>
            <FormItemContainer>
              <p>Useful links (website,twitter, discord,..etc.)</p>
              <InputField field='link' placeholder='Please enter' />
            </FormItemContainer>
            <FormItemContainer style={{width: '250px'}}>
              <div className='qmark'>
                Payment
                <Prompt text='choose one payment way'>
                  <SvgIcon height={16} name='create-qmark' width={16} />
                </Prompt>
              </div>
              <Select
                borderRadius={4}
                defaultValue={selectPayment}
                fontSize={14}
                height={40}
                minHeight={32}
                options={paymentOptions}
                placeholder='Select payment'
                width='100%'
                onBlur={() => {
                  setBlurFlag({...blurFlag, payment: true});
                }}
                onChange={(value: any) => {
                  handleSelectPaymentFliter(value);
                }}
              />
              {!selectPayment && blurFlag.payment && (
                <p className='error'>Payment is required!</p>
              )}
            </FormItemContainer>
            <FormItemContainer style={{width: '250px'}}>
              <div className='qmark'>
                Status
                <Prompt text='choose one status'>
                  <SvgIcon height={16} name='create-qmark' width={16} />
                </Prompt>
              </div>
              <Select
                borderRadius={4}
                defaultValue={selectStatus}
                fontSize={14}
                height={40}
                minHeight={32}
                options={statusOptions}
                placeholder='Select status'
                width='100%'
                onBlur={() => {
                  setBlurFlag({...blurFlag, status: true});
                }}
                onChange={(value: any) => {
                  handleSelectStatusFliter(value);
                }}
              />
              {!selectStatus && blurFlag.status && (
                <p className='error'>Status is required!</p>
              )}
            </FormItemContainer>
            <div className='campaignSubmit'>
              <Button
                height={56}
                variant='text'
                width={120}
                onClick={onClickCancel}
              >
                Cancel
              </Button>
              <Button
                border='1px solid #2590ff'
                borderRadius={8}
                disabled={isCansubmit(canSubmit)}
                height={56}
                isLoading={nextLoading}
                type='submit'
                variant='primary'
                width={320}
                onClick={onClickStep}
              >
                Next Step
              </Button>
            </div>
          </Form>
        </section>
      </CampaignContent>
      <CampaignStepTwo
        ref={listContainer}
        style={{display: currentStep === 2 ? 'block' : 'none'}}
      >
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
          __html: `Check out this Campaign in my <a href=${RouterPath.profile(
            user.id || 1,
            IUserRequestType.Campaign
          )}>profile</a>`,
        }}
        loading={sucModalProps.loading}
        title='Campaign created'
        visible={sucModalProps.show}
        onClose={() =>
          router.push(
            RouterPath.profile(user.id || 1, IUserRequestType.Campaign)
          )
        }
      />
    </CampaignContainer>
  );
};

export default CreateCampaign;
