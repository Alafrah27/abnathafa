import { ArrowDown } from "lucide-react";
import { motion } from "framer-motion";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { UserInfo } from "../services/useAuth";

function Hero() {
  const navigate = useNavigate()
  const { User } = UserInfo()
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  // Variants for children elements
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  // Button hover animation
  // const buttonVariants = {
  //   hover: {
  //     scale: 1.05,
  //     backgroundColor: "#EBF5FF",
  //     transition: { duration: 0.2 }
  //   }
  // };

  // Arrow bounce animation
  const arrowVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delay: 1.2, duration: 0.5 }
    },
    bounce: {
      y: [0, -10, 0],
      transition: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 1.2,
        ease: "easeInOut"
      }
    }
  };

  const Content = useMemo(() => ({
    title: ` الأسرة والقبيلة هما الركيزة الأساسية في حياة الإنسان، حيث يجسدان
          الوفاء والإخلاص الذي ينبع من روابط الدم والعشرة. إن وفاء الأهل
          وإخلاصهم هو السند الحقيقي الذي يمنحنا القوة والأمان، ويشجعنا على
          البناء والتقدم بثقة. فهما النبع الذي نستمد منه الحب والحنان، ويظل
          عنوانًا للوفاء والولاء عبر الأجيال.`
  }), [])

  return (
    <motion.section className="flex flex-col items-center justify-between h-screen bg-gradient-to-r from-blue-500 to-purple-500 text-white w-full px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}>
      {/* Content at the top */}
      <motion.div className="text-center flex flex-col items-center justify-center gap-2.5 mt-8 w-full flex-1"
        variants={containerVariants}
        initial="hidden"
        animate="visible">
        <motion.h1 className="text-4xl font-bold  "
          style={{
            margin: "20px",
          }}
          variants={itemVariants}>رأبطة ابناء طفع للتواصل</motion.h1>
        <motion.p className=" text-[17px] font-medium p-4 lg:w-1/2 w-full"
          variants={itemVariants}>
          {Content.title}
        </motion.p>
        <motion.button style={{
          backgroundColor: "white",
          color: "#3B82F6",
          fontWeight: "bold",
          padding: "16px 24px",
          borderRadius: "8px",
          marginTop: "16px",
          transition: "background-color 0.3s ease",
        }}
          variants={itemVariants}
          whileHover="hover"
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            if (User) {
              navigate("/posts")
              window.scrollTo({
                top: 0,
                behavior: 'smooth'
              });
            } else {
              navigate("/login")
              window.scrollTo({
                top: 0,
                behavior: 'smooth'
              });
            }
          }}
        >
          انضم إلينا الآن
        </motion.button>
      </motion.div>
      {/* Arrow at the bottom */}
      <motion.div className="mb-8"
        variants={arrowVariants}
        initial="hidden"
        animate={["visible", "bounce"]}>
        <ArrowDown className="animate-bounce" size={30} />
      </motion.div>
    </motion.section >
  );
}

export default Hero;
