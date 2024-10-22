import PropTypes from 'prop-types';
import { useDroneStatus } from '../context/DroneStatusContext';
import { Link } from 'react-router-dom';
import { IoPencilSharp, IoTrashBinSharp } from 'react-icons/io5';

export default function DroneCard({ drone }) {
  const { deleteDroneStatus } = useDroneStatus();
  console.log(drone);

  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md ">
      <header className="flex justify-between">
        <h1 className="text-2xl text-white font-bold">{drone.droneName}</h1>
        <div className="flex gap-x-2 items-center">
          <button
            className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
            onClick={() => deleteDroneStatus(drone._id)}
          >
            <IoTrashBinSharp size={20} className="inline" />
          </button>
          <Link
            className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
            to={`/drones/${drone._id}`}
          >
            <IoPencilSharp size={20} className="inline" />
          </Link>
        </div>
      </header>
      <p className="text-slate-300 my-2">
        Model: {drone.droneModel ? drone.droneModel : "Unassigned"}
      </p>
      
    </div>
  );
}

DroneCard.propTypes = {
  drone: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    droneName: PropTypes.string.isRequired,
    droneModel: PropTypes.string.isRequired,
    mission: PropTypes.shape({
      name: PropTypes.string,
    }),
  }).isRequired,
};
