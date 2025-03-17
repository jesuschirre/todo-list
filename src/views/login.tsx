import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [usuarioInput, setUsuarioInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const navigate = useNavigate();

  const url = "https://jsonplaceholder.typicode.com/users";

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setUsuarios(data);
        console.log(data);
      });
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userFound = usuarios.find(
      (u) => u.username === usuarioInput
    );
    const passwordFound = usuarios.find(
      (u) => u.website === passwordInput
    )

    if (userFound && passwordFound) {
      alert("Bienvenido " + userFound.name);
      navigate("/main");
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <form
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg mt-10 p-12 flex flex-col"
        >
          <h1 className="text-6xl text-center uppercase text-blue-600 font-bold">Login</h1>

          <label htmlFor="" className="mt-5">Usuario</label>
          <input
            type="text"
            className="bg-amber-100"
            value={usuarioInput}
            onChange={(e) => setUsuarioInput(e.target.value)}
          />

          <label htmlFor="" className="mt-5">Password</label>
          <input
            type="password"
            className="bg-amber-100"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
          />

          <button
            type="submit"
            className="mt-5 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </>
  );
}
