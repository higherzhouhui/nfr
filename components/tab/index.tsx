import {FC, memo, useEffect, useState} from 'react';

import {TabContainer, TabItemContainer} from './styles';

import {Select} from '@/uikit';

type ITabProps = {
  tabs: {label: string; key: string}[];
  current: string | null;
  onChange: (key: string) => void;
};

export const Tab: FC<ITabProps> = memo(({tabs, current, onChange}) => {
  const [options, setOptions] = useState<any>([]);
  useEffect(() => {
    if (tabs && tabs.length) {
      const arr: any = [];
      tabs.forEach((tab) => {
        arr.push({
          label: tab.label,
          value: tab.key,
        });
      });
      setOptions([...arr]);
    }
  }, [tabs]);
  return (
    <TabContainer>
      <div className='select-box'>
        <Select
          borderRadius={50}
          options={options}
          width='100%'
          onChange={(option: any) => {
            onChange(option.value);
          }}
        />
      </div>
      <div className='tab-box'>
        {tabs.map((tab: {label: string; key: string}) => (
          <TabItemContainer
            active={current === tab.key}
            key={tab.key}
            onClick={() => {
              onChange(tab.key);
            }}
          >
            {tab.label}
          </TabItemContainer>
        ))}
      </div>
    </TabContainer>
  );
});
Tab.displayName = 'Tab';
