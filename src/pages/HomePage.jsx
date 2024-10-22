export default function HomePage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        <h1 className="text-3xl font-bold my-3 text-center text-white">Sistema de Control de drones</h1>
        <h2 className="text-3xl font-bold my-3 text-center text-white">Lenguajes Web</h2>

        <div>
          <p className="gap-x-2 text-justify pt-5 mt-5 text-sm">
            Este sistema de control de inforamcion de Drones
            permite a los usuarios tener un control sobre los estatus de las missiones
            de los drones, asi como tambien la informacion de los drones y sus respectivos
            estados.
          </p>
          <hr className="my-5 h-px border-t-0 bg-transparent bg-gradient-to-r form-transparent
          via-neutral-500 to-transparent opacity-25 dark:opacity-100"/>
          <p className="text-center text-xs">
            Derenchos Reservados JILV &copy; 2024
          </p>

        </div>
      </div>

    </div>
  )
}
