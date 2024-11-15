import { Button } from "./ui/button";

export default function Header() {
    return (
        <div className="fixed w-full mx-auto bg-gray-400">
            <div className="container mx-auto py-2">
                <Button>Login</Button>
            </div>
        </div>
    );
}
