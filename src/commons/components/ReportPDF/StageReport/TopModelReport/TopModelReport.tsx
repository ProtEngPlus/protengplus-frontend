import { Text, View } from "@react-pdf/renderer";
import { ReportStyles as styles } from "../../ReportStyle";
import InfoBox from "../../ReportInfoBox";

export default function TopModelReport({
  tool,
  option,
  runTime,
}: {
  tool: string;
  option: Record<string, any>;
  runTime: string;
}) {
  const Ridgecv = () => (
    <View>
      <InfoBox label={"Training Batch Size"} text={option.train_batch_sizes ? option.train_batch_sizes.join(", ") : "-" } />
      <InfoBox label={"N Batch"} text={option.n_batch || "-" } />
      <InfoBox label={"Alpha"} text={option.alpha || "-" } />
    </View>
  );

  const ToolSelection = () => {
    switch (tool) {
      case "ridgecv":
        return <Ridgecv />;
      default:
        return <Text>No tool selected.</Text>;
    }
  };

  return (
    <View style={styles.stageInfoBox}>
      <View style={styles.stageTitle}>
        <View style={styles.infoBox}>
          <Text style={styles.stageLabel}>Top Model</Text>
        </View>
        <View style={styles.infoBox}>
          <Text>Run Time:</Text>
          <Text> {runTime || "-"} minute</Text>
        </View>
      </View>
      <View>
        <InfoBox label={"Tool"} text={tool || "-" } />
        <ToolSelection />
      </View>
    </View>
  );
}
