import UserDetails from "@/components/pages/Users/user-details";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export const dynamic = "force-dynamic";

const Page = async ({ params }: Props) => {
  const { id } = await params;
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <UserDetails userId={id} />
    </div>
  );
};

// export default UserDetails;
export default Page;
