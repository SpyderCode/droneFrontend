import { useForm } from "react-hook-form";
import { useMissions } from "../context/MissionsContext";
import { useDroneStatus } from "../context/DroneStatusContext"; // Assuming you have a DronesContext
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function MissionFormPage() {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const { createMission, getMissionById, updateMission } = useMissions();
  const { status, getDroneStatus } = useDroneStatus(); // Fetch drones from context
  const navigate = useNavigate();
  const params = useParams();
  const [drones, setDrones] = useState([]);

  useEffect(() => {
    async function fetchDrones() {
      await getDroneStatus();
      const fetchedDrones = status;
      console.log("fetchedDrones", fetchedDrones);
      setDrones(fetchedDrones);
    }
    fetchDrones();
  }, []);

  useEffect(() => {
    if (params.id) {
      async function loadMission() {
        const mission = await getMissionById(params.id);
        setValue("name", mission.name);
        setValue("description", mission.description);
        setValue("status", mission.status || 'pending');
      }
      loadMission();
    }
  }, [params.id, getMissionById, setValue]);

  const onSubmit = handleSubmit((data) => {
    if (params.id) {
      updateMission(params.id, data);
    } else {
      createMission(data);
    }
    navigate("/missions");
  });

  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="text-2xl text-white">Mission Name</label>
        <input
          type="text"
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          placeholder="Mission Name"
          {...register("name", { required: true })}
          autoFocus
        />
        {errors.name && <p className="text-red-500">Name is required</p>}

        <label className="text-2xl text-white">Mission Description</label>
        <input
          type="text"
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          placeholder="Mission Description"
          {...register("description", { required: true })}
        />
        {errors.description && <p className="text-red-500">Description is required</p>}

        <label className="text-2xl text-white">Status</label>
        <select
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          {...register("status", { required: true })}
          defaultValue="pending"
        >
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="aborted">Aborted</option>
        </select>
        {errors.status && <p className="text-red-500">Status is required</p>}

        <label className="text-2xl text-white">Drone</label>
        <select
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          {...register("droneIds", { required: false })}
          multiple
        >
          {drones.map(drone => (
            <option key={drone._id} value={drone._id}>{drone.droneName}</option>
          ))}
        </select>
        {errors.drone && <p className="text-red-500">Drone is required</p>}

        <button
          className="bg-transparent hover:bg-zinc-500 text-white-700 font-semibold hover:text-white py-2 px-4 border border-zinc-500 hover:border-transparent rounded"
          type="submit"
        >
          Save Mission
        </button>
      </form>
    </div>
  );
}
