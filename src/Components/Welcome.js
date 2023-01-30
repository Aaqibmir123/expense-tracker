
import { useNavigate } from 'react-router';

export const Welcome = () => {
    const navigater = useNavigate();
    const profileHandler = () => {
        navigater('/profile');
    }

    
    return (
        <div>
            <h1>welcome</h1>
            <p>Your profile is incomplete</p>
            <button onClick={profileHandler}>Complete your profile</button>
            <button>Verify email</button>
        </div>
    )
}
