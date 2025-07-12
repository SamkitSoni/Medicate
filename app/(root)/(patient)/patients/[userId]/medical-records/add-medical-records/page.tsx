import MedicalHistoryDashboard from '@/components/shared/MedicalHistoryDashboard'
import { SearchParamProps } from '@/types'
import React from 'react'


const MedicalRecordForm = async({ params: { userId } }: SearchParamProps) => {

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container w-full flex-1 flex-col">
          <MedicalHistoryDashboard userId={userId}/>
        
        </div>
    </section>

    </div>
  )
}

export default MedicalRecordForm