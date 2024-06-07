import { motion } from 'framer-motion';
import ReactCurvedText from 'react-curved-text';
import { useWindowWidth } from '@react-hook/window-size';
import { DESKTOP_BREAKPOINT } from '@/shared/consts';

export const ReksoftSpinner = () => {
  const isDesktop = useWindowWidth() >= DESKTOP_BREAKPOINT;
  return (
    <>
      {isDesktop && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 50,
            ease: 'linear',
          }}
          className="hidden lg:block w-[225px] h-[225px] rounded-full border border-slate-950"
        >
          <ReactCurvedText
            text="Reksoft Reksoft Reksoft Reksoft Reksoft Reksoft Reksoft Reksoft Reksoft"
            width={225}
            height={225}
            cx={112.5}
            cy={112.5}
            rx={100}
            ry={100}
            startOffset={0}
            reversed={false}
            textProps={{
              style: {
                fontSize: 17.25,
                fontFamily: 'Montserrat',
                fontWeight: '400',
              },
            }}
          />
        </motion.div>
      )}
    </>
  );
};
