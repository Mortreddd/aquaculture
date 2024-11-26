import { database } from "@/providers/FirebaseProvider";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
export default function TemperatureGauge() {
  const blue = "#3b82f6";
  const red = "#dc2626";
  const green = "#16a34a";
  const maxValue = 70;
  const minValue = 0;
  const [data, setData] = useState<number>(0);
  const [color, setColor] = useState<string>(blue);
  useEffect(() => {
    const dbRef = ref(database, "Sensors/Temperature");
    return onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      if (snapshot.exists()) {
        setData(snapshot.val());
        if (data < 25) {
          setColor(blue);
        } else if (data > 30) {
          setColor(red);
        } else {
          setColor(green);
        }
      }
    });
  }, []);

  return (
    <Gauge
      value={data}
      startAngle={-110}
      endAngle={110}
      valueMax={maxValue}
      valueMin={minValue}
      sx={() => ({
        width: "100%",
        height: "100%",
        [`& .${gaugeClasses.valueText}`]: {
          fontSize: "clamp(16px, 3vw, 25px)", // Responsive font size
          transform: "translate(0px, 0px)",
        },
        [`& .${gaugeClasses.valueText} text`]: {
          fill: `${color}`,
        },
        [`& .${gaugeClasses.valueArc}`]: {
          fill: `${color}`,
        },
      })}
      text={() => `${data} °C`}
    />
  );
}
