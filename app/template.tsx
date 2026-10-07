/** Re-mounts on every navigation, giving each page a short, CSS-only entrance. */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
