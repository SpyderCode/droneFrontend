import PropTypes from 'prop-types';
import { useMissions } from '../context/MissionsContext';
import { useDroneStatus } from '../context/DroneStatusContext'; // Assuming you have a DronesContext
import { Link } from 'react-router-dom';
import { IoPencilSharp, IoTrashBinSharp } from 'react-icons/io5';
import { useEffect, useState } from 'react';

export default function MissionCard({ mission }) {
  const { deleteMission } = useMissions();
  const { getDrone } = useDroneStatus(); // Assuming you have a function to get drone by ID
  const [droneNames, setDroneNames] = useState([]);

  useEffect(() => {
    async function fetchDroneNames() {
      console.log("fetchDroneNames", mission);
      if (mission.droneIds && mission.droneIds.length > 0) {
        console.log("fetchDroneNames inside if");
        const names = await Promise.all(mission.droneIds.map(async (droneId) => {
          console.log("fetchDroneNames inside map", droneId);
          const drone = await getDrone(droneId);
          console.log("fetchDroneNames inside map", drone.droneName);
          return drone.droneName;
        }));
        setDroneNames(names);
      }
    }
    fetchDroneNames();
  }, [mission, getDrone]);

  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md ">
      <header className="flex justify-between">
        <Link to={`/missionDetails/${mission._id}`} className="text-2xl text-white font-bold">
          {mission.name}
        </Link>
        <div className="flex gap-x-2 items-center">
          <button
            className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
            onClick={() => deleteMission(mission._id)}
          >
            <IoTrashBinSharp size={20} className="inline" />
          </button>
          <Link
            className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
            to={`/missions/${mission._id}`}
          >
            <IoPencilSharp size={20} className="inline" />
          </Link>
        </div>
      </header>

      <p className="text-slate-300 my-2">
        Drones: {droneNames.length > 0 ? droneNames.join(", ") : "non available"}
      </p>
    </div>
  );
}

MissionCard.propTypes = {
  mission: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    droneIds: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};
