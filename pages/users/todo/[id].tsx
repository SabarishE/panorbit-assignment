import { useRouter } from "next/router";
import { Layout } from "components/Layout";
import { CommingSoon } from "components/CommingSoon";

const UserToDo = () => {
  const router = useRouter();

  const userId = router.query.id as string;

  return (
    <Layout title="Todo">
      <CommingSoon userId={userId} />
    </Layout>
  );
};

export default UserToDo;
