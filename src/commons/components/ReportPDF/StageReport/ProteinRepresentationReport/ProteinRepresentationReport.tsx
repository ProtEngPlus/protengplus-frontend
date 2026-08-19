import { Text, View } from "@react-pdf/renderer";
import { ReportStyles as styles } from "../../ReportStyle";
import InfoBox, { renderOptionText } from "../../ReportInfoBox";
import { OptionValue } from "../../../../interfaces/Job.interface";

export default function ProteinRepresentationReport({
  tool,
  option,
  runTime,
}: {
  tool: string;
  option: Record<string, OptionValue>;
  runTime: string;
}) {
  const Unirep = () => (
    <View>
      <View style={styles.inlineInfoBox}>
        <InfoBox label={"N Trial"} text={renderOptionText(option.n_trials)} limit={185} />
        <InfoBox label={"N Split"} text={renderOptionText(option.n_splits)} limit={185} />
      </View>
      <View style={styles.inlineInfoBox}>
        <InfoBox label={"N Epoch - low"} text={renderOptionText(option.n_epochs_config_low)} limit={185} />
        <InfoBox label={"N Epoch - high"} text={renderOptionText(option.n_epochs_config_high)} limit={185} />
      </View>
      <View style={styles.inlineInfoBox}>
        <InfoBox label={"Learning Rate - low"} text={renderOptionText(option.learning_rate_config_low)} limit={185} />
        <InfoBox label={"Learning Rate - high"} text={renderOptionText(option.learning_rate_config_high)} limit={185} />
      </View>
    </View>
  );

  const ESM = () => (
    <View>
      <View style={styles.inlineInfoBox}>
        <InfoBox label={"Weight Decay"} text={renderOptionText(option.weight_decay)} limit={185} />
      </View>
      <View style={styles.inlineInfoBox}>
        <InfoBox label={"N Epoch Config"} text={renderOptionText(option.n_epochs_config)} limit={185} />
      </View>
    </View>
  );

  const ToolSelection = () => {
    switch (tool) {
      case "unirep":
        return <Unirep />;
      case "ESM":
        return <ESM />;
      default:
        return <Text>No tool selected.</Text>;
    }
  };

  return (
    <View style={styles.stageInfoBox}>
      <View style={styles.stageTitle}>
        <View style={styles.infoBox}>
          <Text style={styles.stageLabel}>Protein Representation</Text>
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
