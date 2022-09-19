// import Image from 'next/image';
import {useRouter} from 'next/router';
import {useState, memo, FC, useEffect} from 'react';
import Skeleton from 'react-loading-skeleton';
import {useRecoilState} from 'recoil';

import type {NextPage} from 'next';

import {Tab, List, Product, NoData, UploadPonents} from '@/components';
import {
  getUserBaseInfo,
  getUserOwnedData,
  IUserRequestType,
  updateUserBaseInfo,
} from '@/services/user';
import {userState} from '@/store/user';
import {
  ProfileContainer,
  ProfileAvatarContainer,
  ProfilePopsContainer,
  ProfilePopsContentContainer,
  CreatedPorsPanelContainer,
  EditProfileModalContainer,
} from '@/styles/profile';
import {SvgIcon, Button, Modal, Input, Image} from '@/uikit';

const Profile: NextPage = () => {
  const [user] = useRecoilState(userState);
  const router = useRouter();
  const {id, type} = router.query;
  const [userInfo, setUserInfo] = useState({
    address: '',
    img: '',
    name: '',
    token: '',
    twitter: '',
    id: 1,
    isOwn: false,
  });
  const tabs: {label: string; key: IUserRequestType}[] = [
    {
      label: 'Created NFRs',
      key: IUserRequestType.Nfrs,
    },
    {
      label: 'Created Campaigns',
      key: IUserRequestType.Campaign,
    },
    {
      label: 'Owned NFRs',
      key: IUserRequestType.OwnerNfrs,
    },
    {
      label: 'Participated Campaigns',
      key: IUserRequestType.Participate,
    },
  ];
  const [currentTab, setCurrentTab] = useState<IUserRequestType | null>(null);

  const [editProfileModalVisible, setEditProfileModalVisible] =
    useState<boolean>(false);

  useEffect(() => {
    if (type) {
      const ctype = type as any as IUserRequestType;
      setCurrentTab(ctype);
    }
  }, [type]);

  useEffect(() => {
    if (id && !editProfileModalVisible) {
      const userId = parseInt(id as any, 10);
      getUserBaseInfo(userId).then((res: any) => {
        if (res?.code === 200) {
          const ninfo = {...res?.data, isOwn: userId === user.id};
          setUserInfo(ninfo);
        }
      });
    }
  }, [id, editProfileModalVisible]);
  return (
    <ProfileContainer>
      <ProfileAvatarContainer>
        <div className='avatar-box'>
          <Image
            alt='avatar'
            layout='fill'
            src={
              userInfo.img
                ? userInfo.img
                : `/static/icon/avatar-${
                    typeof user.id === 'number' && user.id % 10 < 8
                      ? user.id % 10
                      : '0'
                  }.png`
            }
          />
        </div>
        {userInfo.isOwn && (
          <div className='edit-profile-box'>
            <Button
              borderColor='#E9E9EB'
              borderRadius={8}
              color='#1F263B'
              fontSize={14}
              height={36}
              width={100}
              onClick={() => {
                setEditProfileModalVisible(true);
              }}
            >
              Edit profile
            </Button>
          </div>
        )}
        <h3>{userInfo.name || 'Unnamed'}</h3>
        <div className='twitter-box'>
          {userInfo.twitter ? (
            <a
              className='twitter-box'
              href={`https://twitter.com/${userInfo.twitter}`}
              rel='noreferrer'
              target='_blank'
            >
              <SvgIcon height={16} name='profile-rezheng' width={16} />
              <p>{userInfo.twitter || '@JohnnyBoyArt'}</p>
              <SvgIcon height={16} name='profile-twitter' width={16} />
            </a>
          ) : (
            <p>{userInfo.address || '@JohnnyBoyArt'}</p>
          )}
        </div>
      </ProfileAvatarContainer>
      <ProfilePopsContainer>
        <Tab
          current={currentTab}
          tabs={tabs}
          onChange={(key: any) => {
            setCurrentTab(key);
          }}
        />
        <ProfilePopsContentContainer>
          <CreatedPorsPanel currentTab={currentTab} id={id} />
        </ProfilePopsContentContainer>
      </ProfilePopsContainer>

      {/* edit profile modal     */}
      <EditProfileModal
        userInfo={userInfo}
        visible={editProfileModalVisible}
        onClose={() => {
          setEditProfileModalVisible(false);
        }}
      />
    </ProfileContainer>
  );
};
type CreatedPorsPanelProps = {
  currentTab: IUserRequestType | null;
  id: string | string[] | undefined;
};
// Created PoRs
const CreatedPorsPanel: FC<CreatedPorsPanelProps> = memo(({currentTab, id}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [list, setList] = useState([]);
  const loadMore = async () => {
    // const {pageNo, total} = param;
    // if (list.length < total) {
    //   await getList(pageNo + 1);
    // }
  };

  const getRequestData = (type: IUserRequestType, userId?: number) => {
    setLoading(true);
    const cuserId = userId || (id as any);
    getUserOwnedData(type, cuserId).then((res: any) => {
      if (res?.code === 200) {
        const rows = res?.data?.rows || [];
        rows.forEach((item: any) => {
          if (
            type === IUserRequestType.Campaign ||
            type === IUserRequestType.Participate
          ) {
            item.type = 'CAMPAIGN';
          }
        });
        setList(rows);
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    if (id && currentTab) {
      getRequestData(currentTab, id as any);
    }
  }, [id, currentTab]);
  return (
    <CreatedPorsPanelContainer>
      <List scrollDomId='browse-content-dom' onLoadMore={loadMore}>
        {!loading && !list.length && <NoData />}
        <div className='list-box'>
          {!loading &&
            list.map((item: any, index: number) => (
              <Product data={item} key={index} />
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
    </CreatedPorsPanelContainer>
  );
});

CreatedPorsPanel.displayName = 'CreatedPorsPanel';

// Edit profile modal
interface EditProfileModalInterface {
  visible: boolean;
  onClose: () => void;
  userInfo: any;
}
const EditProfileModal: FC<EditProfileModalInterface> = memo(
  ({visible, onClose, userInfo}) => {
    // save change
    const [loading, setLoading] = useState(0);
    const [user, setUser] = useRecoilState(userState);
    const handleSaveChangeClick = () => {
      setLoading(1);
      const updateObj = {img: filePath.path, name: myName, twitter: myTwitter};
      updateUserBaseInfo(updateObj).then((res: any) => {
        setLoading(0);
        setUser({...user, ...updateObj});
        onClose();
      });
    };
    const [filePath, setFilePath] = useState({
      path: userInfo.img,
      name: '',
    });
    const [myName, setMyName] = useState(userInfo.name);
    const [myTwitter, setMyTwitter] = useState(userInfo.twitter);
    const onChangeName = (e: any) => {
      setMyName(e.target?.value);
    };
    const onChangeTwitter = (e: any) => {
      setMyTwitter(e.target?.value);
    };
    const onChangeFilePath = (name: string, filePath: string) => {
      setFilePath({
        name,
        path: filePath,
      });
    };

    useEffect(() => {
      setMyName(userInfo.name);
      setMyTwitter(userInfo.twitter);
      setFilePath({
        name: '',
        path: userInfo.img,
      });
    }, [userInfo]);
    return (
      <Modal
        background='#fff'
        height='auto'
        loading={loading}
        visible={visible}
        width={480}
        onClose={onClose}
      >
        <EditProfileModalContainer>
          <h3>Edit profile</h3>
          <p>Set a display name and other desired profile information.</p>
          <div className='form-box'>
            <div className='form-item-box'>
              <label>PROFILE IMAGE</label>
              <div className='form-avatar-box'>
                <div className='img-box'>
                  <Image
                    alt='avatar'
                    layout='fill'
                    objectFit='contain'
                    src={
                      filePath.path
                        ? filePath.path
                        : `/static/icon/avatar-${
                            typeof userInfo.id === 'number' &&
                            userInfo.id % 10 < 8
                              ? userInfo.id % 10
                              : '0'
                          }.png`
                    }
                  />
                </div>
                <div className='avatar-des-box'>
                  <UploadPonents accept='image/*' onChange={onChangeFilePath}>
                    <div
                      className='content'
                      style={{justifyContent: 'flex-start'}}
                    >
                      {filePath.path ? 'Replace the image' : 'Upload image'}
                    </div>
                  </UploadPonents>
                  <p>400x400 or larger recommended.</p>
                </div>
              </div>
            </div>
            <div className='form-item-box'>
              <label>DISPLAY NAME</label>
              <Input
                placeholder='Your display name'
                value={myName}
                onChange={onChangeName}
              />
            </div>
            <div className='form-item-box'>
              <Input
                paddingLeft='153px !important'
                placeholder='Twitter username'
                value={myTwitter}
                onChange={onChangeTwitter}
              />
              <div className='twitter-box'>
                <div className='twitter-btn'>
                  <SvgIcon height={16} name='profile-twitter' width={16} />
                  Twitter
                </div>
                <span>@</span>
              </div>
            </div>
            <div className='form-btn-box'>
              <Button
                fontSize={16}
                height={48}
                variant='primary'
                width='100%'
                onClick={handleSaveChangeClick}
              >
                Save Changes
              </Button>
              <Button
                borderColor='#E9E9EB'
                borderRadius={8}
                color='#1F263B'
                fontSize={16}
                height={48}
                marginTop={16}
                width='100%'
                onClick={onClose}
              >
                Cancel
              </Button>
            </div>
          </div>
        </EditProfileModalContainer>
      </Modal>
    );
  }
);
EditProfileModal.displayName = 'EditProfileModal';
export default Profile;
