import { useRef, useState } from "react";
import { AuthService } from "library/api/services/AuthService";

export function useSendResetMail() {
  const [isLoading, setLoading] = useState(false);
  const [isSent, setSent] = useState(false);

  const emailRef = useRef("");

  const authService = new AuthService();

  const sendResetMail = async (email: string): Promise<void> => {
    setLoading(true);
    emailRef.current = email;

    await authService
      .sendResetLink(email)
      .then(() => setSent(true))
      .catch(() => setSent(false));

    setLoading(false);
  };

  return { isSent, email: emailRef.current, isLoading, sendResetMail };
}
