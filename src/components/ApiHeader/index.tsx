import { EditOutlined, GithubFilled } from '@ant-design/icons';
import { Divider, Space, Typography } from 'antd';
import { useResponsive } from 'antd-style';
import { FC, memo, ReactNode } from 'react';
import { Flexbox } from 'react-layout-kit';

import Code from '../CodeSnippet';
import BundlephobiaFilled from './BundlephobiaFilled';
import Graph from './Graph';
import NpmFilled from './NpmFilled';
import PackagePhobia from './PackagePhobia';
import Unpkg from './Unpkg';

import { Label, useStyles } from './style';

interface ApiTitleProps {
  title: string;
  componentName: string;
  description?: string;
  pkg: string;
  sourceUrl?: string;
  docsUrl?: string;
}

interface Item {
  label: string;
  icon: ReactNode;
  children: string;
  url: string;
}

export const ApiHeader: FC<ApiTitleProps> = memo(
  ({ title, componentName, description, pkg, sourceUrl, docsUrl }) => {
    const { styles } = useStyles();
    const { mobile } = useResponsive();

    const items = [
      sourceUrl && {
        icon: <GithubFilled />,
        children: '查看源码',
        url: sourceUrl,
      },
      docsUrl && {
        icon: <EditOutlined />,
        children: '编辑文档',
        url: docsUrl,
      },
    ].filter((i) => i) as Item[];

    const packages = [
      {
        label: 'NPM',
        icon: <NpmFilled />,
        children: 'NPM',
        url: `https://www.npmjs.com/package/${pkg}`,
      },
      {
        label: '预览产物',
        icon: <Unpkg />,
        children: 'UNPKG',
        url: `https://unpkg.com/browse/${pkg}/`,
      },
      {
        label: '查阅产物体积',
        icon: <BundlephobiaFilled />,
        children: 'BundlePhobia',
        url: `https://bundlephobia.com/package/${pkg}`,
      },
      {
        label: '查阅安装包体积',
        icon: <PackagePhobia />,
        children: 'PackagePhobia',
        url: `https://packagephobia.com/result?p=${pkg}`,
      },

      {
        label: '分析依赖图',
        icon: <Graph />,
        children: 'Anvaka Graph',
        url: `https://npm.anvaka.com/#/view/2d/${pkg}`,
      },
    ];

    return (
      <Flexbox>
        <Typography.Title className={styles.title}>{title}</Typography.Title>
        {description && (
          <div>
            <Typography.Text type={'secondary'} className={styles.desc}>
              {description}
            </Typography.Text>
          </div>
        )}
        <Flexbox style={{ marginTop: 16 }} gap={mobile ? 16 : 24}>
          <Flexbox horizontal={!mobile} gap={mobile ? 12 : 0}>
            <Label type={'secondary'} style={{ display: 'flex', alignItems: 'center' }}>
              引入方法
            </Label>
            <Code>{`import { ${componentName} } from '${pkg}';`}</Code>
          </Flexbox>
          <Divider dashed style={{ margin: '2px 0' }} />
          <Flexbox horizontal={!mobile} gap={mobile ? 24 : 0} distribution={'space-between'}>
            <Space split={<Divider type={'vertical'} />} wrap>
              {packages.map((item) => (
                <a
                  key={item.url}
                  href={item.url}
                  target={'_blank'}
                  rel="noreferrer"
                  title={item.label}
                >
                  <Flexbox horizontal align={'center'} gap={8} className={styles.text}>
                    <>{item.icon}</>
                    <>{item.children}</>
                  </Flexbox>
                </a>
              ))}
            </Space>

            <Space split={<Divider type={'vertical'} />} className={styles.meta}>
              {items.map((item) => (
                <a key={item.label} href={item.url} target={'_blank'} rel="noreferrer">
                  <Flexbox horizontal align={'center'} gap={8} className={styles.text}>
                    <>{item.icon}</>
                    <>{item.children}</>
                  </Flexbox>
                </a>
              ))}
            </Space>
          </Flexbox>
        </Flexbox>
      </Flexbox>
    );
  },
);
