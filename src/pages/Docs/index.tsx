import { useResponsive } from 'antd-style';
import isEqual from 'fast-deep-equal';
import { memo, type FC } from 'react';
import { Center, Flexbox } from 'react-layout-kit';

import { Helmet, useOutlet } from 'dumi';
import Content from 'dumi/theme/slots/Content';
import Footer from 'dumi/theme/slots/Footer';
import Header from 'dumi/theme/slots/Header';
import Sidebar from 'dumi/theme/slots/Sidebar';
import Toc from 'dumi/theme/slots/Toc';

import { ApiHeader } from '../../components/ApiHeader';

import { apiHeaderSel, isApiPageSel, siteTitleSel, useSiteStore } from '../../store';
import { useStyles } from './styles';

const Docs: FC = memo(() => {
  const outlet = useOutlet();
  const { mobile } = useResponsive();
  const fm = useSiteStore((s) => s.routeMeta.frontmatter, isEqual);
  const isApiPage = useSiteStore(isApiPageSel);
  const siteTitle = useSiteStore(siteTitleSel);
  const { pkg, docUrl, sourceUrl } = useSiteStore(apiHeaderSel);

  const { styles, theme } = useStyles();

  return (
    <div className={styles.layout}>
      <Helmet>
        {fm.title && (
          <title>
            {fm.title} - {siteTitle}
          </title>
        )}
      </Helmet>
      <Header />

      <Toc />

      {mobile ? null : <Sidebar />}

      {isApiPage ? (
        <Flexbox style={{ gridArea: 'title', paddingBlock: mobile ? 24 : undefined }}>
          <Center>
            <Flexbox style={{ maxWidth: theme.contentMaxWidth, width: '100%' }}>
              <Flexbox style={{ paddingBlock: 0, paddingInline: mobile ? 16 : 48 }}>
                <ApiHeader
                  title={fm.title}
                  description={fm.description}
                  pkg={pkg}
                  componentName={fm.atomId || fm.title}
                  sourceUrl={sourceUrl}
                  docsUrl={docUrl}
                />
              </Flexbox>
            </Flexbox>
          </Center>
        </Flexbox>
      ) : null}

      <Flexbox
        style={{
          zIndex: 10,
          gridArea: 'main',
          margin: mobile ? 0 : 24,
          marginBottom: mobile ? 0 : 48,
        }}
      >
        <Center width={'100%'}>
          <Flexbox className={styles.content}>
            <Flexbox horizontal>
              <Content>{outlet}</Content>
            </Flexbox>
          </Flexbox>
        </Center>
      </Flexbox>
      <Footer />
    </div>
  );
});

export default Docs;
