import { ArrowDownOutlined, MenuOutlined } from '@ant-design/icons';
import { Anchor, Collapse, ConfigProvider } from 'antd';
import { useResponsive } from 'antd-style';
import { memo, useMemo, type FC } from 'react';
import useControlledState from 'use-merge-value';

import { AnchorItem } from '../../types';
import { useStyles } from './style';

export interface TocProps {
  items: AnchorItem[];
  activeKey?: string;
  onChange?: (activeKey: string) => void;
}

const Toc: FC<TocProps> = memo(({ items, activeKey, onChange }) => {
  const [activeLink, setActiveLink] = useControlledState<string>('', {
    value: activeKey,
    onChange,
  });
  const { styles } = useStyles();
  const { mobile } = useResponsive();

  const activeAnchor = items.find((item) => item.id === activeLink);

  const linkItems = useMemo(
    () =>
      items.map((item) => ({
        href: `#${item.id}`,
        title: item.title,
        key: item.id,
        children: item.children?.map((child) => ({
          href: `#${child.id}`,
          title: child?.title,
          key: child.id,
        })),
      })),
    [items],
  );

  return (
    (items?.length === 0 ? null : mobile ? (
      <ConfigProvider theme={{ token: { fontSize: 12, sizeStep: 3 } }}>
        <div className={styles.mobileCtn}>
          <Collapse
            bordered={false}
            ghost
            expandIconPosition={'end'}
            expandIcon={({ isActive }) => (isActive ? <ArrowDownOutlined /> : <MenuOutlined />)}
            className={styles.expand}
          >
            <Collapse.Panel
              forceRender
              key={'toc'}
              header={!activeAnchor ? '目录' : activeAnchor.title}
            >
              <ConfigProvider theme={{ token: { fontSize: 14, sizeStep: 4 } }}>
                <Anchor
                  onChange={(currentLink) => {
                    setActiveLink(currentLink.replace('#', ''));
                  }}
                  items={linkItems}
                />
              </ConfigProvider>
            </Collapse.Panel>
          </Collapse>
        </div>
      </ConfigProvider>
    ) : (
      <div className={styles.container}>
        <h4>Table of Contents</h4>
        <Anchor items={linkItems} />
      </div>
    )) || null
  );
});

export default Toc;
