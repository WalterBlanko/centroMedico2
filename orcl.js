const express = require('express')
const oracledb = require('oracledb');
const app = express();
const port = 3000;
var password = 'hr';
var password2 = 'duoc';

async function selectEmployeesById(req, res, id) {
  try {
    connection = await oracledb.getConnection({
      user: "hr",
      password: password,
      connectString: "localhost:1521/pdb"
    });
    // run query to get employee with employee_id
    result = await connection.execute(`SELECT * FROM employees where employee_id=:id`, [id]);
  } catch (err) {
    //send error message
    return res.send(err.message);
  } finally {
    if (connection) {
      try {
        // Always close connections
        await connection.close();
      } catch (err) {
        return console.error(err.message);
      }
    }
    if (result.rows.length == 0) {
      //query return zero employees
      return res.send('query send no rows');
    } else {
      //send all employees
      return res.send(result.rows);
    }
  }
}

//get /employee?id=<id employee>
app.get('/employee', function (req, res) {
  //get query param ?id
  let id = req.query.id;
  // id param if it is number
  if (isNaN(id)) {
    res.send('Query param id is not number')
    return
  }
  selectEmployeesById(req, res, id);
});

async function selectAllEmployees(req, res) {
  try {
    connection = await oracledb.getConnection({
      user: "alumno",
      password: "duoc",
      connectString: "localhost:1521/pdb"
    });
    console.log('connected to database');
    // run query to get all employees
    result = await connection.execute(`SELECT * FROM medico`);
  } catch (err) {
    //send error message
    return res.send(err.message);
  } finally {
    if (connection) {
      try {
        // Always close connections
        await connection.close();
        console.log('close connection success');
      } catch (err) {
        console.error(err.message);
      }
    }
    if (result.rows.length == 0) {
      //query return zero employees
      return res.send('query send no rows');
    } else {
      //send all employees
      return res.send(result.rows);
    }
  }
}

//get /employess
app.get('/employees', function (req, res) {
  selectAllEmployees(req, res);
});

async function selectComunas(req, res) {
  try {
    connection = await oracledb.getConnection({
      user: "alumno",
      password: "duoc",
      connectString: "localhost:1521/pdb"
    });
    console.log('connected to database');
    // run query to get all employees
    result = await connection.execute(`SELECT * FROM comuna`);
  } catch (err) {
    //send error message
    return res.send(err.message);
  } finally {
    if (connection) {
      try {
        // Always close connections
        await connection.close();
        console.log('close connection success');
      } catch (err) {
        console.error(err.message);
      }
    }
    if (result.rows.length == 0) {
      //query return zero employees
      return res.send('query send no rows');
    } else {
      //send all employees
      return res.send(result.rows);
    }
  }
}

//get /employess
app.get('/comuna', function (req, res) {
  selectComunas(req, res);
})

// http://localhost:3000/doctor?id_min=1&&id_max=5&&id_esp=203
async function selectDoctorById(req, res, id_min, id_max, id_esp) {
  try {
    connection = await oracledb.getConnection({
      user: "alumno",
      password: "duoc",
      connectString: "localhost:1521/pdb"
    });
    // run query to get employee with employee_id
    result = await connection.execute(`SELECT * FROM medico WHERE id_medico BETWEEN :id_min AND :id_max OR id_especialidad = :id_esp`, [id_min, id_max, id_esp]);
  } catch (err) {
    //send error message
    return res.send(err.message);
  } finally {
    if (connection) {
      try {
        // Always close connections
        await connection.close();
      } catch (err) {
        return console.error(err.message);
      }
    }
    if (result.rows.length == 0) {
      //query return zero employees
      return res.send('query send no rows');
    } else {
      //send all employees
      return res.send(result.rows);
    }
  }
}

//get /employee?id=<id employee>
app.get('/doctor', function (req, res) {
  //get query param ?id
  let id_min = req.query.id_min;
  let id_max = req.query.id_max;
  let id_esp = req.query.id_esp;
  // id param if it is number
  // if (isNaN(id)) {
  //   res.send('Query param id is not number')
  //   return
  // }

  selectDoctorById(req, res, id_min, id_max, id_esp);
});

async function addComuna(req, res, id, nombre) {
  try {
    connection = await oracledb.getConnection({
      user: "alumno",
      password: "duoc",
      connectString: "localhost:1521/pdb"
    });
    // run query to get employee with employee_id
    result = await connection.execute(`INSERT INTO comuna VALUES (:id, :nombre)`, [id, nombre]);
  } catch (err) {
    //send error message
    return res.send(err.message);
  } finally {
    if (connection) {
      try {
        // Always close connections
        await connection.close();
      } catch (err) {
        return console.error(err.message);
      }
    }
    // if (result.rows.length == 0) {
    //   //query return zero employees
    //   return res.send('query send no rows');
    // } else {
    //   //send all employees
    //   return res.send(result.rows);
    // }
  }
}

app.post('/addcomuna', function(req, res) {
  let id = req.body.id;
  let nombre = req.body.nombre;

  addComuna(id, nombre);
});

app.listen(port, () => console.log("nodeOracleRestApi app listening on port %s!", port));