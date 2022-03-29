import "../styles/fonts.css";
import "../styles/globals.css";
import "prismjs/themes/prism-okaidia.css";
import ThemeContextProvider from "../contexts/ThemeContext";
import { AnimatePresence, motion } from "framer-motion";

function MyApp({ Component, pageProps, router }) {
  return (
    <ThemeContextProvider>
      <AnimatePresence exitBeforeEnter>
        <motion.div
          key={router.route}
          initial={{ x: "200", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "-200", opacity: 0 }}
          transition={{ type: "tween", stiffness: 200 }}
        >
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>
    </ThemeContextProvider>
  );
}

export default MyApp;
