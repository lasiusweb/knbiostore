import AuthForm from "@/components/auth/AuthForm";

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
                <h1 className="text-2xl font-bold text-center mb-6">Login to KN Biosciences</h1>
                <AuthForm />
            </div>
        </div>
    );
}