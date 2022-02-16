// Project Detail View

// import : internal
import { NavBar } from '../../components/public/Nav'
import { DesignDetailBody } from '../../components/content/DesignDetailBody';
import { HeadComponent } from '../../components/Head'


const DesignDetail = () => {
  return (
    <>
    <HeadComponent title={design.name} />
    <NavBar />
    <DesignDetailBody design={design} />
    </>
  )
}

export default DesignDetail




const design = {
    _id : 1,
    name : 'football.io',
    thumbnail : `https://images.unsplash.com/photo-1517747614396-d21a78b850e8`,
    date : new Date().toDateString(),
    tags : ['Express', 'PostgreSQL', 'Session', 'EJS', 'Tailwind'],
    desc : `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.`,
    typography : [
      {
        family : 'Montserrat',
        desc : `The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.`
      },
      {
        family : 'Roboto',
        desc : `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.`
      },
    ],
    colorPalette : [
      {
        name : '--primary',
        hex : '#FF6600',
      },
      {
        name : '--secondary',
        hex : '#DC6645',
      },
      {
        name : '--light',
        hex : '#FFFFFF',
      },
      {
        name : '--dark',
        hex : '#333333',
      },
    ],
    tools : [
      'Figma for prototyping and wireframing',
      'Sketch for user flow design',
      'Coolors for color selection',
      'Google fonts for font families'
    ],
    userFlowSteps : [
      {
        page : `https://images.unsplash.com/photo-1517747614396-d21a78b850e8`,
        title : 'John Doe',
        about : `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).

`
      },
      {
        page : `https://images.unsplash.com/photo-1588964895597-cfccd6e2dbf9`,
        title : 'Jane Doe',
        about : `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).

`
      },
      {
        page : `https://images.unsplash.com/photo-1604382354936-07c5d9983bd3`,
        title : 'Macey Smith',
        about : `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).

`
      },
      {
        page : `https://images.unsplash.com/photo-1505576399279-565b52d4ac71`,
        title : 'Macey Smith',
        about : `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).

`
      },
    ],
    externalResources : [
      {
        poster : `https://images.unsplash.com/photo-1517747614396-d21a78b850e8`,
        photographer : 'John Doe',
        courtesy : 'https://www.google.com'
      },
      {
        poster : `https://images.unsplash.com/photo-1517747614396-d21a78b850e8`,
        photographer : 'Jane Doe',
        courtesy : 'https://www.google.com'
      },
      {
        poster : `https://images.unsplash.com/photo-1517747614396-d21a78b850e8`,
        photographer : 'Macey Smith',
        courtesy : 'https://www.google.com'
      },
    ],
    isPublic : true,
    user : {
        name : 'sounak mukherjee',
        link : { text : '@kanuos', url : 'https://www.github.com/kanuos'},
        about : `Libero iste recusandae nam culpa quasi aliquid, deserunt sunt non necessitatibus optio dolor accusantium natus.`
    }
    
}