import {FC, memo} from 'react';

import {CollectionContainer} from './styles';

import {Drawer, SvgIcon, Radio, RadioGroup} from '@/uikit';

interface OptionsInter {
  title: string;
  titleHide?: true;
  options: {label: string; value: any}[];
}

type IProps = {
  visible: boolean;
  onClose: () => void;
  onQuery?: (title: string, value: any) => void;
  data: OptionsInter[];
};

const OptionsDrawer: FC<IProps> = memo(({visible, data, onClose, onQuery}) => {
  return (
    <Drawer
      visible={visible}
      width={320}
      onClose={() => {
        onClose();
      }}
    >
      <CollectionContainer>
        <div
          className='close'
          onClick={() => {
            onClose();
          }}
        >
          <SvgIcon height='100%' name='compose-close' width='100%' />
        </div>
        {data.map((item: OptionsInter, index: number) => {
          return (
            <div key={item.title}>
              {!item.titleHide && <h1>{item.title}</h1>}
              <RadioGroup
                onChange={(value: any) => {
                  onQuery && onQuery(item.title, value);
                }}
              >
                {item.options.map((option) => (
                  <div className='radio' key={option.value}>
                    <span className='text'>{option.label}</span>
                    <Radio name={item.title} value={option.value} />
                  </div>
                ))}
              </RadioGroup>
            </div>
          );
        })}
      </CollectionContainer>
    </Drawer>
  );
});

OptionsDrawer.displayName = 'OptionsDrawer';

export default OptionsDrawer;
