import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMissions } from '../context/MissionsContext';
import { useDroneStatus } from '../context/DroneStatusContext'; // Assuming you have a DronesContext
import DroneCard from '../components/DroneCard'; // Assuming you have a DroneCard component

export default function MissionDetailsPage() {
  const { missionId } = useParams();
  const { getMissionById } = useMissions();
  const { getDrone } = useDroneStatus();
  const [mission, setMission] = useState(null);
  const [drones, setDrones] = useState([]);

  useEffect(() => {
    async function fetchMissionDetails() {
      console.log("fetchMissionDetails", missionId);
      const missionData = await getMissionById(missionId);
      console.log(missionData);
      setMission(missionData);

      if (missionData.droneIds && missionData.droneIds.length > 0) {
        const droneData = await Promise.all(missionData.droneIds.map(async (droneId) => {
          return await getDrone(droneId);
        }));
        setDrones(droneData);
      }
    }
    fetchMissionDetails();
  }, [missionId, getMissionById, getDrone]);

  if (!mission) {
    return <div>Not a Mission</div>;
  }

  return (
    <div className="bg-zinc-800 max-w-4xl w-full p-10 rounded-md mx-auto">
      <h1 className="text-3xl text-white font-bold mb-4">{mission.name}</h1>
      <p className="text-slate-300 mb-2"><strong>Description:</strong> {mission.description}</p>
      <p className="text-slate-300 mb-2"><strong>Status:</strong> {mission.status}</p>
      <p className="text-slate-300 mb-2"><strong>Created At:</strong> {new Date(mission.createdAt).toLocaleString()}</p>
      <p className="text-slate-300 mb-2"><strong>Updated At:</strong> {new Date(mission.updatedAt).toLocaleString()}</p>
      <p className="text-slate-300 mb-2"><strong>User ID:</strong> {mission.userId}</p>

      <h2 className="text-2xl text-white font-bold mt-6 mb-4">Assigned Drones</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {drones.map(drone => (
          <DroneCard key={drone._id} drone={drone} />
        ))}
      </div>
    </div>
  );
}
