/* eslint-disable import/order */
// import Image from 'next/image';
import {useRouter} from 'next/router';
import {
  FC,
  memo,
  useState,
  useRef,
  useEffect,
  forwardRef,
  useCallback,
} from 'react';
import {useDropzone} from 'react-dropzone';
import {splitFormProps, useField, useForm} from 'react-form';
import {
  FormItemContainer,
  MintDetailModal,
  ModalLoading,
  NomintDetailModal,
  SuccessComp,
  UploadComp,
} from './styles';
import {Loading} from '@/components';
import {uploadFile} from '@/services/file';
import {Modal, SvgIcon, Button, IconInput, Select, Image} from '@/uikit';
import {useContract} from '@/ethers-react';

type ANftDetailType = {
  productID: number;
  name: string;
  image: string;
  onClose?: () => void;
  visable?: boolean;
  onClickViewOn?: () => void;
  status?: string;
};

export interface ANftDetailAttr {
  name?: string;
  src?: string;
  title?: string;
}

export const ANftDetail: FC<ANftDetailType> = memo((props) => {
  const router = useRouter();
  const minteStatus = router.pathname !== '/studio';
  return (
    <Modal
      height=''
      maxWidth='90%'
      visible={props.visable}
      width=''
      onClose={props.onClose}
    >
      {minteStatus ? (
        <Minted
          image={props.image}
          name={props.name}
          productID={props.productID}
          onClickViewOn={props.onClickViewOn}
        />
      ) : (
        <NoMint
          image={props.image}
          name={props.name}
          productID={props.productID}
          onClickViewOn={props.onClickViewOn}
          onClose={props.onClose}
        />
      )}
    </Modal>
  );
});

ANftDetail.displayName = 'ANftDetail';

const Minted: FC<ANftDetailType> = memo((props) => {
  const timer = useRef<any>(null);
  const {getContract} = useContract();
  const [detail, setDetail] = useState<GlobalNft.Nft>();
  const [timeDown, setTimeDown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [lookMore, setLookMore] = useState(false);
  const getTimeDown = (over?: number) => {
    let overDate = (over || 1657993070) * 1000 || 1657993070210;
    const getTheTime = () => {
      const curDate = new Date().getTime();
      if (overDate < curDate) {
        overDate = curDate + 86400000 * 4;
      }
      let t = (overDate - curDate) / 1000;
      let d: any = Math.floor(t / 60 / 60 / 24);
      t -= d * 60 * 60 * 24;
      let h: any = Math.floor((t / 60 / 60) % 24);
      t -= h * 60 * 60;
      let m: any = Math.floor((t / 60) % 60);
      t -= m * 60;
      let s: any = Math.floor(t % 60);
      if (m < 10) {
        d = `0${d}`;
      }
      if (h < 10) {
        h = `0${h}`;
      }
      if (m < 10) {
        m = `0${m}`;
      }
      if (s < 10) {
        s = `0${s}`;
      }
      setTimeDown({
        days: d,
        hours: h,
        minutes: m,
        seconds: s,
      });
    };
    getTheTime();
    timer.current = setInterval(() => {
      getTheTime();
    }, 1000);
  };
  // 购买
  const handleBuyClick = async (detail: GlobalNft.Nft) => {
    console.log('detail:', detail);
    // const contract = await getContract('', '');
  };
  const onClickViewOn = () => {
    if (detail?.status === 2) {
      // 调用合约购买并mint
      handleBuyClick(detail);
    } else {
      window.open(detail?.anft_opensea_url);
      props.onClickViewOn && props.onClickViewOn();
    }
  };
  const goodLists = [
    {name: 'detail-nft', des: 'NFT owner official recognized'},
    // {name: 'detail-twitter', des: 'Twitter Promotion 2 Times'},
    // {name: 'detail-discord', des: 'Discord Promotion 3 Times'},
    // {name: 'detail-group', des: 'Join my group'},
    // {name: 'detail-whitelist', des: 'Free Whitelist required'},
    // {name: 'detail-project', des: 'Specific derivative project'},
  ];

  const getNftDetailProps = () => {
    getLazyMintNftDetail(props.productID).then((res: any) => {
      if (res?.code === 200) {
        getTimeDown(res?.data?.expiration_time);
        setDetail(res?.data);
      }
    });
  };

  const onClickAddress = (address: string) => {
    copyUrlToClip(address);
    showTip({type: IMessageType.SUCCESS, content: 'Wallet address copied!'});
  };

  useEffect(() => {
    // 根据productID获取详情
    getNftDetailProps();
    return () => {
      clearInterval(timer.current);
    };
  }, [props.productID]);
  return (
    <MintDetailModal>
      <aside className='leftSide'>
        <div className='watermark'>
          <SvgIcon height='100%' name='watermark' width='100%' />
        </div>
        <div className='imageWrapper'>
          <Image alt='anft' layout='fill' src={props.image} />
        </div>
        <div className='nameWrapper'>
          <div className='name'>{props.name}</div>
          {detail?.anft_opensea_url ? (
            <a className='svgWrapper' href={detail?.anft_opensea_url}>
              <SvgIcon height='100%' name='opensea' width='100%' />
            </a>
          ) : null}
        </div>
        <div className='nameWrapper'>
          <div className='originLeft'>
            <div className='originImg'>
              <Image alt='anft' layout='fill' src={props.image} />
            </div>
            <div className='originName'>{detail?.nft_name || props.name}</div>
          </div>
          <a
            className='originLink'
            href={detail?.nft_opensea_url}
            rel='noreferrer'
            target='_blank'
          >
            <SvgIcon height='100%' name='link' width='100%' />
          </a>
        </div>
        <div className='addressWrapper'>
          <div
            className='address'
            onClick={() => {
              onClickAddress(detail?.creator || '');
            }}
          >
            <span className='label'>Created by:</span>
            <span className='addWord'>{detail?.creator || '0x33E5DFA4'}</span>
            <span className='wholeAddress'>{detail?.creator}</span>
          </div>
          <div
            className='address'
            onClick={() => {
              onClickAddress(detail?.owner || '');
            }}
          >
            <span className='label'>Owned by:</span>
            <span className='addWord'>{detail?.owner || '0x33E5DFA4'}</span>
            <span className='wholeAddress leftmove'>{detail?.creator}</span>
          </div>
        </div>
      </aside>
      {detail ? (
        <aside className='rightSide'>
          <div
            className='goodlists'
            style={{height: lookMore ? '196px' : '104px'}}
          >
            <div
              className='lookMore'
              style={{display: 'none'}}
              onClick={() => {
                setLookMore(!lookMore);
              }}
            >
              More
            </div>
            <div className='mintFlag'>
              {detail?.status === 2 ? (
                <SvgIcon height='100%' name='detail-lazyminted' width='100%' />
              ) : (
                <SvgIcon height='100%' name='detail-minted' width='100%' />
              )}
            </div>
            {goodLists.map((item, index) => {
              return (
                <div className='list' key={index}>
                  <SvgIcon height='24px' name={item.name} width='24px' />
                  <span className='des'>{item.des}</span>
                </div>
              );
            })}
          </div>
          <div className='price'>
            <SvgIcon height={32} name='eth' width={32} />
            <span>{detail?.price || '1.00'}</span>
          </div>
          <h4>Expiration time</h4>
          <div className='timeWrapper'>
            <div className='content'>
              <div className='number'>{timeDown.days}</div>
              <div className='des'>days</div>
            </div>
            <div className='content'>
              <div className='number'>{timeDown.hours}</div>
              <div className='des'>hours</div>
            </div>
            <div className='content'>
              <div className='number'>{timeDown.minutes}</div>
              <div className='des'>minutes</div>
            </div>
            <div className='content'>
              <div className='number'>{timeDown.seconds}</div>
              <div className='des'>seconds</div>
            </div>
          </div>
          <div className='attachWrapper'>
            <div>{detail?.issue_name || 'Merch'}</div>
            {detail?.attachment ? (
              <a href={detail.attachment} rel='noreferrer' target='_blank'>
                Attachment
                <SvgIcon height={16} name='detail-attach' width={16} />
              </a>
            ) : null}
          </div>
          <Button
            border='1px solid #2590ff'
            borderRadius={8}
            height={56}
            variant='primary'
            width={320}
            onClick={onClickViewOn}
          >
            {detail?.status === 2 ? 'Buy' : 'View On Opensea'}
          </Button>
        </aside>
      ) : (
        <div className='rightLoading'>
          <Loading size='bigest' />
        </div>
      )}
    </MintDetailModal>
  );
});

Minted.displayName = 'Minted';

const NoMint: FC<ANftDetailType> = memo((props) => {
  const [user] = useRecoilState(userState);

  const [sucModalProps, setsucModalProps] = useState({
    show: false,
    loading: 1,
  });
  const [filePath, setFilePath] = useState({
    path: '',
    name: '',
  });
  const options: any = [
    {label: 'Merch', value: 1},
    {label: 'Derivative Works', value: 2},
    {label: 'Rental', value: 3},
  ];
  const [selectIssue, setIssue] = useState(options[0]);
  const onClickSubmit = (
    price: number,
    time: number,
    issue: number,
    filePath?: string
  ) => {
    setsucModalProps({show: true, loading: 1});
    lazyMintNft({
      contract_address: user.account ? (user.account as any) : '',
      token_id: props.productID.toString(),
      img: props.image || '',
      name: props.name || '',
      price,
      expiration_time: time,
      issue,
      attachment: filePath || '',
      auth_content_id: [1],
    }).then((res: any) => {
      console.log(res);
      setsucModalProps({show: true, loading: 0});
    });
  };

  const handleSelectFliter = (item: any) => {
    setIssue(item);
  };
  const {Form} = useForm({
    validate: (values: any) => {},
    onSubmit: async (values: any) => {
      // if (!filePath.path) {
      //   showTip({
      //     type: IMessageType.WARN,
      //     content: 'Please upload Attachment!',
      //   });
      //   return;
      // }
      const {price, time} = values;
      onClickSubmit(
        parseFloat(price as string),
        parseFloat(time as string),
        selectIssue.value,
        filePath.path
      );
    },
    debugForm: false,
  });

  const onChangeFilePath = (name: string, filePath: string) => {
    setFilePath({
      name,
      path: filePath,
    });
  };

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {sucModalProps.show ? (
        <SuccessComp>
          {sucModalProps.loading ? (
            <ModalLoading>
              <div className='text'>Please Wait...</div>
              <div className='loading'>
                <Loading size='bigest' />
              </div>
            </ModalLoading>
          ) : (
            <>
              <h1>Successfully</h1>
              <div className='svgWrapper'>
                <SvgIcon height='100%' name='modal-success' width='100%' />
              </div>
            </>
          )}
        </SuccessComp>
      ) : (
        <NomintDetailModal>
          <aside className='leftSide'>
            <div className='watermark'>
              <SvgIcon height='100%' name='watermark' width='100%' />
            </div>
            <div className='imageWrapper'>
              <Image alt='anft' layout='fill' src={props.image} />
            </div>
            <h1>{props.name}</h1>
          </aside>
          <aside className='rightSide'>
            <div className='imageWrapper'>
              <Image alt='anft' layout='fill' src={props.image} />
              <div className='watermark'>
                <SvgIcon height='100%' name='watermark' width='100%' />
              </div>
            </div>
            <Form>
              <FormItemContainer>
                <p>Price</p>
                <InputField
                  field='price'
                  placeholder='Please fill your Price'
                  type='number'
                  validate={(value: string) => {
                    if (!value) {
                      return 'price is required!';
                    }
                    return false;
                  }}
                />
              </FormItemContainer>
              <FormItemContainer>
                <p>
                  Expiration Time<span className='des'>(Up to 90 days)</span>
                </p>
                <InputField
                  field='time'
                  filterValue={(value: string) => {
                    if (value) {
                      const val = parseFloat(value);
                      if (val > 90) {
                        return 90;
                      }
                      if (val < 0) {
                        return 1;
                      }
                    }
                    return value;
                  }}
                  placeholder='Please fill in your Expiration time'
                  type='number'
                  validate={(value: string) => {
                    if (!value) return 'expriation time is required!';
                    return false;
                  }}
                />
              </FormItemContainer>
              <FormItemContainer>
                <p>Select Place Of Issue</p>
                <Select
                  border='1px solid #222233'
                  borderRadius={4}
                  defaultValue={selectIssue}
                  fontSize={14}
                  height={40}
                  minHeight={32}
                  mr={24}
                  options={options}
                  width='100%'
                  onChange={(value: any) => {
                    handleSelectFliter(value);
                  }}
                />
              </FormItemContainer>

              <div className='attach'>
                <Upload onChange={onChangeFilePath}>
                  <div className='content'>
                    {filePath.name ? (
                      filePath.name
                    ) : (
                      <>
                        <span>Attachment</span>
                        <SvgIcon height={16} name='detail-attach' width={16} />
                      </>
                    )}
                  </div>
                </Upload>
              </div>
              <Button
                border='1px solid #2590ff'
                borderRadius={8}
                height={56}
                type='submit'
                variant='primary'
                width={320}
              >
                Mint
              </Button>
            </Form>
          </aside>
        </NomintDetailModal>
      )}
    </>
  );
});

NoMint.displayName = 'NoMint';

const InputField = forwardRef((props: any, ref: any) => {
  const [field, fieldOptions, rest] = splitFormProps(props);
  const {
    meta: {error, isTouched, isValidating},
    getInputProps,
  } = useField(field, fieldOptions);
  const inputProps: any = getInputProps({ref, ...rest});
  inputProps.value = inputProps.value || '';
  return (
    <>
      <IconInput
        placeholder={props.placeholder}
        {...inputProps}
        type={props.type}
      />
      <div>
        {isValidating ? (
          <p className='validating'>Validating...</p>
        ) : isTouched && error ? (
          <p className='error'>{error}</p>
        ) : null}
      </div>
    </>
  );
});
InputField.displayName = 'InputField';

interface BaseUploadProps {
  onChange?: (name: string, filePath: string) => void;
  accept?: string;
  isLoading?: boolean;
  loadingSize?: 'mini' | 'regular' | 'large';
}
import {showTip, IMessageType, copyUrlToClip} from '@/utils';
import {getLazyMintNftDetail, lazyMintNft} from '@/services/nft';
import {useRecoilState} from 'recoil';
import {userState} from '@/store/user';

const Upload: FC<BaseUploadProps> = memo(
  ({children, onChange, accept, isLoading, loadingSize, ...props}) => {
    const [loading, setLoading] = useState<boolean>(false);

    const onDrop = useCallback(async (acceptedFiles) => {
      if (!acceptedFiles.length) {
        // showTip({
        //   type: IMessageType.ERROR,
        //   content: 'File types supported: JPG, PNG, GIF, SVG. Max size: 20 MB',
        // });
        return;
      }
      if (acceptedFiles && acceptedFiles.length) {
        const file = acceptedFiles[0];
        if (file.size > 20 * 1024 * 1024) {
          showTip({
            type: IMessageType.ERROR,
            content: 'The file is too large!',
          });
          return;
        }
        setLoading(true);
        // 上传接口
        const formDate = new FormData();
        // originFileObj
        formDate.append('file', file);
        uploadFile(formDate).then((res: any) => {
          onChange && onChange(file.name, res?.data?.attachment_path || '');
          setLoading(false);
        });
      }
    }, []);
    const {getRootProps, getInputProps} = useDropzone({
      accept,
      onDrop,
    });
    return (
      <UploadComp
        {...getRootProps({className: 'dropzone'})}
        {...(props as any)}
      >
        {children}
        <input {...getInputProps()} />
        {loading && isLoading ? (
          <div
            className='loading'
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div>
              <Loading size={loadingSize} />
            </div>
          </div>
        ) : null}
      </UploadComp>
    );
  }
);

Upload.displayName = 'Upload';

Upload.defaultProps = {
  onChange: () => {},
  accept: '',
  isLoading: true,
  loadingSize: 'mini',
};

export default Upload;
