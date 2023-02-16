import { useRouter } from "next/router";
import { Layout } from "components/Layout";
import { CommingSoon } from "components/CommingSoon";

const UserGallery = () => {
  const router = useRouter();

  const userId = router.query.id as string;

  return (
    <Layout title="Gallery">
      <CommingSoon userId={userId} />
    </Layout>
  );
};

export default UserGallery;
