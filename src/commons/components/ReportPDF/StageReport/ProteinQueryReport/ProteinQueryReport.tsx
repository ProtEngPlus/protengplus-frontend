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
        <InfoBox label={"Program"} text={option.program || "-"} isSmall limit={145} />
        <InfoBox
          label={"Database"}
          text={option.database || "-"}
          isSmall
          limit={145}
        />
      </View>
      <View style={styles.inlineInfoBox}>
        <InfoBox
          label={"Hit Size"}
          text={option.hitlist_size || "-"}
          isSmall
          limit={145}
        />
        <InfoBox label={"E Value"} text={option.expect || "-"} isSmall limit={145} />
        <InfoBox
          label={"Sequence Length"}
          text={option.seq_length || "-"}
          isSmall
          limit={145}
        />
      </View>
      <View style={styles.inlineInfoBox}>
        <InfoBox
          label={"Percent Identity"}
          text={option.perc_ident || "-"}
          isSmall
          limit={145}
        />
        <InfoBox
          label={"Random State"}
          text={option.random_state || "-"}
          isSmall
          limit={145}
        />
        <InfoBox
          label={"HSP Coverage"}
          text={option.hsp_cov || "-"}
          isSmall
          limit={145}
        />
      </View>
    </View>
  );
  const MMseqs2 = () => (
    <View>
      <View style={styles.inlineInfoBox}>
        <InfoBox
          label={"Maximum Sequences"}
          text={option.max_seqs || "-"}
          limit={185}
        />
        <InfoBox
          label={"E Value"}
          text={option.e || "-"}
          limit={185}
        />
      </View>
      <View style={styles.inlineInfoBox}>
        <InfoBox
          label={"Minimum Sequence Identity"}
          text={option.min_seq_id || "-"}
          limit={185}
        />
        <InfoBox
          label={"Minimum Alignment Length"}
          text={option.min_aln_len || "-"}
          limit={185}
        />
      </View>
      <View style={styles.inlineInfoBox}>
        <InfoBox
          label={"Coverage Mode"}
          text={option.cov_mode || "-"}
          limit={185}
        />
        <InfoBox
          label={"Coverage Threshold"}
          text={option.c || "-"}
          limit={185}
        />
      </View>
      <View style={styles.inlineInfoBox}>
        <InfoBox
          label={"Sequence Length"}
          text={option.seq_length || "-"}
          limit={185}
        />
        <InfoBox
          label={"Random State"}
          text={option.random_state || "-"}
          limit={185}
        />
      </View>
    </View>
  );

  const ToolSelection = () => {
    switch (tool) {
      case "blast":
        return <Blast />;
      case "mmseqs2":
        return <MMseqs2 />;
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
        <InfoBox label={"Tool"} text={tool || "-"} isSmall={tool === 'blast'} />
        <ToolSelection />
        <InfoBox label={"Input Protein"} text={inputProtein || "-"} isSmall={tool === 'blast'} />
      </View>
    </View>
  );
}
