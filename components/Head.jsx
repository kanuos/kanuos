import Head from 'next/head'

export const HeadComponent = ({title=`Sounak Mukherjee`, content}) => {
  return (
    <Head>
        <title>{title}</title>
    </Head>
)}
