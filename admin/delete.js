const conexion = require('../database/db');  //importacion-pedir

const crud_delete = (id, res) => {
    conexion.query('DELETE FROM registro WHERE id = ?',[id], (error, results)=>{
        if(error){
            console.log(error);
        }else{           
            res.redirect('/admin');         
        }
    }) 
}

module.exports = crud_delete