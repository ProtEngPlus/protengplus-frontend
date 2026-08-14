import { Text, View } from "@react-pdf/renderer";
import { ReportStyles as styles } from "../../ReportStyle";
import InfoBox from "../../ReportInfoBox";
import Table, { ColumnConfig } from "../../ReportTable";
import { Result } from "../../../../interfaces/QueryResult.interface";

export default function QueryResultReport({
  queryResult,
  countFrom,
  totalCount,
  tool
}: {
  queryResult: Result[];
  countFrom?: number;
  totalCount: number;
  tool: string;
}) {
  const queryResultColConfig: ColumnConfig[] = [
    {
      title: "",
      dataKey: "index",
      styleCol: { width: "5%", textAlign: "center" },
    },
    {
      title: "Description",
      dataKey: "description",
      styleCol: { width: "25%", textAlign: "left" },
    },
    {
      title: "Scientific Name",
      dataKey: "organisms",
      styleCol: { width: "15%", textAlign: "left" },
    },
    {
      title: "Max Score",
      dataKey: "max_score",
      styleCol: { width: "10%", textAlign: "center" },
    },
    {
      title: "Total Score",
      dataKey: "score",
      styleCol: { width: "10%", textAlign: "center" },
    },
    {
      title: "Query Cover",
      dataKey: "query_cover",
      styleCol: { width: "10%", textAlign: "center" },
    },
    {
      title: "E Value",
      dataKey: "e_values",
      styleCol: { width: "10%", textAlign: "center" },
    },
    {
      title: "Perc. Identity",
      dataKey: "percent_identity",
      styleCol: { width: "10%", textAlign: "center" },
    },
    {
      title: "Acc. len",
      dataKey: "acc_len",
      styleCol: { width: "10%", textAlign: "center" },
    },
    {
      title: "Accession",
      dataKey: "accession",
      styleCol: { width: "15%", textAlign: "center" },
    },
  ];

  const toolNameMapping: Record<string, string> = {
    "blast": "Blast",
    "mmseqs2": "MMseqs2",
  }

  function getToolDisplayName(tool: string): string {
    return toolNameMapping[tool] ? `${toolNameMapping[tool]} - ` : "";
  }

  return (
    <View style={styles.stageInfoBox}>
      <View style={styles.stageTitle}>
        <View style={styles.infoBox}>
          <Text style={styles.stageLabel}>{getToolDisplayName(tool)}Query Result</Text>
        </View>
      </View>
      <InfoBox label={"Total"} text={`${totalCount}`} />
      <Table columns={queryResultColConfig} data={queryResult} countFrom={countFrom} />
    </View>
  );
}
