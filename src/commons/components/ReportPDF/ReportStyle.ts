import { StyleSheet, Font } from "@react-pdf/renderer";

Font.register({
  family: "TH Sarabun New",
  src: "/src/assets/fonts/THSarabunNew.ttf", // Path to your font file
  fontWeight: "normal",
});

Font.register({
  family: "TH Sarabun New",
  src: "/src/assets/fonts/THSarabunNewBold.ttf", // Path to bold font file
  fontWeight: "bold",
});

export const ReportStyles = StyleSheet.create({
  page: {
    backgroundColor: "#FFFFFF",
    color: "#000000",
    fontSize: 14,
    fontFamily: "TH Sarabun New",
    padding: "28px 48px",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
  },
  textBold: {
    fontWeight: "bold",
  },
  spaceY: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    gap: "2px",
  },
  infoBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: "16px",
    flexWrap: "wrap"
  },
  labelText: {
    width: "130px",
  },
  smallLabelText: {
    width: "100px",
  },
  stageInfoBox: {
    marginTop: "24px",
  },
  stageTitle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  stageLabel: {
    fontWeight: "bold",
    fontSize: "16px",
  },
  inlineInfoBox: {
    display: "flex",
    flexDirection: "row",
    gap: "32px",
  },
  limitInfoBox: {
    width: "145px",
  },
  footer: {
    color: "#D9D9D9",
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    textAlign: "right",
    position: "absolute",
    bottom: "0px",
    right: "0px",
    padding: "10px 10px",
    pageBreakBefore: "always",
  },
  table: {
    display: "flex",
    width: "100%",
    border: "1px solid black",
    fontSize: "12px",
    marginTop: "20px"
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: "1px solid black",
  },
  tableCell: {
    padding: 5,
    borderRight: "1px solid black",
    textAlign: "center",
  },
  headerCell: {
    padding: 5,
    borderRight: "1px solid black",
    textAlign: "center",
    fontWeight: "bold",
  },
});
