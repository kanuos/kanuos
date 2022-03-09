// Project Detail View

// import : internal
import { NavBar } from '../../components/public/Nav'
import { DesignDetailBody } from '../../components/content/DesignDetailBody';
import { HeadComponent } from '../../components/Head'
import { getAllDesigns, getIndividualDesign } from '../../database/designs';
import { deFormatURLParamString, formatURLParamString } from '../../utils';


const DesignDetail = ({design}) => {
  design = JSON.parse(design);
  return (
    <>
    <HeadComponent title={`Design : ` + design.title} />
    <NavBar />
    <DesignDetailBody design={design} />
    </>
  )
}

export default DesignDetail


export async function getStaticProps({ params }) {
  let design;
  try {
    design = await getIndividualDesign(false, deFormatURLParamString(params.design));
  } 
  catch (error) {
    design = {}
  }
  finally {
    return {
      props : {
        design : JSON.stringify(design)
      },
      revalidate : 10
    }
  }
}
export async function getStaticPaths() {
  const allDesigns = await getAllDesigns(false);
  const paths = allDesigns.map(d => ({ params : {design : formatURLParamString(d.title)}}));
  return {
    paths,
    fallback : false
  }

}