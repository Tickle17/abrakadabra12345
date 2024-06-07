import { AnimatePresence, motion } from 'framer-motion';

export const AnimationWrapper = ({
  visible,
  children,
}: {
  visible: boolean;
  children: React.ReactNode;
}) => {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: '-100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{
            y: '125%',
            opacity: 0,
            transition: { duration: 0.75, type: 'spring' },
          }}
          transition={{ duration: 0.75, type: 'spring', delay: 0.75 }}
          className="flex flex-col w-full max-w-[500px] h-[675px] border border-slate-950 rounded-[2px] bg-white p-10"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
