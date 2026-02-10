/**
 * Slice Simulator Page
 * Note: The @prismicio/slice-simulator-react package requires React 16-18
 * but this project uses React 19. This page is disabled until the package
 * is updated to support React 19.
 */

interface SliceSimulatorPageProps {
  readonly params?: Record<string, unknown>;
  readonly searchParams?: Record<string, string | string[]>;
}

export default function SliceSimulatorPage(): JSX.Element {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-center">
        Slice Simulator is temporarily disabled due to React version
        incompatibility.
      </p>
    </div>
  );
}
