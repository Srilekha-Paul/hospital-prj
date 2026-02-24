import connectDB from "@/lib/mongodb";
import FhirResource from "@/models/FhirResource";

export default async function Patients() {
  await connectDB();

  const patients = await FhirResource.find({
    resourceType: "Patient",
  });

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Patients</h2>

      <table className="w-full bg-white shadow rounded">
        <thead className="bg-gray-200">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Gender</th>
            <th>DOB</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((p: any) => (
            <tr key={p.resourceId} className="border-b text-center">
              <td>{p.resourceId}</td>
              <td>
                {p.data?.name?.[0]?.given?.[0]}{" "}
                {p.data?.name?.[0]?.family}
              </td>
              <td>{p.data?.gender}</td>
              <td>{p.data?.birthDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}