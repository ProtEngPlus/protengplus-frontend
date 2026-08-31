import { Text, View } from "@react-pdf/renderer";
import { ReportStyles as styles } from "../../ReportStyle";
import InfoBox from "../../ReportInfoBox";

export default function GeneralInfo({
  jobName,
  jobDescription,
  totalTime,
}: {
  jobName: string;
  jobDescription: string;
  totalTime: string;
}) {
  return (
    <View style={[styles.stageTitle, styles.stageInfoBox]}>
      <View>
        <InfoBox label={"Job Name"} text={jobName || "-"} />
        <InfoBox label={"Job Description"} text={jobDescription || "-"} />
      </View>
      <View style={styles.infoBox}>
        <Text>Total Time:</Text>
        <Text> {totalTime || "-"} minute</Text>
      </View>
    </View>
  );
}
