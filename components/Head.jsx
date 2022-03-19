import Head from 'next/head'
import { metadata } from '../utils/portfolio_static'

export const HeadComponent = ({title=`Sounak Mukherjee`, content='', url}) => {
  content = Boolean(content.trim()) ? content.trim() : 'Check out my website where I write tech blogs, create designs and projects.';

  const me = metadata.name;
  return (
    <Head>
        <title>{title}</title>
        <meta charset="utf-8"/>

        <meta name="description" content={content} />
        <meta itemprop="name" content={me} />
        <meta name="author" content={me} />
        <meta itemprop="description" content={content}/>

        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={content} />

        <meta name="og:title" content={title} />
        <meta name="og:description" content={content} />
        <meta name="og:url" content={url} />
        <meta name="og:type" content="website"></meta>
    </Head>
)}
