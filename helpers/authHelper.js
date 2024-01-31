import bcrypt from 'bcrypt';

export const hashPassword = async(password)=>{
    try{
        const salt = 10;
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log(hashedPassword);
        return hashedPassword;
    }catch(err){
        console.error(err);
    }
}

export const comparePassword  = async(password,hashedPassword)=>{
    return bcrypt.compare(password,hashedPassword);
}