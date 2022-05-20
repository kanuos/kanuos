// Project Detail View
import dynamic from "next/dynamic";

// import : internal
import { DesignDetailBody } from "../../components/content/DesignDetailBody";
import PublicLayout from "../../components/Layouts/PublicLayout";
import { getAllDesigns, getIndividualDesign } from "../../database/designs";
import {
  deFormatURLParamString,
  formatURLParamString,
  generateDetailViewMetadata,
} from "../../utils";

// dynamic imports

const Footer = dynamic(() =>
  import("../../components/detail/Footer").then((m) => m.Footer)
);

const DesignDetail = ({ design }) => {
  design = JSON.parse(design);
  const content = generateDetailViewMetadata(
    design.title,
    design.tags?.map(({ tag }) => tag)?.toString(),
    design.tools?.toString(),
    "design"
  );
  return (
    <PublicLayout metaTitle={`Design : ` + design.title} metaDesc={content}>
      <DesignDetailBody design={design} />
      <Footer />
      {/* TODO: add footer content  */}
    </PublicLayout>
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
