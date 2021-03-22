var express = require('express');
var router = express.Router();

var connection = require('../config');

//use connection
connection.connect(function(error){
    if(error){
        throw error;
    }else{
        console.log("Successful connection!")
    }
})

router.get('/', function(req,res){
    res.send('Index router');
})


//show all recipes
router.get('/api/recipes', (req, res)=>{
    connection.query('SELECT * FROM recetas', (error, rows)=>{
        if(error){
            throw error;
        }else{
            res.send(rows);
        }
    })
});

//show a recipe
router.get('/api/recipes/:id', (req, res)=>{
    connection.query('SELECT * FROM recetas where recipeID = ?',[req.params.id], (error, row)=>{
        if(error){
            throw error;
        }else{
            //res.send(row[0].ingredients);
            res.send(row);
        }
    })
});

//create a recipe
router.post('/api/recipes', (req, res)=>{
    let data = {
        title:req.body.title,
        ingredients:req.body.ingredients,
        description:req.body.description,
        difficulty:req.body.difficulty,
        person:req.body.person,
        time:req.body.time,
        typeFood:req.body.typeFood
    };
    let sql = "INSERT INTO recetas SET ?";
    connection.query(sql, data, function(error, results){
        if(error){
            throw error;
        }else{
            res.send(results);
        }
    });
})


//edit a recipe
router.put('/api/recipes/:id', (req, res)=>{
    let  recipeID = req.params.id;
    let  title = req.body.title;
    let  ingredients = req.body.ingredients;
    let  description = req.body.description;
    let  difficulty = req.body.difficulty;
    let  person = req.body.person;
    let  time = req.body.time;
    let  typeFood = req.body.typeFood;

    let sql = "UPDATE recetas SET title=?, ingredients=?, description=?,  difficulty=?, person=?, time=?, typeFood=?  WHERE recipeID= ?";
    connection.query(sql,[title,ingredients,description,difficulty,person,time,typeFood,recipeID], function(error, results){
        if(error){
            throw error;
        }else{
            res.send(results);
        }
    })
});

//delete a recipe
router.delete('/api/recipes/:id', (req, res)=>{
    connection.query('DELETE FROM recetas WHERE recipeID=?', [req.params.id], (error, rows)=>{
        if(error){
            throw error;
        }else{
            res.send(rows);
        }
    });
});

module.exports = router;