import { DESKTOP_BREAKPOINT } from '@/shared/consts';
import { useWindowWidth } from '@react-hook/window-size';
import { motion, AnimatePresence } from 'framer-motion';

export const AnimationWrapper = ({
  visible,
  children,
}: {
  visible: boolean;
  children: React.ReactNode;
}) => {
  const isDesktop = useWindowWidth() >= DESKTOP_BREAKPOINT;
  return (
    <>
      {isDesktop && (
        <AnimatePresence>
          {visible && (
            <motion.div
              initial={{ y: '-100%', opacity: 0 }}
              animate={{
                y: 0,
                opacity: 1,
                transition: { duration: 0.75, type: 'spring', delay: 0.75 },
              }}
              exit={{
                y: '100%',
                opacity: 0,
                transition: { duration: 0.75, type: 'spring' },
              }}
              className="flex flex-col w-full max-w-[500px] h-[675px] md:border md:border-slate-950 md:rounded-[2px] md:bg-white px-10 md:p-10"
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {!isDesktop && visible && (
        <div className="flex flex-col w-full max-w-[500px] h-[675px] md:border md:border-slate-950 md:rounded-[2px] md:bg-white px-10 md:p-10">
          {children}
        </div>
      )}
    </>
  );
};
