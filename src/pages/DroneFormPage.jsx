import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDroneStatus } from "../context/DroneStatusContext";

export default function DroneFormPage() {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const { createDroneStatus, getDrone, updateDroneStatus } = useDroneStatus();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      async function loadDrone() {
        const drone = await getDrone(params.id);
        setValue("droneName", drone.droneName);
        setValue("droneModel", drone.droneModel);
      }
      loadDrone();
    }
  }, [params.id, getDrone, setValue]);

  const onSubmit = handleSubmit((data) => {
    if (params.id) {
      updateDroneStatus(params.id, data);
    } else {
      createDroneStatus(data);
    }
    navigate("/drones");
  });

  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="text-2xl text-white">Drone Name</label>
        <input
          type="text"
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          placeholder="Drone Name"
          {...register("droneName", { required: true })}
          autoFocus
        />
        {errors.droneName && <p className="text-red-500">Name is required</p>}

        <label className="text-2xl text-white">Drone Model</label>
        <input
          type="text"
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          placeholder="Drone Model"
          {...register("droneModel", { required: true })}
        />
        {errors.droneModel && <p className="text-red-500">Model is required</p>}

        <button
          className="bg-transparent hover:bg-zinc-500 text-white-700 font-semibold hover:text-white py-2 px-4 border border-zinc-500 hover:border-transparent rounded"
          type="submit"
        >
          Save Drone
        </button>
      </form>
    </div>
  );
}
