import { servidor, inicializarBaseDeDatos, query, conexion } from "./config.js";
import bcrypt from "bcryptjs";

// Inicializar base de datos
inicializarBaseDeDatos();
const validar=(req,res,next)=>{
  const {usuario,contra,correo} =req.body
  if(correo !="" && usuario!="" && contra!="" ){
  }
}

servidor.get('/login', (req, res) => {res.render('./login.hbs'); // buscar el login.hbs dentro de /views
})

const menu = [
  { nombre: "inicio", ruta: "/", icono: "" },
  { nombre: "ofertas", ruta: "/ofertas", icono: "" },
  { nombre: "carrito", ruta: "/carrito", icono: "" },
  { nombre: "login" , ruta: "/login" , icono: ""},
];

const carrito = [
  {
    nombre: "iPhone8",
    precio: 70,
    foto: "iphone8.jpeg"
  },
  {
    nombre: "iPhone5",
    precio: 500,
    foto: "iphone5.jpeg"
  },
  {
    nombre: "iphone12",
    precio: 500,
    foto: "iphone12.jpeg"
  }
];

servidor.get("/", (req, res) => {
  res.render("index.hbs", { menu, carrito });
});
// get(Obtener) , post(Enviar) , put(Actualizar) , delete(Borrar)
servidor.put("/carrito", validar ,(req, res) => {
  res.render("carrito.hbs", { menu, carrito });
});

servidor.put("/contacto", (req, res) => {
  res.render("contacto.hbs", { menu });
});

servidor.delete("/ofertas", (req, res) => {
  res.render("ofertas.hbs", { menu });
});

servidor.post("/registro", async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    let { nombre, apellido, contra, correo } = req.body;
    contra = bcrypt.hashSync(contra, salt);
    
    // Corregida la consulta SQL - los valores deben estar entre comillas
    await query(`INSERT INTO usuarios (nombre, apellido, contra, correo) 
                 VALUES ('${nombre}', '${apellido}', '${contra}', '${correo}')`);
    
    res.send("Usuario guardado correctamente");
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(500).send("Error al registrar usuario");
  }
});

// Iniciar servidor
servidor.listen(80, () => {
  console.log("Servidor ejecutándose en el puerto 80");
});

// Cerrar conexión al terminar
process.on('SIGINT', () => {
  conexion.end();
  process.exit();
});