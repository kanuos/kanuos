// Project Detail View
import dynamic from "next/dynamic";
import { useContext } from "react";

// import : internal
import PublicLayout from "../../components/Layouts/PublicLayout";
import { ThemeContext } from "../../contexts/ThemeContext";
import { getAllDesigns, getIndividualDesign } from "../../database/designs";
import { generateDetailViewMetadata } from "../../utils";

// dynamic imports

const DesignDetailBody = dynamic(() =>
  import("../../components/content/DesignDetailBody").then(
    (m) => m.DesignDetailBody
  )
);
const ContactMe = dynamic(() =>
  import("../../components/portfolio/ContactMe").then((m) => m.ContactMe)
);

const DesignDetail = ({ design }) => {
  design = JSON.parse(design);
  const content = generateDetailViewMetadata(
    design.title,
    design.tags?.map(({ tag }) => tag)?.toString(),
    design.tools?.toString(),
    "design"
  );

  const { isDarkMode } = useContext(ThemeContext);

  return (
    <PublicLayout metaTitle={`Design : ` + design.title} metaDesc={content}>
      <div className="h-auto w-full">
        <DesignDetailBody design={design} />
      </div>
      <ContactMe portfolioMode={false} isDarkMode={isDarkMode} />
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
