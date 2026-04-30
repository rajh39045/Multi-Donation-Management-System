function Certificates() {

  const certificates = [
    {
      id: "CERT-001",
      title: "Donor Appreciation Certificate",
      date: "2026-03-10",
      downloads: "Download"
    },
    {
      id: "CERT-002",
      title: "Volunteer Service Certificate",
      date: "2026-02-22",
      downloads: "Download"
    }
  ];

  return (
    <div>

      <h2 className="text-2xl font-bold mb-6">
        My Certificates
      </h2>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white shadow rounded-xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Certificate ID</th>
              <th className="p-4 text-left">Title</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {certificates.map((cert) => (
              <tr key={cert.id} className="border-t">

                <td className="p-4">{cert.id}</td>
                <td className="p-4">{cert.title}</td>
                <td className="p-4">{cert.date}</td>

                <td className="p-4">
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
                  >
                    Download
                  </button>
                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>

      {/* Mobile Cards */}
      <div className="md:hidden flex flex-col gap-4">

        {certificates.map((cert) => (
          <div
            key={cert.id}
            className="bg-white shadow rounded-xl p-4"
          >

            <p className="font-semibold">
              {cert.title}
            </p>

            <p className="text-sm text-gray-600">
              ID: {cert.id}
            </p>

            <p className="text-sm text-gray-600">
              Date: {cert.date}
            </p>

            <button
              className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
            >
              Download
            </button>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Certificates;