import { motion } from 'framer-motion';

export type PAnimatedImage = {
    imageUrl: string;
    onClick?: () => void;
};

export const AnimatedImage = ({ imageUrl, onClick } : PAnimatedImage) => {
    return (
        <div className="relative w-full">
        <motion.div
          className="w-full"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
            <motion.img
                src={imageUrl}
                className="max-h-[100px] w-auto object-contain hover:cursor-pointer"
                whileHover={{ scale: 1.1 }}
                onClick={onClick}
            />
        </motion.div>
      </div>
    );
};