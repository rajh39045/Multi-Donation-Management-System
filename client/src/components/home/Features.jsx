function Features() {
  const features = [
    "Transparent Tracking",
    "Volunteer Coordination",
    "Automated Certificates"
  ];

  return (
    <section id="features" className="py-20 text-center">
      <h2 className="text-3xl font-bold mb-10">Features</h2>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
        {features.map((item, index) => (
          <div key={index} className="p-6 shadow-lg rounded-xl">
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;