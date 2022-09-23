const express=require('express');
const dotenv=require('dotenv');
// const cors=require('cors')
const routes=require('./routes/indexroutes')
const bodyparser=require('body-parser');
const swaggeruiexpress=require('swagger-ui-express');
const swaggerjsdoc=require('swagger-jsdoc');

const swaggerDocs=require('./docs/swagger.docs')
dotenv.config();

const app=express();
// app.use(cors())

const port=process.env.PORT;

app.use(bodyparser.json());
app.use('/api-docs/',swaggeruiexpress.serve,swaggeruiexpress.setup(swaggerjsdoc(swaggerDocs)));

app.use('/api',routes);

app.listen(port,(req,res)=>
{
    console.log(`Listening to port ${port}`);
})

