import { useNavigate } from 'react-router-dom';
import { Button } from "./ui/button";
import { paddingX } from '@/constants/layout';

export default function Header() {
    const navigate = useNavigate();

    return (
        <div id='header' className={`fixed w-full bg-gray-400 flex justify-between ${paddingX} py-2`}>
            <Button variant="outline" onClick={() => navigate('/')}>Logo</Button>
            <div className="flex gap-2">
                <Button onClick={() => navigate('/login')}>Login</Button>
                <Button onClick={() => navigate('/signup')}>Signup</Button>
            </div>
        </div>
    );
}
