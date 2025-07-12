import { StatCard } from '@/components/cards/StatCard';
import { DataTable } from '@/components/table/DataTable';
import { columns } from '@/components/table/columns';
import { getDoctorAppointment, getDoctorById } from '@/lib/actions/doctor.actions';


interface Doctor {
  isVerified: boolean;
  profile_photo: string;
  name: string;
}

interface Appointment {
  _id: string;
  status: string;
}

interface AppointmentsResponse {
  scheduledCount: number;
  pendingCount: number;
  cancelledCount: number;
  appointments: Appointment[];
}

const Dashboard = async ({ params }: { params: { doctorId: string } }) => {
  const { doctorId } = params;

  const doctor: Doctor | null = await getDoctorById(doctorId);

  if (!doctor) {
    return <p>Doctor not found.</p>;
  }


  const appointments: AppointmentsResponse | null = await getDoctorAppointment();

  if (!appointments) {
    return <p>Appointments not found.</p>;
  }

  const { scheduledCount, pendingCount, cancelledCount, appointments: appointmentList } = appointments;

  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14 sm:p-3">
      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header flex w-full">
            Welcome, Dr. {doctor.name} 👋
            </h1>
          <p className="text-dark-600 dark:text-dark-700">
            Start the day by managing new appointments
          </p>
        </section>

        <section className="admin-stat">
          <StatCard
            type="appointments"
            count={scheduledCount}
            label="Scheduled appointments"
            icon="/assets/icons/appointments.svg"
          />
          <StatCard
            type="pending"
            count={pendingCount}
            label="Pending appointments"
            icon="/assets/icons/pending.svg"
          />
          <StatCard
            type="cancelled"
            count={cancelledCount}
            label="Cancelled appointments"
            icon="/assets/icons/cancelled.svg"
          />
        </section>
         {/* @ts-expect-error DataTable component has type mismatch with appointment data structure */}
        <DataTable columns={columns} data={appointmentList} />
      </main>
    </div>
  );
};

export default Dashboard;
