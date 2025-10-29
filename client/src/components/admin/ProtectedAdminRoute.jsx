import { SignIn } from "@clerk/clerk-react";
import { useAppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ProtectedAdminRoute({ children }) {
  const { user, isAdmin, checkingAdmin } = useAppContext();

    console.log(user, isAdmin, checkingAdmin);  

  const navigate = useNavigate();
  const [toastShown, setToastShown] = useState(false); // prevent multiple toasts

  // Redirect non-admin users and show toast
  useEffect(() => {
    if (user && !isAdmin && !checkingAdmin) {
      if (!toastShown) {
        toast.error("Access denied. Admins only.");
        setToastShown(true);
      }
      navigate("/", { replace: true });
    }
  }, [user, isAdmin, checkingAdmin, navigate, toastShown]);

  // Show spinner while checking admin status
  if (checkingAdmin) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  // If not logged in, show SignIn
  if (!user) return <SignIn fallbackRedirectUrl="/admin" />;

  // If user is not admin (redirect already triggered), don't render children
  if (!isAdmin) return null;

  // Authorized, render children
  return children;
}
