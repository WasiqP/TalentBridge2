export default function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-svh bg-paper-50">{children}</div>;
}
