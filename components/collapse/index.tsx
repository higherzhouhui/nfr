import {useState, CSSProperties, FC, memo, ReactNode} from 'react';
import {Collapse} from 'react-collapse';

import {CollapseContainer} from './styles';

import {SvgIcon} from '@/uikit';

type IProps = {
  title?: string;
  style?: CSSProperties;
  type?: string;
  titleIcon?: ReactNode;
  OperatorIcon?: ReactNode;
  isClose?: any;
};
export const MyCollapse: FC<IProps> = memo(
  ({
    title,
    children,
    style = {},
    type = 'FilterOption',
    titleIcon,
    OperatorIcon,
    isClose = false,
  }) => {
    const [isOpen, setIsOpen] = useState<boolean>(!isClose);
    return (
      <CollapseContainer style={style} type={type}>
        <div
          className='panel-item-box'
          style={{
            borderRadius: isOpen ? '8px 8px 0 0' : '8px',
          }}
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <h4>
            {titleIcon ? <div className='icon'>{titleIcon}</div> : null}
            {title}
          </h4>
          {OperatorIcon ? (
            <div className='operator-box'>{OperatorIcon}</div>
          ) : (
            <div className='operator-box'>
              <div className={`operator-icon-box ${isOpen ? 'active' : ''}`}>
                <SvgIcon height={24} name='down-icon' width={24} />
              </div>
              {/* {isOpen ? (
                <SvgIcon height={24} name='right-icon' width={24} />
              ) : (
                <SvgIcon height={24} name='right-icon' width={24} />
              )} */}
            </div>
          )}
        </div>

        <Collapse isOpened={isOpen}>
          <div className='collapse-content-wrapper'>{children}</div>
        </Collapse>
      </CollapseContainer>
    );
  }
);

MyCollapse.displayName = 'MyCollapse';
