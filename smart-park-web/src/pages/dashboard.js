import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { ParkingCircle } from "lucide-react";

export function AuthScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md space-y-8">
          {/* Logo + Header */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="bg-blue-600 rounded-2xl p-6">
                <ParkingCircle className="w-16 h-16 text-white" />
              </div>
            </div>

            <h1 className="text-4xl text-gray-900">Smart Park</h1>
            <p className="text-gray-600">Welcome! Let's get you started.</p>
          </div>

          {/* Buttons */}
          <div className="space-y-4">
            <Button
              onClick={() => navigate("/signup")}
              className="w-full h-14 text-lg bg-blue-600 hover:bg-blue-700"
            >
              Sign Up
            </Button>

            <Button
              onClick={() => navigate("/login")}
              variant="outline"
              className="w-full h-14 text-lg border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              Log In
            </Button>
          </div>

          {/* Footer Text */}
          <div className="text-center text-sm text-gray-500">
            <p>By continuing, you agree to our Terms of Service</p>
            <p>and Privacy Policy</p>
          </div>
        </div>
      </div>
    </div>
  );
}

