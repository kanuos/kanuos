// Project Detail View
import dynamic from "next/dynamic";

// import : internal
import { DesignDetailBody } from "../../components/content/DesignDetailBody";
import PublicLayout from "../../components/Layouts/PublicLayout";
import { getAllDesigns, getIndividualDesign } from "../../database/designs";
import { generateDetailViewMetadata } from "../../utils";

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
      <div className="h-auto w-full">
        <DesignDetailBody design={design} />
      </div>
      <Footer />
      {/* TODO: add footer content  */}
    </PublicLayout>
  );
};

export default DesignDetail;

export async function getStaticProps({ params }) {
  let design;
  try {
    design = await getIndividualDesign(false, params.design);
    return {
      props: {
        design: JSON.stringify(design),
      },
      revalidate: 1,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
export async function getStaticPaths() {
  const allDesigns = await getAllDesigns(false);
  const paths = allDesigns.map((d) => ({
    params: { design: d.slug },
  }));
  return {
    paths,
    fallback: "blocking",
  };
}
