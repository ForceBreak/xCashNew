'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

type ModalOptions = {
  title?: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
};

type ModalContextType = {
  openModal: (content: ReactNode, options?: ModalOptions) => void;
  closeModal: () => void;
};

const ModalContext = createContext<ModalContextType | null>(null);

const sizeClasses = {
  sm: 'sm:max-w-sm',
  md: 'sm:max-w-md',
  lg: 'sm:max-w-lg',
  xl: 'sm:max-w-xl',
  full: 'sm:max-w-[90vw]',
};

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<ReactNode>(null);
  const [options, setOptions] = useState<ModalOptions>({});

  const openModal = useCallback(
    (newContent: ReactNode, newOptions?: ModalOptions) => {
      setContent(newContent);
      setOptions(newOptions || {});
      setIsOpen(true);
    },
    [],
  );

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setTimeout(() => setContent(null), 300);
  }, []);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}

      <Dialog open={isOpen} onOpenChange={(open) => !open && closeModal()}>
        <DialogContent className={sizeClasses[options.size || 'md']}>
          {(options.title || options.description) && (
            <DialogHeader>
              {options.title && <DialogTitle>{options.title}</DialogTitle>}
              {options.description && (
                <DialogDescription>{options.description}</DialogDescription>
              )}
            </DialogHeader>
          )}
          <div className="mt-2">{content}</div>
        </DialogContent>
      </Dialog>
    </ModalContext.Provider>
  );
}

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error('useModal must be used inside ModalProvider');
  return ctx;
}
