import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { PageShell } from './PageShell';
import type { PageContextClient } from './types';
import '../src/index.css';

export async function render(pageContext: PageContextClient) {
  const { Page, pageProps } = pageContext;
  hydrateRoot(
    document.getElementById('root')!,
    <BrowserRouter>
      <PageShell pageContext={pageContext}>
        <Page {...pageProps} />
      </PageShell>
    </BrowserRouter>
  );
}