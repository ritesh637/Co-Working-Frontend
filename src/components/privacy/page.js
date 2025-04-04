import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="text-gray-800">
      
      <div
        className="h-[350px] flex flex-col items-center justify-center text-white text-center"
        style={{
          backgroundImage:
            "url('https://www.goodworks.in/wp-content/uploads/2023/11/people-social-distancing-work_11zon-1536x1059.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-black/50 w-full h-full flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold">Privacy Policy</h1>
          <p className="text-lg mt-2">Please read it carefully</p>
        </div>
      </div>

      {/* Privacy Content */}
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
        <section className="space-y-6">
          <div className="group">
            <h2 className="text-2xl font-semibold text-gray-900 transition-all duration-300 group-hover:text-blue-600">
              1. Information We Collect
            </h2>
            <p className="text-gray-700 group-hover:translate-x-1 transition-all duration-300">
              We collect personal information such as name, email, phone number,
              and payment details.
            </p>
          </div>

          <div className="group">
            <h2 className="text-2xl font-semibold text-gray-900 transition-all duration-300 group-hover:text-blue-600">
              2. How We Use Your Information
            </h2>
            <p className="text-gray-700 group-hover:translate-x-1 transition-all duration-300">
              We use your data to provide and improve our services, ensure
              security, and communicate updates.
            </p>
          </div>

          <div className="group">
            <h2 className="text-2xl font-semibold text-gray-900 transition-all duration-300 group-hover:text-blue-600">
              3. Sharing of Information
            </h2>
            <p className="text-gray-700 group-hover:translate-x-1 transition-all duration-300">
              We do not sell your data. We may share information with trusted
              partners for service improvement.
            </p>
          </div>

          <div className="group">
            <h2 className="text-2xl font-semibold text-gray-900 transition-all duration-300 group-hover:text-blue-600">
              4. Security Measures
            </h2>
            <p className="text-gray-700 group-hover:translate-x-1 transition-all duration-300">
              We take strong security measures to protect your information from
              unauthorized access.
            </p>
          </div>

          <div className="group">
            <h2 className="text-2xl font-semibold text-gray-900 transition-all duration-300 group-hover:text-blue-600">
              5. Policy Updates
            </h2>
            <p className="text-gray-700 group-hover:translate-x-1 transition-all duration-300">
              We may update this policy periodically. Any changes will be posted
              on our website.
            </p>
          </div>
        </section>

        {/* Contact Details */}
        <div className="mt-10 bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-900">Contact Us</h2>
          <p className="text-gray-700 mt-2">
            If you have any questions, feel free to reach out to us.
          </p>

          <div className="mt-4">
            <p className="text-gray-900 font-semibold">📍 Office Address:</p>
            <p className="text-gray-700">
              1910, Kamdhenu Commerz, next to Raghunath Vihar, Block-J ,
              Raghunath Vihar, Sector14, Kharghar, Navi Mumbai, 410210
            </p>
          </div>

          <div className="mt-4">
            <p className="text-gray-900 font-semibold">📞 Contact Number:</p>
            <p className="text-gray-700">+91 7707076831</p>
          </div>

          <div className="mt-4">
            <p className="text-gray-900 font-semibold">📧 Email:</p>
            <p className="text-blue-600 font-semibold">support@.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
