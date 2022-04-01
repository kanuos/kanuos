import { ContactEmail } from "../public/ContactEmail";
import ContactModal from "../public/ContactModal";

const ContactMe = ({ isDarkMode }) => {
  return (
    <section className="h-screen p-10 grid place-items-center relative">
      <div className="flex flex-col items-start gap-y-2 justify-around w-11/12 max-w-3xl">
        <ContactEmail isDarkMode={isDarkMode} />
        <ContactModal isDarkMode={isDarkMode} />
      </div>
    </section>
  );
};

export default ContactMe;
