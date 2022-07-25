import { useState } from "react";
import { UserIdentity } from "library/models/User";
import { UserService } from "library/api/services/UserService";

export function useUserIdentity() {
  const [identity, setIdentity] = useState<UserIdentity | null>(null);
  const [isVerifying, setVerifying] = useState<boolean>(false);
  const [isInvalid, setInvalid] = useState<boolean>(false);
  const service = new UserService();

  const verifyIdentity = async (identityCard: string): Promise<void> => {
    setVerifying(true);

    await service.verifyIdentityCard(identityCard)
      .then((result) => {
        setIdentity(result);
        setInvalid(false);
      })
      .catch(() => {
        setIdentity(null);
        setInvalid(true);
      });

    setVerifying(false);
  };

  const cancelVerification = (): void => {
    setInvalid(false);
    setVerifying(false);
    setIdentity(null);
  }

  return {  identity, isInvalid, isVerifying, verifyIdentity, cancelVerification, };
}
