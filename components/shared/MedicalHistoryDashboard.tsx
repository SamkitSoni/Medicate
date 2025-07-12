import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { getLabReportById, getPrescriptionRecordById, getVaccinationRecordById } from '@/lib/actions/medicalhistory.actions'
import VaccinationCard from './VaccinationCard'
import PrescriptionCard from '../cards/PrescriptionCard'
import LabReportCard from '../cards/LabReportCard'
import Image from 'next/image'

const MedicalHistoryDashboard = async ({ userId }: { userId: string }) => {
  const vaccinationRecord = await getVaccinationRecordById(userId)
  const prescriptionRecord = await getPrescriptionRecordById(userId)
  const labReportRecord = await getLabReportById(userId)
  return (
    <>
      <div className="flex-col md:flex">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Health records</h2>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger className='bg-green-500 text-white font-semibold px-3 py-2 flex items-center rounded-md border-none'>
              Add Records <ChevronDown />
            </DropdownMenuTrigger>
            <DropdownMenuContent className='flex flex-col dark:bg-dark-300 bg-white font-semibold text-gray-800 dark:text-white dark:border-gray-700 p-4'>
              <DropdownMenuLabel>Add Medical Records</DropdownMenuLabel>
              <DropdownMenuSeparator className='bg-gray-700' />
              <Link className='flex gap-1 py-2' href={`/patients/${userId}/medical-records/vaccine-record`}> <Image src="/assets/icons/vaccine.svg" width={20} height={20} alt='vaccine' className='dark:invert' /> Vaccination Record</Link>
              <Link className='flex gap-1 py-2' href={`/patients/${userId}/medical-records/prescription-record`}> <Image src="/assets/icons/medicine.svg" width={20} height={20} alt='vaccine' className='dark:invert' /> Prescription Record</Link>
              <Link className='flex gap-1 py-2' href={`/patients/${userId}/medical-records/lab-report`}> <Image src="/assets/icons/report.svg" width={20} height={20} alt='vaccine' className='dark:invert' /> Lab Report</Link>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className='dark:border-gray-700'>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Vaccine Records
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{vaccinationRecord.length}</div>
              </CardContent>
            </Card>
            <Card className='dark:border-gray-700'>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Prescription Records
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{prescriptionRecord.length}</div>
              </CardContent>
            </Card>
            <Card className='dark:border-gray-700'>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Lab Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{labReportRecord.length}</div>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-3 dark:border-gray-700">
              <CardHeader>
                <CardTitle>Vaccination Record</CardTitle>
                <CardDescription>
                  There are total {vaccinationRecord.length} vaccination records.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <VaccinationCard vaccinationRecord={vaccinationRecord} />
              </CardContent>
            </Card>
            <Card className="col-span-3 dark:border-gray-700">
              <CardHeader>
                <CardTitle>Prescription Record</CardTitle>
                <CardDescription>
                  There are total {prescriptionRecord.length} prescription records.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PrescriptionCard prescriptionRecord={prescriptionRecord} />
              </CardContent>
            </Card>
            <Card className="col-span-3 dark:border-gray-700">
              <CardHeader>
                <CardTitle>Lab Record</CardTitle>
                <CardDescription>
                  There are total {labReportRecord.length} lab records.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <LabReportCard labRecord={labReportRecord} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}

export default MedicalHistoryDashboard
