function HowItWorks() {
  const steps = [
    "Register & Login",
    "Create Donation",
    "Admin Verification",
    "Receive Certificate"
  ];

  return (
    <section id="how" className="py-20 bg-gray-100 text-center">
      <h2 className="text-3xl font-bold mb-10">How It Works</h2>

      <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto px-6">
        {steps.map((step, index) => (
          <div key={index} className="p-6 bg-white shadow-md rounded-lg">
            <div className="text-blue-600 text-2xl font-bold mb-2">
              {index + 1}
            </div>
            {step}
          </div>
        ))}
      </div>
    </section>
  );
}

export default HowItWorks;