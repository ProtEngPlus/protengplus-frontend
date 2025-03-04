import { Text, View } from "@react-pdf/renderer";
import { ReportStyles as styles } from "./ReportStyle";

export default function InfoBox({
  label,
  text,
  isSmall,
  limit,
}: {
  label: string;
  text: string;
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
