const Yup = require('yup');
const User = require('../models/User');
const { destroy } = require('../models/User');

module.exports = {
    async store(req, res){
        //YUP
    const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().required().min(6),
            confirmPassword: Yup.string().when('password', (password, field) =>
                password ? field.required().oneOf([Yup.ref('password')]) : field
            ),
    });

     if (!(await schema.isValid(req.body))) {
         return res.status(400).json({
             error: 'Houve um erro na validação dos dados'
         });
     }

        const verificaUser = await User.findOne({
            where: { email: req.body.email },
        });

        if(verificaUser){
            return res.json({ error: "Erro: um usuário já foi cadastrado com esse email" } )
        }

        const { name, email, password } = req.body;

        const user = await User.create({ name, email, password });
        
        return res.json(user);
    },

    async index(req, res){
        const user = await User.findAll({
            attributes:['id', 'name', 'email'],
        });

        return res.json(user);
    },
    
    async show(req, res){
        const user = await User.findByPk(req.params.id);
        return res.json(user);
    },

    async update(req, res){

        //yup
          const schema = Yup.object().shape({
              name: Yup.string(),
              email: Yup.string().email(),
              password: Yup.string().min(6),
              confirmPassword: Yup.string().when('password', (password, field) =>
                  password ? field.required().oneOf([Yup.ref('password')]) : field
              ),
          });

         if (!(await schema.isValid(req.body))) {
         return res.status(400).json({
             error: 'Houve um erro na validação dos dados'
         });
     }    

        verificaUser = await User.findOne({
            where: { email: req.body.email },
        });
        if(verificaUser){
            return res.json({ error: "Erro: um usuário já foi cadastrado com esse email" })
        }

        const {name, email, password} = await User.update(req.body, {
            where: {id: req.params.id}
        });
        const user = req.body;

        return res.json(user);
    },

    async destroy(req, res){
         const veririficaId = await User.findOne({
             where: { id: req.params.id }
         })
        
         if(veririficaId){
                
        const user = await User.destroy({ 
            where: {id: req.params.id}
         });

            return res.json({ Msg: "Deletado com sucesso!" });
         }else{
             return res.json({ error: "Não há nenhum  registro com o id especificado!" })
         }

        
    }
};