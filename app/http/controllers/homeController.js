const Menu = require('../../models/menu')

function homeController(){
    return{
        async index(req,res){
            
            const foods = await Menu.find()
            
            return res.render('home',{foods : foods})  //pizzas mok ng name yg trov yok tov use in ejs 'home'


            // Menu.find().then(function(circle_plates){
            //     console.log(circle_plates);
            //     return res.render('home',{circle_plates:circle_plates})
            // })
            
        }
    }
}

module.exports=homeController