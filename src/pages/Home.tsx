import { useNavigate } from "react-router-dom";
import { useAuth } from "@/providers/AuthProvider";
import Drawer from "@/components/Drawer";
import PhGauge from "@/components/PhGauge";
import TemperatureGauge from "@/components/TemperaturGauge";
import TurbidityGauge from "@/components/TurbidityGauge";
import { useEffect } from "react";

export default function Home() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser === null) {
      navigate("/auth/login", { replace: true });
    }
  }, []);

  return (
    <main className="w-full antialiased h-full">
      <Drawer>
        <div className="w-full md:p-10 h-full flex flex-col p-5">
          <div className="w-full h-96 md:h-[25rem] lg:h-[26rem] gap-5 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 grid-flow-col md:grid-rows-2 grid-rows-3 lg:grid-rows-1 bg-[#202425] rounded-xl p-10 md:p-20">
            <div className="w-full h-full row-span-1 col-span-1">
              <PhGauge />
            </div>
            <div className="w-full h-full row-span-1 col-span-1">
              <TemperatureGauge />
            </div>
            <div className="w-full h-full row-span-1 col-span-1">
              <TurbidityGauge />
            </div>
          </div>
          <div className="w-full relative h-fit px-2 md:px-5 py-5 md:py-10">
            <dl>
              {/* Turbidity */}
              <dt className="lg:text-2xl md:text-xl text-lg font-sans font-semibold text-white">
                Turbidity
              </dt>
              <dd className="font-sans ml-3 md:ml-5 lg:ml-7 lg:text-lg md:text-md text-sm text-gray 200">
                <strong className="text-green-500">Safe Levels</strong>: Green
                (indicates clear or acceptable water clarity). (Below 29 NTU)
              </dd>
              <dd className="font-sans ml-3 md:ml-5 lg:ml-7 lg:text-lg md:text-md text-sm text-gray 200">
                <strong className="text-yellow-500">Moderate Concern</strong>:
                Yellow (indicates slightly murky water). (30-35 NTU)
              </dd>
              <dd className="font-sans ml-3 md:ml-5 lg:ml-7 lg:text-lg md:text-md text-sm text-gray 200">
                <strong className="text-red-500">Critical Levels</strong>: Red
                (indicates high turbidity, poor water clarity). (Above 36 NTU)
              </dd>

              {/* pH */}
              <dt className="lg:text-2xl md:text-xl text-lg font-sans font-semibold text-white">
                pH
              </dt>
              <dd className="font-sans ml-3 md:ml-5 lg:ml-7 lg:text-lg md:text-md text-sm text-gray 200">
                <strong className="text-red-500">Acidic (Low pH)</strong>: Red
                (below 6.5).
              </dd>
              <dd className="font-sans ml-3 md:ml-5 lg:ml-7 lg:text-lg md:text-md text-sm text-gray 200">
                <strong className="text-green-500">
                  Neutral (Optimal for Tilapia)
                </strong>
                : Green (6.5–8.5).
              </dd>
              <dd className="font-sans ml-3 md:ml-5 lg:ml-7 lg:text-lg md:text-md text-sm text-gray 200">
                <strong className="text-purple-500">Alkaline (High pH)</strong>:
                Purple (above 8.5).
              </dd>

              {/* Temperature */}
              <dt className="lg:text-2xl md:text-xl text-lg font-sans font-semibold text-white">
                Temperature
              </dt>
              <dd className="font-sans ml-3 md:ml-5 lg:ml-7 lg:text-lg md:text-md text-sm text-gray 200">
                <strong className="text-blue-500">Too Cold</strong>: Light blue
                (below optimal temperature for tilapia, generally below 25°C).
              </dd>
              <dd className="font-sans ml-3 md:ml-5 lg:ml-7 lg:text-lg md:text-md text-sm text-gray 200">
                <strong className="text-green-500">Optimal Range</strong>:
                (25°C–30°C for tilapia).
              </dd>
              <dd className="font-sans ml-3 md:ml-5 lg:ml-7 lg:text-lg md:text-md text-sm text-gray 200">
                <strong className="text-red-500">Too Hot</strong>: Red (above
                30°C).
              </dd>
            </dl>
          </div>
        </div>
      </Drawer>
    </main>
  );
}
