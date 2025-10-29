import { SignIn } from "@clerk/clerk-react";
import { useAppContext } from "../../context/AppContext";

export default function ProtectedAdminRoute({ children }) {
  
    console.log(useAppContext());

    const { user } = useAppContext();

  if (!user) {
    return <SignIn fallbackRedirectUrl="/admin" />;
  }

  return children;
}
