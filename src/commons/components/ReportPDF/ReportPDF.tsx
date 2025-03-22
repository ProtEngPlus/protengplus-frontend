import { Page, Text, View, Document, Image } from "@react-pdf/renderer";
import { ReportStyles as styles } from "./ReportStyle";
import logo from "../../../assets/images/Report/protengplus-logo.png";
import GeneralInfo from "./StageReport/GeneralInfo/GeneralInfo";
import ProteinQueryReport from "./StageReport/ProteinQueryReport/ProteinQueryReport";
import ProteinRepresentationReport from "./StageReport/ProteinRepresentationReport/ProteinRepresentationReport";
import TopModelReport from "./StageReport/TopModelReport/TopModelReport";
import MutationReport from "./StageReport/MutationReport/MutationReport";
import { formatTime } from "../../utils/FormatTime";
import UploadLabResultReport, {
  labResult,
} from "./StageReport/UploadLabResultReport/UploadLabResultReport";
import QueryResultReport from "./StageReport/QueryResultReport/QueryResultReport";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { ReportInterface } from "../../interfaces/Report.interface";
import { Result } from "../../interfaces/QueryResult.interface";
export default function ReportPDF({
  jobData,
  chart,
  queryResultData,
}: {
  jobData: ReportInterface;
  chart?: string;
  queryResultData?: Result[];
}) {
  const [pageIndex, setPageIndex] = useState(1);
  const [paginatedLabResults, setPaginatedLabResults] = useState<labResult[]>(
    []
  );
  const [paginatedQueryResults, setPaginatedQueryResults] = useState<
    Record<string, any>[]
  >([]);

  const username = jobData.username;

  const labResultPerPage = 20;
  const queryResultPerPage = 12;

  useEffect(() => {
    const paginatedLabResults: labResult[] = [];
    if (jobData.lab_result.scores) {
      for (
        let i = 0;
        i < jobData.lab_result.scores.length;
        i += labResultPerPage
      ) {
        paginatedLabResults.push({
          scores: jobData.lab_result.scores
            .slice(i, i + labResultPerPage)
            .map((score) => Number(score.toFixed(3))),
          sequences: jobData.lab_result.sequences.slice(
            i,
            i + labResultPerPage
          ),
        });
      }
      setPaginatedLabResults(paginatedLabResults);
    }

    const paginatedQueryResults: Record<string, any>[] = [];
    if (queryResultData) {
      for (let i = 0; i < queryResultData.length; i += queryResultPerPage) {
        paginatedQueryResults.push({
          queryResult: queryResultData
            .slice(i, i + queryResultPerPage)
            .map((result) => {
              return {
                ...result,
                acc_len: Number(result.acc_len.toFixed(3)),
                e_values: Number(result.e_values.toFixed(3)),
                hsp_query_from: Number(result.hsp_query_from.toFixed(3)),
                hsp_query_to: Number(result.hsp_query_to.toFixed(3)),
                max_score: Number(result.max_score.toFixed(3)),
                percent_identity: Number(result.percent_identity.toFixed(3)),
                query_cover: Number(result.query_cover.toFixed(3)),
                score: Number(result.score.toFixed(3)),
              };
            }),
        });
      }
      setPaginatedQueryResults(paginatedQueryResults);
    }
    
    var pageCount = 1;
    if (jobData.lab_result.scores && jobData.lab_result.scores.length > 0) {
      pageCount += paginatedLabResults.length;
    }
    if (queryResultData && queryResultData.length > 0) {
      pageCount += paginatedQueryResults.length;
    }
    if (jobData.run_time?.mutation) {
      pageCount++;
    }

    setPageIndex(pageCount);
  }, []);

  const Header = () => (
    <View style={styles.header}>
      <View>
        <Image src={logo} style={{ width: 207, height: 47 }} />
      </View>
      <View style={styles.spaceY}>
        <Text>{dayjs(jobData.created_at).format("D MMMM YYYY")}</Text>
        <Text>Created By: {username}</Text>
      </View>
    </View>
  );

  const Footer = ({ index, total }: { index: number; total: number }) => (
    <View style={styles.footer}>
      <Text>
        Page {index}/{total}
      </Text>
    </View>
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Header />
        <GeneralInfo
          jobName={jobData.name}
          jobDescription={jobData.description}
          totalTime={
            jobData.run_time
              ? formatTime({
                  start_time: jobData.run_time.query?.end_time,
                  end_time: jobData.run_time.mutation?.end_time,
                })
              : ""
          }
        />
        <ProteinQueryReport
          tool={jobData.meta[0]}
          option={
            jobData.options[jobData.meta[0] as keyof typeof jobData.options]
          }
          inputProtein={jobData.input_protein}
          runTime={
            jobData.run_time?.query ? formatTime(jobData.run_time.query) : ""
          }
        />
        <ProteinRepresentationReport
          tool={jobData.meta[1]}
          option={
            jobData.options[jobData.meta[1] as keyof typeof jobData.options]
          }
          runTime={
            jobData.run_time?.evotune
              ? formatTime(jobData.run_time.evotune)
              : ""
          }
        />
        <TopModelReport
          tool={jobData.meta[2]}
          option={
            jobData.options[jobData.meta[2] as keyof typeof jobData.options]
          }
          runTime={
            jobData.run_time?.fittop ? formatTime(jobData.run_time.fittop) : ""
          }
        />
        <MutationReport
          tool={jobData.meta[3]}
          option={
            jobData.options[jobData.meta[3] as keyof typeof jobData.options]
          }
          runTime={
            jobData.run_time?.mutation
              ? formatTime(jobData.run_time.mutation)
              : ""
          }
        />
        <Footer index={1} total={pageIndex} />
      </Page>
      {jobData.lab_result.scores ?
        paginatedLabResults.map((chunk, index) => (
          <Page key={index} size="A4" style={styles.page}>
            <Header />
            <UploadLabResultReport
              labResult={chunk}
              countFrom={index * labResultPerPage}
              totalCount={jobData.lab_result.total}
            />
            <Footer index={index + 2} total={pageIndex} />
          </Page>
        )):<></>}
      {queryResultData ? paginatedQueryResults.map((chunk, index) => (
        <Page key={index} size="A4" style={styles.page}>
          <Header />
          <QueryResultReport
            queryResult={chunk.queryResult}
            countFrom={index * queryResultPerPage}
            totalCount={queryResultData.length}
          />
          <Footer
            index={paginatedLabResults.length + index + 2}
            total={pageIndex}
          />
        </Page>
      )):<></>}
      {jobData.run_time?.mutation ? (
        <Page size="A4" style={styles.page}>
          <Header />
          <View style={styles.stageInfoBox}>
            <View style={styles.stageTitle}>
              <View style={styles.infoBox}>
                <Text style={styles.stageLabel}>
                  Mutation Result Distribution
                </Text>
              </View>
            </View>
            <View>
              <Image src={chart} style={{ width: 500, height: 176 }} />
            </View>
          </View>
          <Footer
            index={
              1 + paginatedLabResults.length + paginatedQueryResults.length + 1
            }
            total={pageIndex}
          />
        </Page>
      ) : (
        <></>
      )}
    </Document>
  );
}
