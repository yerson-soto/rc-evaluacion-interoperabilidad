import React from 'react'
import { InstitutionTimeline } from 'features/EvaluationDetail/InstitutionTimeline'
import { AppDrawer } from 'library/components/AppDrawer'
import { useToggleParam } from 'library/hooks/useToggleParam';
import { keys } from 'library/common/constants';

export default function RankingDetail() {
  const { visible, paramValue, setClose } = useToggleParam(keys.viewParamName);
  const institutionId = Number(paramValue);

  return (
    <AppDrawer 
      title="Ministerio de Administracion Publica" 
      open={visible} 
      onClose={setClose}
    >
      <InstitutionTimeline id={institutionId} />
    </AppDrawer>
  )
}
