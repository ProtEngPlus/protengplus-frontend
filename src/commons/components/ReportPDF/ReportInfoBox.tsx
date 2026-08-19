import { Text, View } from "@react-pdf/renderer";
import { ReportStyles as styles } from "./ReportStyle";
import { OptionValue } from "../../interfaces/Job.interface";

export const renderOptionText = (value: OptionValue): string | number => {
  if (value === undefined) return "-";
  if (Array.isArray(value)) return value.join(", ");
  if (typeof value === "boolean") return value ? "true" : "false";
  return value;
};

export default function InfoBox({
  label,
  text,
  isSmall,
  limit,
}: {
  label: string;
  text: string | number;
  isSmall?: boolean;
  limit?: number;
}) {
  return (
    <View
      style={limit ? [styles.infoBox, { width: `${limit}px` }] : styles.infoBox}
    >
      <Text style={isSmall ? styles.smallLabelText : styles.labelText}>
        {label}:{" "}
      </Text>
      <Text>{text}</Text>
    </View>
  );
}
