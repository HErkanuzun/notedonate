import type { PageContextBuiltIn } from 'vite-plugin-ssr/types';

export type PageProps = Record<string, unknown>;
export type PageContext = PageContextBuiltIn<Page> & {
  pageProps?: PageProps;
  urlPathname: string;
  exports: {
    documentProps?: {
      title?: string;
      description?: string;
    };
  };
};

export type PageContextServer = PageContext;
export type PageContextClient = PageContext;

export type Page = (pageProps: PageProps) => React.ReactElement;