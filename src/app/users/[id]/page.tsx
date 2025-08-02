import UserDetails from "@/components/pages/Users/user-details";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export const dynamic = "force-dynamic";

const Page = async ({ params }: Props) => {
  const { id } = await params;
  return <UserDetails userId={id} />;
};

// export default UserDetails;
export default Page;
