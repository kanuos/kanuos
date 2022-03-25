// Project Detail View
import dynamic from 'next/dynamic';

// import : internal
import { DesignDetailBody } from "../../components/content/DesignDetailBody";
import { HeadComponent } from "../../components/Head";
import { getAllDesigns, getIndividualDesign } from "../../database/designs";
import {
  deFormatURLParamString,
  formatURLParamString,
  generateDetailViewMetadata,
} from "../../utils";



// dynamic imports

const ThemeToggler = dynamic(() => import("../../components/public/ThemeToggler").then(m => m.ThemeToggler));
const NavBar = dynamic(() => import("../../components/public/Nav").then(m => m.NavBar));




const DesignDetail = ({ design }) => {
  design = JSON.parse(design);
  const content = generateDetailViewMetadata(
    design.title,
    design.tags?.map(({ tag }) => tag)?.toString(),
    design.tools?.toString(),
    "design"
  );
  return (
    <>
      <HeadComponent title={`Design : ` + design.title} content={content} />
      <NavBar />
      <ThemeToggler />
      <DesignDetailBody design={design} />
    </>
  );
};

export default DesignDetail;

export async function getStaticProps({ params }) {
  let design;
  try {
    design = await getIndividualDesign(
      false,
      deFormatURLParamString(params.design)
    );
  } catch (error) {
    design = {};
  } finally {
    return {
      props: {
        design: JSON.stringify(design),
      },
      revalidate: 10,
    };
  }
}
export async function getStaticPaths() {
  const allDesigns = await getAllDesigns(false);
  const paths = allDesigns.map((d) => ({
    params: { design: formatURLParamString(d.title) },
  }));
  return {
    paths,
    fallback: false,
  };
}
