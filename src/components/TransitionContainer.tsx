import { chakra, shouldForwardProp } from "@chakra-ui/react";
import { AnimatePresence, isValidMotionProp, motion } from "framer-motion";

interface TransitionContainerProps {
  children: React.ReactNode;
  onAnimationComplete: () => void;
  condition: boolean;
}

const MotionDiv = chakra(motion.div, {
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
});

function TransitionContainer(props: TransitionContainerProps) {
  return (
    <AnimatePresence>
      {props.condition && (
        <MotionDiv
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.2 } }}
          exit={{ opacity: 0 }}
          onAnimationComplete={props.onAnimationComplete}
        >
          {props.children}
        </MotionDiv>
      )}
    </AnimatePresence>
  );
}

export default TransitionContainer;
