import { Text, View } from "@react-pdf/renderer";
import { ReportStyles as styles } from "../../ReportStyle";
import InfoBox from "../../ReportInfoBox";

export default function ProteinQueryReport({
  tool,
  option,
  inputProtein,
  runTime,
}: {
  tool: string;
  option: Record<string, any>;
  inputProtein: string;
  runTime: string;
}) {
  const Blast = () => (
    <View>
      <View style={styles.inlineInfoBox}>
        <InfoBox label={"Program"} text={option.program} isSmall limit={145} />
        <InfoBox
          label={"Database"}
          text={option.database}
          isSmall
          limit={145}
        />
      </View>
      <View style={styles.inlineInfoBox}>
        <InfoBox
          label={"Hit Size"}
          text={option.hitlist_size}
          isSmall
          limit={145}
        />
        <InfoBox label={"E Value"} text={option.expect} isSmall limit={145} />
        <InfoBox
          label={"Sequence Length"}
          text={option.seq_length}
          isSmall
          limit={145}
        />
      </View>
      <View style={styles.inlineInfoBox}>
        <InfoBox
          label={"Percent Identity"}
          text={option.perc_ident}
          isSmall
          limit={145}
        />
        <InfoBox
          label={"Random State"}
          text={option.random_state}
          isSmall
          limit={145}
        />
        <InfoBox
          label={"HSP Coverage"}
          text={option.hsp_cov}
          isSmall
          limit={145}
        />
      </View>
    </View>
  );

  const ToolSelection = () => {
    switch (tool) {
      case "blast":
        return <Blast />;
      default:
        return <Text>No tool selected.</Text>;
    }
  };

  return (
    <View style={styles.stageInfoBox}>
      <View style={styles.stageTitle}>
        <View style={styles.infoBox}>
          <Text style={styles.stageLabel}>Protein Query</Text>
        </View>
        <View style={styles.infoBox}>
          <Text>Run Time:</Text>
          <Text> {runTime || "-"} minute</Text>
        </View>
      </View>
      <View>
        <InfoBox label={"Tool"} text={tool} isSmall />
        <ToolSelection />
        <InfoBox label={"Input Protein"} text={inputProtein} isSmall />
      </View>
    </View>
  );
}
