import { motion } from "framer-motion";
import Input from "../components/common/Input";
import { User } from "lucide-react";
import { useState } from "react";

const SignUpPage = () => {
  const [name, setName] = useState("");

  const handleSignUp = (e) => {
    e.preventDefault();
    console.log("Sign Up");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden flex-col justify-center"
    >
      <div className="p-8">
        <h2 className="text-3xl font-bolt mb-6 text-center bg-gradient-to-r from-blue-800 to-blue-950 text-transparent bg-clip-text">
          Create Account
        </h2>
        <form onSubmit={handleSignUp}>
          <Input
            icon={User}
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </form>
      </div>
    </motion.div>
  );
};

export default SignUpPage;
