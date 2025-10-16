import Header from "./assets/components/Header.jsx";
import Contactos from "./assets/components/Contactos.jsx";
import Formulario from "./assets/components/Formulario.jsx";

const App = () => {
  return (
    <>
      <Header />
      <main className="container mt-4">
        <hr className="my-4" />
        <Contactos />
      </main>
    </>
  );
};

export default App;
