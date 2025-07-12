import Image from 'next/image';
import React from 'react';

interface PrescriptionCardProps {
  vaccineName: string;
  doctorName: string;
  dosage: string;
  date: string;
  photoUrl?: string;
}

const VaccinationRecordCard: React.FC<PrescriptionCardProps> = ({
  vaccineName,
  doctorName,
  photoUrl,
  dosage,
  date,
}) => {
  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="flex items-center p-4">
        {photoUrl && (
          <Image
            src={photoUrl}
            width={30}
            height={30}
            alt="Photo"
            className="w-16 h-16 rounded-full object-cover mr-4"
          />
        )}
        <div>
          <h2 className="text-xl font-semibold text-gray-800">{vaccineName}</h2>
        </div>
      </div>
      <div className="border-t border-gray-200 p-4">
        <p className="text-gray-800 mt-2">
          <span className="font-bold">Doctor Name: </span>{doctorName}
        </p>
        <p className="text-gray-800 mt-2">
          <span className="font-bold">Dosage: </span>{dosage}
          <span className="font-bold">Vaccine Date: </span>{date}

        </p>
      </div>
    </div>
  );
};

export default VaccinationRecordCard;
