import React from "react";

const TermOfU = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#2a0036] to-[#000828] px-4 py-10">
      <div className="flex flex-col gap-8 w-full max-w-3xl">
        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 text-white shadow-lg">
          <h1 className="text-2xl font-bold mb-4 text-purple-300 text-center">
            Terms & Conditions
          </h1>
          <p className="mb-4 text-purple-100 text-sm">
            Welcome to our Point of Sale system. By using this system, you agree
            to comply with and be bound by the following terms and conditions.
            Please review them carefully.
          </p>
          <ul className="list-disc pl-5 text-purple-100 space-y-2 text-sm">
            <li>Users must be authorized staff or personnel.</li>
            <li>All sales data are stored securely and confidentially.</li>
            <li>
              Any misuse or unauthorized access will result in termination of
              access and legal action.
            </li>
            <li>
              System availability is not guaranteed during maintenance windows.
            </li>
          </ul>
        </div>

        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 text-white shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-purple-300 text-center">
            Privacy Policy
          </h2>
          <p className="mb-4 text-purple-100 text-sm">
            We respect your privacy. This policy outlines how we collect, use,
            and protect your personal and transactional data within our POS
            system.
          </p>
          <ul className="list-disc pl-5 text-purple-100 space-y-2 text-sm">
            <li>
              We collect only necessary data for processing transactions and
              system operation.
            </li>
            <li>Your data is encrypted and stored on secure servers.</li>
            <li>
              We do not share your data with third parties without consent.
            </li>
            <li>You can request data deletion by contacting the admin.</li>
          </ul>
        </div>

        <p className="text-sm text-purple-400 text-center">
          Last updated: May 4, 2025. If you have any questions, please contact
          our admin team.
        </p>
      </div>
    </div>
  );
};

export default TermOfU;
