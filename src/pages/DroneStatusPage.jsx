import { useDroneStatus } from "../context/DroneStatusContext";
import DroneCard from "../components/DroneCard";
import { useEffect } from "react";


export default function DroneStatusPage() {
  const { getDroneStatus, status } = useDroneStatus();

  useEffect(() => {
    console.log("DroneStatusPage useEffect");
    getDroneStatus();
  }, []);

  if(status.length === 0) {
    return (
      <div>
        <h1>No hay drones</h1>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-10">
      <div className="flex justify-between mb-4">
        
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {status.map(drone => (
          <DroneCard key={drone._id} drone={drone}/>
        ))}
      </div>
    </div>
  );
}
