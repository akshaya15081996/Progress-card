const { sendOkResponse, sendServerError } = require('../../../core/response');
const user = require('../User/user.model')
const Customers = require('../Customers/customers.model')
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken')
const cookieparser = require('cookie-parser')



//Save registration
const saveregistration = async (req, res) => {
    try {
        const { email, password, phoneno } = req.body;
        let existingEmail = await user.findOne({ email:req.body.email });
        // console.log(existingEmail,'pp')
        if (existingEmail) {
            return res.status(400).json({ message: "Email Already Exists" });

        }

        const userdata = await user.create({ email, password })
        // console.log(userdata, 'ud');
        
        const registrationparams = {
            user_id: userdata._id,
            phoneno: req.body.phoneno
        }
        let registrationdata = await Customers.create(registrationparams)
        const payload={registrationdata,success:true}
        sendOkResponse({ res, payload })


       


        // console.log(registrationdata, 'rd');

    } catch (error) {
        sendServerError({ res, error })


}
    }


// login authentication using JWT 

const savelogin = async (req, res) => {
    try {
        // console.log(req.body)
        const { email, password } = req.body;
       


        // check if all data in frontend
        if (!(email && password)) {
            return res.status(404).json({ message: "Email and Password are compulsary" })

        }
        //check if user completes registration

        // first check if email exists

        const existinguser = await user.findOne({ email })
        // console.log(existinguser,'eu');
        
        
      
        if (!(existinguser)) {
            return res.status(404).json({ message: "No such User!" })
        }
        //if email exists,then check if password matches that in db
        const checkpassword = await bcrypt.compare(password, existinguser.password)
        if (!(checkpassword)) {
            return res.status(400).json({ message: "Invalid Password" });
        }
        //populating customer details
        const customerdetails= await Customers.findOne({user_id:existinguser._id}) 
        
        // console.log(customerdetails,'cc');
        

        // generate a token from backend to clientside  for logged in user

        const JWT_SECRET = 'Abc@123'//creating a secret key 

        const token = jwt.sign(
            { id: existinguser._id, email: existinguser.email, customerdetails}, JWT_SECRET, { expiresIn: "3d" }
        )


        //send token through cookieparser
        const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true//for allowing only server to manipulate tokens
        }
        res.status(200).cookie("token", token, options).json({
            success: true, token 
        })

        // console.log(token, 'tt')
    } catch (error) {
        sendServerError({ res, error })
    }
}

//tokendecode

const tokendecode = async (req, res) => {
    // console.log(req.body);
    
    try {
        const { token } = req.body

        const JWT_SECRET = 'Abc@123'
        const decoded = jwt.decode(token)
        // console.log(decoded,'ddd')


        if (decoded) {
            const verified = jwt.verify(token, JWT_SECRET)
            // console.log(verified,'vv');
            
            if (verified) {
                return res.status(200).json({
                    success: true,verified
                })
            }

        }



    } catch (error) {
        sendServerError({ res, error })

    }
}




// Admin login
const adminlogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!(email && password)) {
            return res.status(400).json({ message: "Email and Password are required" });
        }

        const existinguser = await user.findOne({ email });

        if (!existinguser || existinguser.usertype !== 4) { // Check for usertype 4
            return res.status(404).json({ message: "No such Admin!" });
        }

        const checkpassword = await bcrypt.compare(password, existinguser.password);

        if (!checkpassword) {
            return res.status(400).json({ message: "Invalid Password" });
        }

        const JWT_SECRET = 'Abc@123'; // Use environment variable for secrets
        const token = jwt.sign({ id: existinguser._id, email: existinguser.email ,usertype:existinguser.usertype }, JWT_SECRET, { expiresIn: "3d" });

        const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true
        };
        res.status(200).cookie("token", token, options).json({ success: true, token });

    } catch (error) {
        sendServerError({ res, error });
    }
};


module.exports = { savelogin, saveregistration, tokendecode,adminlogin }
