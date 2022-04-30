import {Schema, model} from 'mongoose';
import IProfileType from '../../types/profile.type';

const userSchema = new Schema<IProfileType>({
    user_name: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    email_address: {
        type: String,
        unique: true,
        require: true
    },
    first_name: {
        type: String,
        require: true
    },
    last_name: {
        type: String,
        require: true
    },
    status: {
        type: String,
        require: true,
        default: 'active'
    }
},
{
    timestamps:true,
    collection: 'userProfile'
});

export default model<IProfileType>('userProfile', userSchema);