import { Text, View } from "@react-pdf/renderer";
import { ReportStyles as styles } from "../../ReportStyle";
import InfoBox from "../../ReportInfoBox";
import Table, { ColumnConfig } from "../../ReportTable";

function convertLabResultToUploadData(labResult: {
  scores: number[];
  sequences: string[];
}) {
  return labResult.sequences.map((sequence, index) => ({
    sequence: sequence,
    score: labResult.scores[index],
  }));
}

export type labResult = {
  scores: number[];
  sequences: string[];
};

export default function UploadLabResultReport({
  labResult,
  countFrom,
  totalCount,
}: {
  labResult: labResult;
  countFrom?: number;
  totalCount: number;
}) {
  const uploadLabResultData = convertLabResultToUploadData(labResult);

  const uploadLabResultColConfig: ColumnConfig[] = [
    {
      title: "",
      dataKey: "index",
      styleCol: { width: "5%", textAlign: "center" },
    },
    {
      title: "Protein Sequence",
      dataKey: "sequence",
      styleCol: { width: "47.5%", textAlign: "left" },
    },
    {
      title: "Score",
      dataKey: "score",
      styleCol: { width: "47.5%", textAlign: "center" },
    },
  ];

  return (
    <View style={styles.stageInfoBox}>
      <View style={styles.stageTitle}>
        <View style={styles.infoBox}>
          <Text style={styles.stageLabel}>Upload Lab Input</Text>
        </View>
      </View>
      <InfoBox label={"Total"} text={`${totalCount}`} />
      <Table
        columns={uploadLabResultColConfig}
        data={uploadLabResultData}
        countFrom={countFrom}
      />
    </View>
  );
}
