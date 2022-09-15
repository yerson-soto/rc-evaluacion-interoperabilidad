import React from 'react'
import { ChangePassword } from './ChangePassword'
import { useChangePassword } from './useChangePassword';

export default function PasswordConfig() {
  const { isLoading, changePassword } = useChangePassword();
  
  return (
    <ChangePassword isLoading={isLoading} onSave={changePassword} />
  )
}
