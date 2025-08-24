// This layout is now simplified since the main layout handles sidebar and topnav
export default function POSLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}