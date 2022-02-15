import Head from 'next/head'

export const HeadComponent = ({title=`Sounak Mukherjee`, content}) => {
  return (
    <Head>
        <title>{title}</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&family=Shadows+Into+Light&display=swap" rel="stylesheet" />
    </Head>
)}
