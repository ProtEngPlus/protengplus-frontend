import { Text, View } from "@react-pdf/renderer";
import { ReportStyles as styles } from "../../ReportStyle";
import InfoBox, { renderOptionText } from "../../ReportInfoBox";
import { OptionValue } from "../../../../interfaces/Job.interface";

export default function ProteinQueryReport({
  tool,
  option,
  inputProtein,
  runTime,
}: {
  tool: string;
  option: Record<string, OptionValue>;
  inputProtein: string;
  runTime: string;
}) {
  const Blast = () => (
    <View>
      <View style={styles.inlineInfoBox}>
        <InfoBox
          label={"Program"}
          text={renderOptionText(option.program)}
          isSmall
          limit={145}
        />
        <InfoBox
          label={"Database"}
          text={renderOptionText(option.database)}
          isSmall
          limit={145}
        />
      </View>
      <View style={styles.inlineInfoBox}>
        <InfoBox
          label={"Hit Size"}
          text={renderOptionText(option.hitlist_size)}
          isSmall
          limit={145}
        />
        <InfoBox
          label={"E Value"}
          text={renderOptionText(option.expect)}
          isSmall
          limit={145}
        />
        <InfoBox
          label={"Sequence Length"}
          text={renderOptionText(option.seq_length)}
          isSmall
          limit={145}
        />
      </View>
      <View style={styles.inlineInfoBox}>
        <InfoBox
          label={"Percent Identity"}
          text={renderOptionText(option.perc_ident)}
          isSmall
          limit={145}
        />
        <InfoBox
          label={"Random State"}
          text={renderOptionText(option.random_state)}
          isSmall
          limit={145}
        />
        <InfoBox
          label={"HSP Coverage"}
          text={renderOptionText(option.hsp_cov)}
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
          text={renderOptionText(option.max_seqs)}
          limit={185}
        />
        <InfoBox
          label={"E Value"}
          text={renderOptionText(option.e)}
          limit={185}
        />
      </View>
      <View style={styles.inlineInfoBox}>
        <InfoBox
          label={"Minimum Sequence Identity"}
          text={renderOptionText(option.min_seq_id)}
          limit={185}
        />
        <InfoBox
          label={"Minimum Alignment Length"}
          text={renderOptionText(option.min_aln_len)}
          limit={185}
        />
      </View>
      <View style={styles.inlineInfoBox}>
        <InfoBox
          label={"Coverage Mode"}
          text={renderOptionText(option.cov_mode)}
          limit={185}
        />
        <InfoBox
          label={"Coverage Threshold"}
          text={renderOptionText(option.c)}
          limit={185}
        />
      </View>
      <View style={styles.inlineInfoBox}>
        <InfoBox
          label={"Sequence Length"}
          text={renderOptionText(option.seq_length)}
          limit={185}
        />
        <InfoBox
          label={"Random State"}
          text={renderOptionText(option.random_state)}
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
        <InfoBox label={"Tool"} text={tool || "-"} isSmall={tool === "blast"} />
        <ToolSelection />
        <InfoBox
          label={"Input Protein"}
          text={inputProtein || "-"}
          isSmall={tool === "blast"}
        />
      </View>
    </View>
  );
}
