const pool = require('../utils/dbconnection'); 
//const query = require('../utils/queries');

const get = async (req, res) => { 
    const client = await pool.connect();
    try{
        const id = parseInt(req.params.id);
       // const response = await client.query(query.get, [ id ]);
        res.status(200).json(response.rows);
    }catch{
        res.status(505);
    }finally{
        client.release(true);
    }
};

module.exports = {
    get
};