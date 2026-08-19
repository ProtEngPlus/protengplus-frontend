import { Text, View } from "@react-pdf/renderer";
import { ReportStyles as styles } from "../../ReportStyle";
import InfoBox, { renderOptionText } from "../../ReportInfoBox";
import { OptionValue } from "../../../../interfaces/Job.interface";

export default function TopModelReport({
  tool,
  option,
  runTime,
}: {
  tool: string;
  option: Record<string, OptionValue>;
  runTime: string;
}) {
  const Ridgecv = () => (
    <View>
      <InfoBox label={"Training Batch Size"} text={renderOptionText(option.train_batch_sizes)} />
      <InfoBox label={"N Batch"} text={renderOptionText(option.n_batch)} />
      <InfoBox label={"Alpha"} text={renderOptionText(option.alpha)} />
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
