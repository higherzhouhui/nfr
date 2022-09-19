import {FC, memo, useState} from 'react';

import {MenuDrawerWrapper, MenuDrawerContent} from './styles';

import {MyCollapse} from '@/components';
import {Checkbox, SvgIcon, Drawer} from '@/uikit';

interface MenuDrawerInterface {
  options: any[];
  onChange: (index1: number, index2: number, e: any) => void;
}

export const MenuDrawer: FC<MenuDrawerInterface> = memo(
  ({options, onChange}) => {
    const [visible, setVisible] = useState<boolean>(false);
    const handleCloseMenuClick = () => {
      setVisible(false);
    };
    const handleOpenMenuClick = () => {
      setVisible(true);
    };
    return (
      <MenuDrawerWrapper>
        <div
          className='switch-box'
          onClick={() => {
            handleOpenMenuClick();
          }}
        >
          <SvgIcon height={15} name='saixuan-icon' width={15} />
        </div>

        <div className='option-box'>
          {options.map((option: any, index1: number) => {
            return (
              <MyCollapse key={option.title} title={option.title}>
                <div className='option-list-box'>
                  {option.children.map((child: any, index2: number) => {
                    return (
                      <div
                        className='option-item-box'
                        key={child.label}
                        onClick={(e: any) => {
                          onChange(index1, index2, e);
                        }}
                      >
                        <Checkbox
                          checked={child.checked}
                          onChange={(e: any) => {
                            onChange(index1, index2, e);
                          }}
                        />
                        <span>{child.label}</span>
                      </div>
                    );
                  })}
                </div>
              </MyCollapse>
            );
          })}
        </div>
        <Drawer
          placement='left'
          visible={visible}
          width='100%'
          onClose={handleCloseMenuClick}
        >
          <MenuDrawerContent>
            <div className='drawer-header-box'>
              <SvgIcon
                height={20}
                name='logo'
                width={80}
                onClick={handleCloseMenuClick}
              />
              <SvgIcon
                height={20}
                name='close-icon'
                width={20}
                onClick={handleCloseMenuClick}
              />
            </div>
            <div className='option-box'>
              {options.map((option: any, index1: number) => {
                return (
                  <MyCollapse key={option.title} title={option.title}>
                    <div className='option-list-box'>
                      {option.children.map((child: any, index2: number) => {
                        return (
                          <div className='option-item-box' key={child.label}>
                            <Checkbox
                              checked={child.checked}
                              onChange={(e: any) => {
                                handleCloseMenuClick();
                                onChange(index1, index2, e);
                              }}
                            />
                            <span>{child.label}</span>
                          </div>
                        );
                      })}
                    </div>
                  </MyCollapse>
                );
              })}
            </div>
          </MenuDrawerContent>
        </Drawer>
      </MenuDrawerWrapper>
    );
  }
);

MenuDrawer.displayName = 'MenuDrawer';
