import { Text, View } from "@react-pdf/renderer";
import { ReportStyles as styles } from "./ReportStyle";

export type ColumnConfig = {
  title: string;
  dataKey: string;
  styleCol?: Record<string, any>;
};

export default function Table({
  columns,
  data,
  countFrom,
}: {
  columns: ColumnConfig[];
  data: Record<string, any>[];
  countFrom?: number;
}) {
  var countRow = countFrom || 0;
  return (
    <View style={styles.table}>
      <View style={styles.tableRow}>
        {columns.map((col) => (
          <Text
            key={col.dataKey}
            style={
              col.styleCol
                ? [styles.headerCell, col.styleCol]
                : styles.headerCell
            }
          >
            {col.title}
          </Text>
        ))}
      </View>

      {data.map((row, index) => (
        <View style={styles.tableRow} key={row.id || index}>
          {columns.map((col) => (
            <Text
              key={col.dataKey}
              style={
                col.styleCol
                  ? [styles.tableCell, col.styleCol]
                  : styles.tableCell
              }
            >
              {col.dataKey === "index" ? countRow + index + 1 : row[col.dataKey]}
            </Text>
          ))}
        </View>
      ))}
    </View>
  );
}
