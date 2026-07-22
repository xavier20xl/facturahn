export const isAuth = async (req, res, next) => {

    // capturar la req y obtener los encabezados
    console.log(req.headers)

    // obtener el Authorization
    // validar la data
    // rechazar o continuar en funcion de los resultados

    // puede continuar
    next()
}
