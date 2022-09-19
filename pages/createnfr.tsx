import {useSize} from 'ahooks';
// import Image from 'next/image';
import {useRouter} from 'next/router';
import {FC, memo, useEffect, useRef, useState} from 'react';
import DatePicker from 'react-datepicker';
import {useForm} from 'react-form';
import {useRecoilState} from 'recoil';

import type {NextPage} from 'next';

import {
  InputField,
  List,
  NoData,
  Product,
  SkeletonProduct,
  SuccessModal,
  UploadPonents,
} from '@/components';
import {aliOss} from '@/config';
import {RouterPath} from '@/config/routes';
import {useEthersUtils, useSigner} from '@/ethers-react';
import {getCollectionDetail} from '@/services/common';
import {lazyMintNft, searchMyNft} from '@/services/nft';
import {getNonce, getUserNft} from '@/services/user';
import {userState} from '@/store/user';
import {
  CollectionContainerComp,
  CreateNfrsContainer,
  CreteNfrsStepContent,
  FormItemContainer,
  StepContainerComp,
  StepThreeContainer,
} from '@/styles/createnfr';
import {
  Button,
  Col,
  Row,
  SvgIcon,
  Select,
  Prompt,
  Input,
  TextArea,
  IconInput,
  Image,
} from '@/uikit';
import {formatDateToString, IMessageType, showTip} from '@/utils';

import 'react-datepicker/dist/react-datepicker.css';

export interface ICollectionDetail {
  id: number;
  address: string;
  banner: string;
  logo: string;
  name: string;
}

const CreateNfrs: NextPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [collectionList, setCollectionList] = useState<ICollectionDetail[]>([]);
  const [productList, setProductList] = useState<any[]>([]);
  const listContainer = useRef<any>(null);
  const checkedList = useRef<any>(null);
  const size = useSize(listContainer);
  const [serachValue, setSearchValue] = useState('');
  const [chooseCollection, setChooseCollection] = useState('');
  const {address, campaignId} = router.query;
  const getColnumber = (width?: number): number => {
    let num = 2;
    if (!width) {
      return num;
    }
    num = Math.max(Math.round(width / 300), 2);
    return num;
  };

  const stepParams = [
    {
      step: 1,
      des: 'Choose your collection',
    },
    {
      step: 1,
      des: 'Choose your collection',
    },
    {
      step: 2,
      des: "Select NFTs you'd like to share the rights to use",
    },
    {
      step: 3,
      des: 'Fill in NFR details',
    },
  ];
  const [currentStep, setStep] = useState(stepParams[1]);

  const onClickStepTwo = async (address: string) => {
    setStep(stepParams[2]);
    setLoading(true);
    setChooseCollection(address);
    const res: any = await getUserNft({
      collectionAddress: address,
    });
    if (res?.code === 200) {
      const rows = res?.data || [];
      rows.forEach((item: any) => {
        item.type = 'SELECT';
      });
      setProductList(rows);
      setLoading(false);
    }
  };

  const onClickStepThree = () => {
    if (checkedList?.current?.length) {
      setStep(stepParams[3]);
    } else {
      showTip({
        type: IMessageType.WARN,
        content: 'Please select at least one nft',
      });
    }
  };

  const onClickBackStep = (step: number) => {
    // 清空选中列表当回去选collection
    if (step === 1) {
      checkedList.current = [];
    }
    setStep(stepParams[step]);
  };

  const handleProductCheck = (id: number) => {
    productList.forEach((item: any) => {
      if (item.token_id === id) {
        item.checked = !item.checked;
      }
    });
    setProductList([...productList]);
    const checkList = productList.filter((item: any) => {
      return item.checked;
    });
    checkedList.current = checkList;
  };
  const handleSelectAllClick = () => {
    const isSelectAll = productList.every((item: any) => {
      return item.checked;
    });
    if (isSelectAll) {
      productList.forEach((item: any) => {
        item.checked = false;
      });
      setProductList([...productList]);
      checkedList.current = [];
    } else {
      productList.forEach((item: any) => {
        item.checked = true;
      });
      setProductList([...productList]);
      checkedList.current = productList;
    }
  };
  const onClickCreate = () => {};

  // 回车事件
  const handleKeyDownClick = (e: any) => {
    if (e.keyCode === 13) {
      setLoading(true);
      searchMyNft({
        collectionAddress: chooseCollection,
        nftName: serachValue,
      }).then((res: any) => {
        setLoading(false);
        if (res?.code === 200) {
          const data = res?.data;
          data.forEach((item: any) => {
            item.type = 'SELECT';
          });
          setProductList(data);
        }
      });
    }
  };

  useEffect(() => {
    if (!checkedList.current) {
      checkedList.current = [];
    }
    setLoading(true);
    if (!collectionList.length) {
      const staticData = [
        {logo: '0logo.png', banner: '0banner.png'},
        {logo: '1logo.png', banner: '1banner.png'},
        {logo: '2logo.png', banner: '2banner.png'},
        {logo: '3logo.png', banner: '3banner.png'},
        {logo: '4logo.png', banner: '4banner.png'},
        {logo: '5logo.png', banner: '5banner.png'},
      ];
      getCollectionDetail().then((res: any) => {
        setLoading(false);
        const data = res?.data;
        data.forEach((item: any, index: number) => {
          item.logo = `${aliOss}/image/${staticData[index].logo}`;
          item.banner = `${aliOss}/image/${staticData[index].banner}`;
        });
        let newCollectionList: any[] = res?.data;
        if (address) {
          newCollectionList = [];
          const addressList: string[] = (address as any).split(',');
          addressList.forEach((item) => {
            res?.data.forEach((ritem: any) => {
              if (ritem.address === item) {
                newCollectionList.push(ritem);
              }
            });
          });
        }
        setCollectionList(newCollectionList);
      });
    }
  }, []);

  return (
    <CreateNfrsContainer>
      <CreteNfrsStepContent>
        <div className='title'>
          <h1>Create NFRs</h1>
          <h4>Follow the simple 3 steps to complete your mapping.</h4>
          <div className='division' />
          {currentStep.step === 2 ? (
            <div className='step2Container'>
              <div className='searchInput'>
                <SvgIcon height={24} name='search-icon' width={24} />
                <Input
                  borderRadius={50}
                  paddingLeft={50}
                  placeholder='search by tokeId or nft name'
                  value={serachValue}
                  onChange={(e) => {
                    setSearchValue(e.target.value);
                  }}
                  onKeyDown={handleKeyDownClick}
                />
              </div>
              <Button height={36} width={106} onClick={handleSelectAllClick}>
                Select All
              </Button>
              <Button
                height={36}
                variant='text'
                width={106}
                onClick={() => {
                  onClickBackStep(1);
                }}
              >
                Back
              </Button>
              <Button
                height={36}
                variant={checkedList?.current?.length ? 'subtle' : 'default'}
                width={106}
                onClick={onClickStepThree}
              >
                Next Step
              </Button>
            </div>
          ) : currentStep.step === 3 ? (
            <div className='step2Container'>
              <Button
                height={36}
                variant='text'
                width={106}
                onClick={() => {
                  onClickBackStep(2);
                }}
              >
                Back
              </Button>
              <Button
                height={36}
                style={{visibility: 'hidden'}}
                variant='subtle'
                width={106}
                onClick={onClickCreate}
              >
                Create
              </Button>
            </div>
          ) : null}
        </div>
        <main>
          <aside>
            <StepContainer step={currentStep.step} />
          </aside>
          <section>
            <p className='step'>Step {currentStep.step}/3</p>
            <h2>{currentStep.des}</h2>
            <div className='list' ref={listContainer}>
              {!loading && currentStep.step === 2 && !productList.length && (
                <NoData />
              )}
              {currentStep.step === 3 && (
                <CreateNfrsForm nfts={checkedList.current} />
              )}
              <List scrollDomId='browse-content-dom'>
                <Row>
                  {!loading &&
                    currentStep.step === 1 &&
                    collectionList.map(
                      (item: ICollectionDetail, index: number) => (
                        <Col
                          colGutter={24}
                          gutter={24}
                          key={index}
                          span={getColnumber(size?.width)}
                        >
                          <CollectionContainer
                            detail={item}
                            onClick={() => {
                              onClickStepTwo(item?.address);
                            }}
                          />
                        </Col>
                      )
                    )}
                  {!loading &&
                    currentStep.step === 2 &&
                    productList.map((item: any, index: number) => (
                      <Col
                        colGutter={24}
                        gutter={24}
                        key={index}
                        span={getColnumber(size?.width)}
                      >
                        <Product
                          hideWaterMark
                          checked={item?.checked}
                          data={item}
                          key={index}
                          onClick={() => {
                            handleProductCheck(item.token_id);
                          }}
                        />
                      </Col>
                    ))}
                  {loading &&
                    [...Array(20)].map((item: any, index: number) => (
                      <Col
                        colGutter={24}
                        gutter={24}
                        key={index}
                        span={getColnumber(size?.width)}
                      >
                        <SkeletonProduct key={index} />
                      </Col>
                    ))}
                </Row>
              </List>
            </div>
          </section>
        </main>
      </CreteNfrsStepContent>
    </CreateNfrsContainer>
  );
};

type StepContainerProps = {
  step: number;
};
const StepContainer: FC<StepContainerProps> = memo(({step}) => {
  return (
    <StepContainerComp>
      <div className='rowContainer'>
        <div className={`svgWrapper ${step >= 1 ? 'activeSvg' : ''}`}>
          <SvgIcon
            height={24}
            name={step > 1 ? 'createnfr-done' : 'createnfr-step1'}
            width={24}
          />
        </div>
        <div className='wordDes'>
          <div className='wtitle'>Choose collection</div>
          <div className='des'>
            Create NFRs in batch within the same collection
          </div>
        </div>
        <div className={`circle ${step >= 1 ? 'activeCircle' : ''}`} />
      </div>
      <div className='rowContainer step2'>
        <div className={`svgWrapper ${step >= 2 ? 'activeSvg' : ''}`}>
          <SvgIcon
            height={24}
            name={step > 2 ? 'createnfr-done' : 'createnfr-step2'}
            width={24}
          />
        </div>
        <div className='wordDes'>
          <div className='wtitle'>Select NFTs</div>
          <div className='des'>Select parent NFTs</div>
        </div>
        <div className={`circle ${step >= 2 ? 'activeCircle' : ''}`} />
      </div>
      <div className='rowContainer step3'>
        <div className={`svgWrapper ${step === 3 ? 'activeSvg' : ''}`}>
          <SvgIcon
            height={24}
            name={step > 3 ? 'createnfr-done' : 'createnfr-step3'}
            width={24}
          />
        </div>
        <div className='wordDes'>
          <div className='wtitle'>Spec and create!</div>
          <div className='des'>Spec your NFRs</div>
        </div>
        <div className={`circle ${step === 3 ? 'activeCircle' : ''}`} />
      </div>
    </StepContainerComp>
  );
});

StepContainer.displayName = 'StepContainer';

type CollectionProps = {
  detail: ICollectionDetail;
  onClick: () => void;
};

const CollectionContainer: FC<CollectionProps> = memo(({detail, onClick}) => {
  return (
    <CollectionContainerComp onClick={onClick}>
      <div className='logo'>
        <Image
          pad
          alt='banner'
          layout='fill'
          objectFit='cover'
          src={detail.banner}
        />
      </div>
      <div className='headName'>
        <div className='head'>
          <Image
            noCut
            alt='logo'
            layout='fill'
            objectFit='cover'
            src={detail.logo}
          />
        </div>
        <div className='name'>{detail.name}</div>
      </div>
    </CollectionContainerComp>
  );
});

CollectionContainer.displayName = 'CollectionContainer';

type CreateNfrsFormProps = {
  nfts: GlobalNft.Nft[];
};

export const CreateNfrsForm: FC<CreateNfrsFormProps> = memo(({nfts}) => {
  const router = useRouter();
  const [expirationDate, setExpirationDate] = useState<any>(
    new Date(formatDateToString(new Date(), true))
  );
  const [parentName, setparentName] = useState('');
  const [describe, setDescribe] = useState('');
  const [price, setPrice] = useState('');
  const parentNfts = useRef<any>(null);
  const [filePath, setFilePath] = useState({
    path: '',
    name: '',
  });
  const [sucModalProps, setsucModalProps] = useState({
    show: false,
    loading: 1,
  });
  const options: any = [
    {label: 'Collabs', value: 1},
    {label: 'Derivatives', value: 2},
    {label: 'Renting', value: 3},
  ];
  const paymentOptions: any = [
    {label: 'Pay upfront', value: 'Pay upfront'},
    {label: 'Split revenue', value: 'Split revenue'},
  ];
  const [selectPayment, setPayment] = useState<any>();
  const [selectIssue, setIssue] = useState<any>();
  const [blurFlag, setBlurFlag] = useState({
    category: false,
    describle: false,
    payment: false,
    price: false,
  });
  const getParentName = (pnfts: GlobalNft.Nft[]) => {
    parentNfts.current = pnfts;
    const cparentName: any[] = [];
    pnfts.forEach((item) => {
      cparentName.push(item.name);
    });
    setparentName(cparentName.join(','));
  };

  const onChangeFilePath = (name: string, filePath: string) => {
    setFilePath({
      name,
      path: filePath,
    });
  };

  const handleSelectFliter = (item: any) => {
    setIssue(item);
    setDefaultDescible(item);
  };

  const handleSelectPaymentFliter = (item: any) => {
    setPayment(item);
    const cp = price;
    if (item.value === 'Split revenue') {
      setPrice('0');
    } else {
      setPrice('');
    }
  };

  const onTextareaChange = (e: any) => {
    const value = e.target?.value;
    setDescribe(value);
  };

  const onPriceInputChange = (e: any) => {
    const value = e.target?.value;
    setPrice(value);
  };

  const {
    Form,
    values,
    meta: {canSubmit},
  } = useForm({
    validate: (values) => {
      // console.log(values);
    },
    debugForm: false,
    onSubmit: async (values) => {
      const {attachment, number_limination} = values;
      setsucModalProps({show: true, loading: 1});
      const sign = await getMetaMaskSign();
      if (sign.errorMsg) {
        showTip({type: IMessageType.ERROR, content: sign.errorMsg});
        setsucModalProps({show: false, loading: 0});
        return;
      }
      const obj = {
        price: parseFloat(price),
        attachment: attachment || '',
        describe,
        number_limination: parseInt(number_limination, 10),
        issue: selectIssue?.value || 1,
        nfts: parentNfts.current,
        expiration_time: formatDateToString(expirationDate),
        sign: sign.signature,
        payment: selectPayment?.value,
      };
      createRequest(obj);
    },
  });

  // 获取nonce请求
  const getNonceRequest = async (account: string) => {
    const res = await getNonce({
      address: account,
    });
    if (res.code === 200) {
      return res.data;
    }
    return null;
  };
  const [user] = useRecoilState(userState);
  const {getHashId} = useEthersUtils();
  const {getSignMessage} = useSigner();

  const getMetaMaskSign = async () => {
    const nonce = await getNonceRequest((user.account || '') as string);
    const msg = getHashId(`this is a pd1 ${nonce}`);
    let signature;
    let errorMsg;
    try {
      signature = await getSignMessage(msg);
    } catch (error: any) {
      errorMsg =
        error?.message ||
        'MetaMask Message Signature: User denied message signature.';
    }
    return {signature, errorMsg};
  };

  const createRequest = (obj: any) => {
    lazyMintNft(obj).then((res: any) => {
      setsucModalProps({show: true, loading: 0});
    });
  };
  const setDefaultDescible = (selectIs: any) => {
    if (selectIs) {
      const des = `This PoR serves as the reference of a collab between both sides to commercially use ${parentName} to produce and sell ${selectIs.label} works.`;
      setDescribe(des);
    }
  };
  const handleCreate = () => {
    setBlurFlag({
      category: true,
      describle: true,
      payment: true,
      price: true,
    });
  };

  const isCansubmit = (cansubmit: boolean): boolean => {
    if (!cansubmit) {
      return true;
    }
    if (describe && price && selectPayment) {
      return false;
    }
    return true;
  };
  useEffect(() => {
    getParentName(nfts);
  }, [nfts]);

  return (
    <StepThreeContainer>
      <Form>
        <FormItemContainer>
          <p>Parent Name</p>
          <InputField disabled field='parentName' value={parentName} />
        </FormItemContainer>
        <div className='twoRow'>
          <FormItemContainer>
            <p>Category</p>
            <Select
              borderRadius={4}
              defaultValue={selectIssue}
              fontSize={14}
              height={40}
              minHeight={32}
              options={options}
              placeholder='Select category'
              width='100%'
              onBlur={() => {
                setBlurFlag({...blurFlag, category: true});
              }}
              onChange={(value: any) => {
                handleSelectFliter(value);
              }}
            />
            {!selectIssue && blurFlag.category && (
              <p className='error'>category is required!</p>
            )}
          </FormItemContainer>
          <span />
          <FormItemContainer>
            <p>Limitation on number of usage</p>
            <InputField
              defaultValue={1}
              field='number_limination'
              filterValue={(value: string) => {
                if (value) {
                  const val = parseFloat(value);
                  if (val > 999999) {
                    return 999999;
                  }
                  if (val < 0) {
                    return 1;
                  }
                }
                return value;
              }}
              placeholder='Please input Limitation'
              type='number'
              validate={(value: string) => {
                if (!value) return 'Limitation is required!';
                return false;
              }}
            />
          </FormItemContainer>
        </div>
        <FormItemContainer>
          <p>Expiration date</p>
          <DatePicker
            className='datePicker'
            selected={expirationDate}
            onChange={(date: Date) => {
              setExpirationDate(date);
            }}
          />
        </FormItemContainer>
        <FormItemContainer>
          <p>Describe the Proof of Rights briefly</p>
          <TextArea
            placeholder='Please input describe'
            rows={5}
            value={describe}
            onBlur={() => {
              setBlurFlag({...blurFlag, describle: true});
            }}
            onChange={onTextareaChange}
          />
          {!describe && blurFlag.describle && (
            <p className='error'>describle is required!</p>
          )}
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
          <p>Set a price</p>
          <IconInput
            disabled={selectPayment?.value === 'Split revenue'}
            leftIcon={
              <div
                style={{
                  fontSize: '16px',
                  fontWeight: 600,
                }}
              >
                ETH
              </div>
            }
            paddingLeft={72}
            placeholder='Set a price'
            type='number'
            value={price}
            onBlur={() => {
              setBlurFlag({...blurFlag, price: true});
            }}
            onChange={onPriceInputChange}
          />
          {!price && blurFlag.price && (
            <p className='error'>Price is required!</p>
          )}
        </FormItemContainer>
        <Button
          className='create'
          disabled={isCansubmit(canSubmit)}
          height={36}
          type='submit'
          variant='subtle'
          width={106}
          onClick={handleCreate}
        >
          Create
        </Button>
      </Form>
      <div className='rightSide'>
        <div className='selectNfts'>
          <h3>Selected NFTs</h3>
          {nfts.length > 1 && <span>{nfts.length}NFTs</span>}
        </div>
        <div className='imageWrapper'>
          <Image
            alt='nft'
            layout='fill'
            src={nfts[0]?.img || '/static/ANFT/Azuki8548.png'}
          />
        </div>
        {nfts.length > 1 && (
          <div className='nftsList'>
            {[...Array(3)].map((item, index) => {
              return (
                <div className='nftWrapper' key={index}>
                  <div className='nftImage'>
                    {nfts[index + 1] && (
                      <Image
                        alt='nft'
                        layout='fill'
                        src={nfts[index + 1].img}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <SuccessModal
        dangerouslySetInnerHTML={{
          __html: `Check out this NFR in my <a href=${RouterPath.profile(
            user.id || 1
          )}>profile</a>`,
        }}
        loading={sucModalProps.loading}
        title='NFR created'
        visible={sucModalProps.show}
        onClose={() => router.push(RouterPath.profile(user.id || 1))}
      />
    </StepThreeContainer>
  );
});

CreateNfrsForm.displayName = 'CreateNfrsForm';

export default CreateNfrs;
