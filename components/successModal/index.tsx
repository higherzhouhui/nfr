import {FC, memo} from 'react';

import {SuccessContainer} from './styles';

import {Modal, SvgIcon, Image} from '@/uikit';
type IProps = {
  loading?: number;
  onClose?: () => void;
  onQuery?: () => void;
  title?: string;
  description?: string;
  visible?: boolean;
  dangerouslySetInnerHTML: {__html: string};
};

export const SuccessModal: FC<IProps> = memo((props) => {
  return (
    <Modal
      background='#fff'
      height='244px'
      loading={props.loading}
      visible={props.visible}
      width='400px'
      onClose={props.onClose}
    >
      <SuccessContainer>
        <div className='svgWrapper'>
          <SvgIcon height='100%' name='modal-success' width='100%' />
        </div>
        <div className='svgbgWrapper'>
          <SvgIcon height='100%' name='modal-success-bg' width='100%' />
        </div>
        <h1>{props.title || 'NFR created'}</h1>
        <h3 dangerouslySetInnerHTML={props.dangerouslySetInnerHTML} />
        <div className='bg'>
          <Image
            alt='bg'
            layout='fill'
            src='/static/image/modal-success-bg.png'
          />
        </div>
        {/* <p className='description'>{props.description}</p>
        <Button
          borderRadius={8}
          fontSize='1rem'
          height='3.5rem'
          variant='primary'
          width='8.8rem'
          onClick={props.onQuery || props.onClose}
        >
          OK
        </Button> */}
      </SuccessContainer>
    </Modal>
  );
});

SuccessModal.displayName = 'SuccessModal';
