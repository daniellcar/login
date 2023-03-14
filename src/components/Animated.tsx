import { chakra, shouldForwardProp } from "@chakra-ui/react";
import { AnimatePresence, isValidMotionProp, motion } from "framer-motion";
import React from "react";
import finishLoadingCommand from "../commands/auth/finish-loading-command";
import { useAppSelector } from "../redux";

interface TransitionContainerProps {
  children: React.ReactNode;
}

const MotionDiv = chakra(motion.div, {
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
});

function Animated(props: TransitionContainerProps) {
  const authState = useAppSelector((state) => state.auth);

  return (
    <MotionDiv
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.2 } }}
      exit={{ opacity: 0 }}
      onAnimationComplete={() => {
        if (authState.isLoading) finishLoadingCommand();
      }}
    >
      {props.children}
    </MotionDiv>
  );
}

export default Animated;
