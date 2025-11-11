import { useEffect, useRef, ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: ReactNode;
}

export function Portal({ children }: PortalProps) {
  const portalRoot = useRef<HTMLElement | null>(null);

  useEffect(() => {
    portalRoot.current = document.body;
  }, []);

  if (!portalRoot.current) {
    return null;
  }

  return createPortal(children, portalRoot.current);
}
