import {useRequest} from 'ahooks';
import {FC, useEffect, memo, useRef, useCallback} from 'react';

import {LoadingContainer} from './styles';

interface ListInterface {
  children: React.ReactNode;
  scrollDomId?: string;
  onLoadMore?: () => void;
}

export const List: FC<ListInterface> = memo(
  ({children, onLoadMore = () => {}, scrollDomId}) => {
    const bottomDomRef = useRef<HTMLDivElement | null>(null);

    const loadMore = async () => {
      onLoadMore();
    };

    const {loading, run} = useRequest(loadMore, {
      throttleWait: 1000,
      manual: true,
    });

    const scrollRenderHandler = useCallback(() => {
      if (!bottomDomRef.current) {
        return;
      }
      const rect = bottomDomRef.current?.getBoundingClientRect();
      // top 是loading组件的位置
      const top = rect ? rect.top : 0;
      // 视窗高
      const clientHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      if (top < clientHeight) {
        // 继续渲染
        run();
      }
    }, [bottomDomRef.current]);

    useEffect(() => {
      if (scrollDomId) {
        document
          .getElementById(scrollDomId)
          ?.addEventListener('scroll', scrollRenderHandler);
      } else {
        document.addEventListener('scroll', scrollRenderHandler);
      }

      return (): void => {
        if (scrollDomId) {
          document
            .getElementById(scrollDomId)
            ?.removeEventListener('scroll', scrollRenderHandler);
        } else {
          document.removeEventListener('scroll', scrollRenderHandler);
        }
      };
    }, [scrollRenderHandler]);

    return (
      <>
        <div>{children}</div>
        <LoadingContainer ref={bottomDomRef}>
          {loading ? 'loading' : ''}
        </LoadingContainer>
      </>
    );
  }
);

List.displayName = 'List';
