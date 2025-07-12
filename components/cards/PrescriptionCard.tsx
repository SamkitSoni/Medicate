import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Link from "next/link";
import { formatDate } from "@/lib/utils";

interface Props {
  prescriptionRecord: {
    _id: string;
    userId: string;
    prescriptionName: string;
    dateIssued: string;
    additionalNotes: string;
    prescribingDoctor: string;
    prescriptionFileUrl: string;
    createdAt: string;
    updatedAt: string;
  }[];
}

const PrescriptionCard = ({ prescriptionRecord }: Props) => {
  return (
    <div className="space-y-8">
      {prescriptionRecord.map((item) => (
      <div key={item._id} className="flex items-center">
        <Image
        src={item.prescriptionFileUrl || "/assets/images/no-img.webp"}
        height={40}
        width={40}
        alt="doc"
        className="rounded-full"
        />
      <div className="ml-4 space-y-1">
        <p className="text-sm font-medium leading-none">{item.prescriptionName}</p>
        <p className="text-sm text-muted-foreground">
          {item.prescribingDoctor}
        </p>
      </div>
      <Dialog>
            <DialogTrigger asChild>
              <Button className="ml-auto font-semibold bg-green-500 hover:bg-green-400 text-white">View</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[90vw] md:max-w-[1000px] bg-white dark:bg-dark-200 rounded-lg p-6">
              <DialogHeader className="space-y-4">
                <DialogTitle className="font-bold text-2xl">Prescription Report</DialogTitle>
                <DialogDescription>
                  View the details of your prescription.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {/* Certificate Image */}
                <div className="flex justify-center sm:col-span-1 md:col-span-1 lg:col-span-1">
                  <Link href={`${item.prescriptionFileUrl}`} target="_blank">
                    
                      <Image
                        src={item.prescriptionFileUrl || "/assets/images/no-img.webp"}
                        height={250}
                        width={250}
                        alt="Vaccination Certificate"
                        className="rounded-full object-cover"
                      />
                  </Link>
                </div>

                {/* Details Section */}
                <div className="flex flex-col justify-center space-y-4">
                  <h1 className="text-lg font-semibold text-gray-800 dark:text-white">
                    <span className="text-lg font-semibold text-gray-800 dark:text-white">Prescription:</span> {item.prescriptionName}
                  </h1>
                  <h1 className="text-md text-gray-700 dark:text-gray-300">
                    <span className="text-lg font-semibold text-gray-800 dark:text-white">Doctor:</span> {item.prescribingDoctor}
                  </h1>
                  <p className="text-md text-gray-700 dark:text-gray-300">Additional : {item.additionalNotes}</p>
                  <p className="text-md text-gray-700 dark:text-gray-300">
                    <span className="text-lg font-semibold text-gray-800 dark:text-white">Vaccination Date:</span> {formatDate(item.dateIssued)}
                  </p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
    </div>
      ))}
    </div>
  );
};

export default PrescriptionCard;
