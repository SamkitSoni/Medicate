import LabReportForm from '@/components/forms/LabReportForm'
import { SearchParamProps } from '@/types'
import Image from 'next/image'
import React from 'react'

const LabReport = ({ params: { userId } }: SearchParamProps) => {
  return (

    <div className="flex h-screen max-h-screen">
    <section className="remove-scrollbar container my-auto">
      <div className="sub-container max-w-[860px] flex-1 justify-between">
         <LabReportForm userId={userId} />
        <div className="text-14-regular flex justify-between">
          <p className="copyright mt-10 ">
            &copy; 2024 Medicate
          </p>
        </div>
      </div>
    </section>
    <Image
      src="/assets/images/appointment-img.png"
      height={1000}
      width={1000}
      className="side-img max-w-[390px] bg-bottom hidden md:flex"
      alt="appointment"
    />
  </div>

  )
}

export default LabReport