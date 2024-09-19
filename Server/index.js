const express = require('express')
const db = require('./lib/db')
const app = express()
const port = 4000
const cors = require('cors');
const path=require('path')
// const cookieParser=require('cookie-parser')
const bcrypt = require('bcrypt');




app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// app.use(cookieParser())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


require('dotenv').config()
db(process.env.DATABASE_URL)

const Loginrouter=require('./src/components/Login/login.router')
const Userrouter=require('./src/components/User/user.router')
const Customerrouter=require('./src/components/Customers/customers.router')
const Categoryrouter=require('./src/components/Category/category.router')
const SubCategoryrouter=require('./src/components/SubCategory/subcategory.router')
const Questionsrouter=require('./src/components/Questions/questions.router')
const utilRouter=require('./src/components/util/util.router')
const SmsRouter=require('./src/components/SmsSetting/SmsSetting.router')
const SchoolRouter=require('./src/components/School/school.router')
const StudentRouter=require('./src/components/Student/Student.router')
const PermissionRouter=require('./src/components/Permission/permission.router')
const RoleRouter=require('./src/components/Roles/roles.router')
const RolesandpermissionRouter=require('./src/components/Rolesandpermission/rolesandpermission.router')










app.use('/login',Loginrouter)
app.use('/user',Userrouter)
app.use('/customer',Customerrouter)
app.use('/category',Categoryrouter)
app.use('/subcategory',SubCategoryrouter)
app.use('/questions',Questionsrouter)
app.use('/util',utilRouter)
app.use('/smssetting',SmsRouter)

app.use('/school',SchoolRouter)


app.use('/student',StudentRouter)
app.use('/permission',PermissionRouter)
app.use('/roles',RoleRouter)
app.use('/rolesandpermission',RolesandpermissionRouter)






app.use('/uploads', express.static('uploads'))


app.use((error,req,res,next)=>{
    res.status(error.status||500);
    console.error('Error',error)
    res.json({
        error:{
            message:error.message,
            status:error.status
        }
    })
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
