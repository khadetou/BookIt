import { getSession } from "next-auth/client";
export default function UpdateProfilePage() {
  return (
    <div>
      <h1>User profile</h1>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
