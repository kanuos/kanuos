import Head from 'next/head'

export const HeadComponent = ({title=`Sounak Mukherjee`, content}) => {
  return (
    <Head>
        <title>{title}</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Comforter&family=Poppins:wght@400;600&display=swap" rel="stylesheet" />
    </Head>
)}
