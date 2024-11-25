import { useNavigate } from "react-router-dom";
import { useAuth } from "@/providers/AuthProvider";
import Drawer from "@/components/Drawer";
import PhGauge from "@/components/PhGauge";
import TemperatureGauge from "@/components/TemperaturGauge";
import TurbidityGauge from "@/components/TurbidityGauge";

export default function Home() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  if (currentUser === null) {
    navigate("/auth/login", { replace: true });
  }

  return (
    <main className="w-full antialiased h-full">
      <Drawer>
        <div className="w-full md:p-10 h-[95dvh] flex justify-center items-center">
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
        </div>
      </Drawer>
    </main>
  );
}
