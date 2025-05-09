import { auth } from "@/auth";


export default async function Home() {
  const session = await auth();
  return (
    <div>
      <p>{session?.user?.email}</p>
      <p>{session?.user?.name}</p>
    </div>
  );
}
