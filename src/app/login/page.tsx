"use client"
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { useAuth } from "@/src/hooks/useAuth";
const uagrm_logo = "/login/uagrm_logo.png";
const logo_facebook = "/login/logo_facebook.png";
const logo_whatApps = "/login/logo_whatApps.png";
const imgenFondo = "/login/fondo-imagen-uagrm.png";



type LoginForm = {
  correo: string;
  password: string;
};

export default function LoginPage() {

    const router = useRouter();
    const { login, loading } = useAuth();


    const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    } = useForm<LoginForm>();
    
      const getClientIP = async (): Promise<string> => {
    try {
      const response = await axios.get("https://api.ipify.org?format=json");
      return response.data.ip || "0.0.0.0";
    } catch {
      return "0.0.0.0";
    }
  };

  const onSubmit = async (data: LoginForm) => {
   try {
      const ip = await getClientIP();

      const result = await login({
        username: data.correo,
        password: data.password,
        ip,
      });

      if (result?.success) {
        router.push("/dashboard");
      } else {
        setError("root", { message: "Credenciales incorrectas o error de red." });
      }
    } catch {
      setError("root", { message: "Credenciales incorrectas o error de red." });
    }
  };
 return (
    <div
      className="min-h-screen w-screen h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.4)), url(${imgenFondo})`,
      }}
    >
      <header className="flex justify-between p-5">
        <Image src={uagrm_logo} alt="Logo UAGRM" width={80} height={100} />
        <section className="flex gap-5">
          <Image
            src={logo_facebook}
            className="rounded-xl cursor-pointer hover:opacity-80"
            alt="Facebook UAGRM"
            width={50}
            height={50}
          />
          <Image
            src={logo_whatApps}
            className="rounded-xl cursor-pointer hover:opacity-80"
            alt="WhatsApp UAGRM"
            width={50}
            height={50}
          />
        </section>
      </header>

      <section className="flex items-center justify-center">
        <section className="flex flex-col-reverse md:flex-row md:w-[85%] lg:w-[60%] md:mt-72 lg:mt-20 md:gap-5">
          <div className="px-5 md:px-12 py-8 mx-auto w-[95%] md:w-[60%] bg-white/20 rounded-md shadow-lg mt-8 md:mt-0">
            <h2 className="font-mplus-bold text-3xl md:text-5xl text-white text-center">
              Inicia Sesión
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-3 mx-auto">
              <div className="mb-2">
                <input
                  type="email"
                  placeholder="Ingrese su correo"
                  disabled={loading}
                  {...register("correo", {
                    required: "El correo es obligatorio",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Ingrese un correo válido",
                    },
                  })}
                  className="font-mplus-bold text-gray-500 rounded-xl w-full p-2 mt-10 bg-white outline-none disabled:opacity-50"
                />
                {errors.correo && (
                  <p className="text-red-500 text-sm">{errors.correo.message}</p>
                )}
              </div>

              <div className="mb-2">
                <input
                  type="password"
                  placeholder="Contraseña"
                  disabled={loading}
                  {...register("password", {
                    required: "La contraseña es obligatoria",
                    minLength: { value: 6, message: "La contraseña debe tener al menos 6 caracteres" },
                  })}
                  className="font-mplus-bold text-gray-500 rounded-xl w-full p-2 mt-8 bg-white outline-none disabled:opacity-50"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password.message}</p>
                )}
              </div>

              {errors.root && (
                <p className="text-red-500 text-sm mb-4">{errors.root.message}</p>
              )}

              <div className="flex justify-between mt-10 gap-8">
                <button
                  type="submit"
                  disabled={loading}
                  className="font-mplus-bold bg-blue-700 text-white py-2 px-4 rounded hover:bg-blue-800 w-full cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {loading ? "Cargando..." : "Ingresar"}
                </button>

                <button
                  type="button"
                  disabled={loading}
                  className="font-mplus-bold bg-green-700 text-white py-2 px-4 rounded hover:bg-green-800 w-full cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  onClick={() => router.push("/auth/register")}
                >
                  Registrarse
                </button>
              </div>

              <div className="font-mplus-bold w-full text-center mt-5 text-white hover:text-red-600 cursor-pointer transition-colors">
                <h4>¿Te olvidaste tu contraseña?</h4>
              </div>
            </form>
          </div>
        </section>
      </section>
    </div>
  );
}