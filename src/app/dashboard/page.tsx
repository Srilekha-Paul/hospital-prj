// import connectDB from "@/lib/mongodb";
// import FhirResource from "@/models/FhirResource";

// async function fetchCount(type: string) {
//   await connectDB();

//   const count = await FhirResource.countDocuments({
//     resourceType: type,
//   });

//   return count;
// }

// export default async function Dashboard() {
//   const patientCount = await fetchCount("Patient");
//   const labCount = await fetchCount("Observation");
//   const medCount = await fetchCount("MedicationRequest");
//   const billCount = await fetchCount("Claim");

//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

//       <div className="grid grid-cols-4 gap-6">
//         <Card title="Patients" value={patientCount} />
//         <Card title="Lab Reports" value={labCount} />
//         <Card title="Prescriptions" value={medCount} />
//         <Card title="Bills" value={billCount} />
//       </div>
//     </div>
//   );
// }

// function Card({ title, value }: { title: string; value: number }) {
//   return (
//     <div className="bg-white shadow p-6 rounded-lg">
//       <h3 className="text-lg font-semibold">{title}</h3>
//       <p className="text-3xl mt-3">{value}</p>
//     </div>
//   );
// }

import connectDB from "@/lib/mongodb";
import FhirResource from "@/models/FhirResource";

async function fetchCount(type: string): Promise<number> {
  try {
    await connectDB();

    const count = await FhirResource.countDocuments({
      resourceType: type,
    });

    return count;
  } catch (error) {
    console.error("Dashboard Count Error:", error);
    return 0; // prevent crash
  }
}

export default async function Dashboard() {
  const [patientCount, labCount, medCount, billCount] =
    await Promise.all([
      fetchCount("Patient"),
      fetchCount("Observation"),
      fetchCount("MedicationRequest"),
      fetchCount("Claim"),
    ]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

      <div className="grid grid-cols-4 gap-6">
        <Card title="Patients" value={patientCount} />
        <Card title="Lab Reports" value={labCount} />
        <Card title="Prescriptions" value={medCount} />
        <Card title="Bills" value={billCount} />
      </div>
    </div>
  );
}

function Card({ title, value }: { title: string; value: number }) {
  return (
    <div className="bg-white shadow p-6 rounded-lg">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-3xl mt-3">{value}</p>
    </div>
  );
}