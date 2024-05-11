export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="md:container md:mx-auto pt-24">
      <div className="pt-8 mx-auto max-w-xl">{children}</div>
    </section>
  );
}
