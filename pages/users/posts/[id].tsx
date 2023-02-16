import { Layout } from "components/Layout";
import { useRouter } from "next/router";
import { CommingSoon } from "components/CommingSoon";

const UserPost = () => {
  const router = useRouter();

  const userId = router.query.id as string;

  return (
    <>
      <Layout title="Posts">
        <CommingSoon userId={userId} />
      </Layout>
    </>
  );
};

export default UserPost;
