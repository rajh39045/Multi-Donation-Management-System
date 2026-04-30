import { motion } from "framer-motion";

function Hero() {
  return (
    <section className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Connecting Donors, Volunteers & NGOs
        </h1>
        <p className="mb-8 text-lg md:text-xl">
          Transparent. Efficient. Impactful.
        </p>
      </motion.div>
    </section>
  );
}

export default Hero;