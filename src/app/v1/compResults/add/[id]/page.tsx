export default async function Page({
  params,
}: Readonly<{ params: { id: string } }>) {
  const { id } = await params;
  return <div>test {id} test</div>;
}
