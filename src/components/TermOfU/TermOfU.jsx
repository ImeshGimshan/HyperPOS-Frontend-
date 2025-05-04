import React from "react";

const TermOfU = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-md mt-10">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Terms & Conditions</h1>
      <p className="mb-4 text-gray-700">
        Welcome to our Point of Sale system. By using this system, you agree to comply with and be bound by the following terms and conditions. Please review them carefully.
      </p>
      <ul className="list-disc pl-5 text-gray-700 space-y-2">
        <li>Users must be authorized staff or personnel.</li>
        <li>All sales data are stored securely and confidentially.</li>
        <li>Any misuse or unauthorized access will result in termination of access and legal action.</li>
        <li>System availability is not guaranteed during maintenance windows.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">Privacy Policy</h2>
      <p className="mb-4 text-gray-700">
        We respect your privacy. This policy outlines how we collect, use, and protect your personal and transactional data within our POS system.
      </p>
      <ul className="list-disc pl-5 text-gray-700 space-y-2">
        <li>We collect only necessary data for processing transactions and system operation.</li>
        <li>Your data is encrypted and stored on secure servers.</li>
        <li>We do not share your data with third parties without consent.</li>
        <li>You can request data deletion by contacting the admin.</li>
      </ul>

      <p className="mt-6 text-gray-600 text-sm">
        Last updated: May 4, 2025. If you have any questions, please contact our admin team.
      </p>
    </div>
  );
};

export default TermOfU;
