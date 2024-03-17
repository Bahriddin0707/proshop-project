import { Helmet } from "react-helmet-async";

function Meta({ title, description, keywords }) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
}

Meta.defaultProps = {
  title: "Welcome to Electronics eCommerce website",
  description:
    "The best products with quality are always sold on this platform ",
  keywords:
    "buy electronics with comfortable price, electronics, cheap electronics, the best electronics",
};

export default Meta;
