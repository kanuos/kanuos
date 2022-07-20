import "../styles/globals.css";
import "../styles/fonts.css";
import "prismjs/themes/prism-okaidia.css";
import ThemeContextProvider from "../contexts/ThemeContext";
import { AnimatePresence, motion } from "framer-motion";
import NavContextProvider from "../contexts/NavContext";

function MyApp({ Component, pageProps, router }) {
  return (
    <ThemeContextProvider>
      <AnimatePresence exitBeforeEnter>
        <motion.div
          key={router.route}
          initial={{ opacity: 0.25 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0.25 }}
          transition={{ type: "linear", stiffness: 200 }}
        >
          <NavContextProvider>
            <Component {...pageProps} />
          </NavContextProvider>
        </motion.div>
      </AnimatePresence>
    </ThemeContextProvider>
  );
}

export default MyApp;
