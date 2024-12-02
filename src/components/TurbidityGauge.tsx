import { database } from "@/providers/FirebaseProvider";
import { hasNotificationPermission } from "@/utils/Permissions";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import logo from "@/assets/logo.png";

export default function TurbidityGauge() {
  const red = "#dc2626";
  const yellow = "#eab308";
  const green = "#16a34a";
  const maxValue = 50;
  const minValue = 0;
  const [data, setData] = useState<number>(0);
  const [color, setColor] = useState<string>(green);

  const ntuValue = Math.floor(data * 100) / 100;

  useEffect(() => {
    const dbRef = ref(database, "Sensors/Turbidity");
    return onValue(dbRef, (snapshot) => {
      const data = snapshot.val();

      if (snapshot.exists()) {
        setData(snapshot.val());
        if (data <= 29) {
          setColor(green);
        } else if (data >= 30 && data <= 35) {
          setColor(yellow);
          sendNotification(
            "Turbidity Warning",
            `The turbidity level is elevated: ${data.toFixed(2)} NTU.`
          );
        } else {
          setColor(red);
          sendNotification(
            "Turbidity Critical",
            `The turbidity level is critical: ${data.toFixed(2)} NTU.`
          );
        }
      }
    });
  }, []);

  function sendNotification(title: string, message: string) {
    if (hasNotificationPermission()) {
      new Notification(title, {
        body: message,
        icon: logo,
      });
    }
  }

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
      text={() => `${ntuValue.toFixed(2)} Ntu`}
    />
  );
}
