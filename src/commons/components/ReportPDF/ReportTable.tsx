import { Text, View } from "@react-pdf/renderer";
import { Style } from "@react-pdf/types";
import { ReportStyles as styles } from "./ReportStyle";

export type ColumnConfig = {
  title: string;
  dataKey: string;
  styleCol?: Style;
};

export default function Table<T extends object>({
  columns,
  data,
  countFrom,
}: {
  columns: ColumnConfig[];
  data: T[];
  countFrom?: number;
}) {
  const countRow = countFrom || 0;
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

      {data.map((row, index) => {
        const rowValues = row as Record<string, string | number>;
        return (
          <View style={styles.tableRow} key={rowValues.id ?? index}>
            {columns.map((col) => (
              <Text
                key={col.dataKey}
                style={
                  col.styleCol
                    ? [styles.tableCell, col.styleCol]
                    : styles.tableCell
                }
              >
                {col.dataKey === "index"
                  ? countRow + index + 1
                  : rowValues[col.dataKey]}
              </Text>
            ))}
          </View>
        );
      })}
    </View>
  );
}
