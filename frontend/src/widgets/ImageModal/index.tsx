import { AnimatePresence, motion } from 'framer-motion';
import { useImageModalStore } from '@/app/store';

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modal = {
  hidden: { y: '-100vh', opacity: 0, delay: 0.2 },
  visible: {
    y: '0',
    opacity: 1,
    transition: { delay: 0.2 },
  },
};

export const ImageModal = () => {
  const { open, setOpen, imageUrl } = useImageModalStore();

  return (
    <AnimatePresence mode="wait">
      {open && (
        <motion.div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 flex justify-center items-center z-50 hover:cursor-pointer"
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={() => setOpen(false)}
        >
          <motion.div
            className="p-8"
            variants={modal}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={e => e.stopPropagation()}
          >
            <img
              src={imageUrl}
              alt="Modal Image"
              onClick={() => setOpen(false)}
              className="mb-4 max-w-full h-auto hover:cursor-pointer"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
